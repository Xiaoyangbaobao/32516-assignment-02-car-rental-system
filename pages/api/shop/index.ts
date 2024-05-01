import { NextApiRequest, NextApiResponse } from 'next';

import {
  deleteFromDynamoDb,
  queryDynamoDBByFilteringProduct,
  queryDynamoDbByEntityType,
  queryDynamoDbByEntityTypeID,
  scanDynamoDBProduct,
  writeToDynamoDb,
} from '../../../server/product/dynamoDbOperator';
import logger from '../../../server/logging';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      const { _id,
        categoryName,
        oldPrice,
        price,
        productDetails,
        productImages,
        productName,
        productQuantity,
        subcategoryName,
        img,
        date,
        offer,
        offerPersent,
        rettings,
        productStatus,
        __v, } =
        req.body;
      try {
        await writeToDynamoDb(
          _id,
        categoryName,
        oldPrice,
        price,
        productDetails,
        productImages,
        productName,
        productQuantity,
        subcategoryName,
        img,
        date,
        offer,  
        offerPersent,
        rettings,
        productStatus,
        __v
        );
        res.status(200).json({ message: 'Successfully wrote to DynamoDB' });
      } catch (error) {
        console.log(error);
        logger.error({ message: 'Error writing to DynamoDB', error }, 'error');
        res.status(500).json({ error: 'Error writing to DynamoDB' });
      }
    } else if (req.method === 'GET') {
      const { _id, productName, page, limit, search } = req.query;
      if (!_id && !productName && !search) {
        try {
          const data = await scanDynamoDBProduct(parseInt(page as string), parseInt(limit as string));
          res.status(200).setHeader('Cache-Control', 'no-cache').json(data);
        } catch (error) {
          console.log(error);
          logger.error({ message: 'Error querying DynamoDB', error }, 'error');
          res.status(500).json({ error: 'Error querying DynamoDB' });
        }

      } else if (search) {
        try {
          const data = await queryDynamoDBByFilteringProduct(search as string, (page as string), parseInt((limit as string)));
          res.status(200).json(data);
        } catch (error) {
          console.log("searcherror", error);
          logger.error({ message: 'Error querying DynamoDB', error }, 'error');
          res.status(500).json({ error: 'Error querying DynamoDB' });
        }
      } else if (_id) {
        try {
          const data = await queryDynamoDbByEntityTypeID(
            _id.toString(),
          );
          res.status(200).json(data);
        } catch (error) {
          console.log(error);
          logger.error({ message: 'Error querying DynamoDB', error }, 'error');
          res.status(500).json({ error: 'Error querying DynamoDB' });
        }
      } else if (productName) {
        try {
          const data = await queryDynamoDbByEntityType(productName.toString());
          res.status(200).json(data);
        } catch (error) {
          logger.error({ message: 'Error querying DynamoDB', error }, 'error');
          res.status(500).json({ error: 'Error querying DynamoDB' });
        }
      } else {
        res.status(400).json({ error: 'Missing parameters' });
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