import { NextApiRequest, NextApiResponse } from 'next';

import {
  deleteFromDynamoDb,
  writeToDynamoDbOrders,
} from '../../../server/product/dynamoDbOperator';
import logger from '../../../server/logging';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      const { 
        buyerEmail,
        name,
        EmailAddress,
        date,
        Phone,
        totalPrice,
        orderProducts,
        DriverLiscense,
        paymentId,
        shipmentStatus,
        orderId } =
        req.body;
      try {
        await writeToDynamoDbOrders(
            buyerEmail,
            name,
            date,
            EmailAddress,
            Phone,
            totalPrice,
            orderProducts,
            DriverLiscense,
            paymentId,
            shipmentStatus,
            orderId,
        );
        res.status(200).json({ message: 'Successfully wrote to DynamoDB' });
      } catch (error) {
        console.log(error);
        logger.error({ message: 'Error writing to DynamoDB', error }, 'error');
        res.status(500).json({ error: 'Error writing to DynamoDB' });
      }
    } else if (req.method === 'DELETE') {
      const { entityType, entityId, createdAt } = req.query;
      if (entityType && entityId && createdAt) {
        try {
          await deleteFromDynamoDb(
            entityType.toString(),
            entityId.toString(),
            createdAt.toString()
          );
          res.status(200).json({ message: 'Successfully deleted from DynamoDB' });
        } catch (error) {
          logger.error({ message: 'Error deleting DynamoDB', error }, 'error');
          res.status(500).json({ error: 'Error deleting from DynamoDB' });
        }
      } else {
        res.status(400).json({ error: 'Missing parameters' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }