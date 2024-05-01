import {
    DeleteItemCommand,
    ScanCommand,
    QueryCommand,
    UpdateItemCommand,
    ReturnValue
  } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDBClient } from './dynamoDbClient';
  import logger from '../logging';
import { CartProductType } from '@/interFace/interFace';
  
  const DYNAMO_DB_TABLE_NAME = process.env.DYNAMO_DB_TABLE_NAME;
  const DYNAMO_DB_TABLE_ORDERS_NAME = "car_orders";
export const updateItemProductQuantity = async (_id: string, productQuantity: number) => {
  const dynamoDBClient = await getDynamoDBClient();
    const params = {
      TableName: DYNAMO_DB_TABLE_NAME,
      Key: {
        "_id": { S: _id } // 假设id是一个字符串类型的主键
      },
      UpdateExpression: "set #numField = #numField - :val",
      ExpressionAttributeNames: {
        "#numField": "productQuantity" // 新的status值
      },
      ExpressionAttributeValues: {
        ":val": { "N": productQuantity.toString() }
      },
      ReturnValues: "ALL_NEW" as ReturnValue // 返回更新后的值
    };
  
    try {
      const data = await dynamoDBClient.send(new UpdateItemCommand(params));
    } catch (error) {
      console.error("Updated failure:", error);
    }
  }
  export const writeToDynamoDb = async (
    _id: string,
    categoryName: string,
    oldPrice: number,
    price: number,
    productDetails: string,
    productImages: string[],
    productName: string,
    productQuantity: number,
    subcategoryName: string,
    img: string,
    date: string,
    offer: boolean,
    offerPersent: number,
    rettings: number[],
    productStatus: string,
    __v: number,
  ) => {
    const dynamoDBClient = await getDynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
      TableName: DYNAMO_DB_TABLE_NAME,
      Item: {
        _id: `${_id}`,
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
        __v: {S: __v.toString()},
      },
    };
    try {
      await docClient.send(new PutCommand(params));
      logger.info({ message: 'Successfully wrote to DynamoDB' }, 'info');
    } catch (error) {
      logger.error({ message: 'Error writing to DynamoDB', error }, 'error');
      throw error;
    }
  };

  export const writeToDynamoDbOrders = async (
    buyerEmail: String,
    name: String,
    date: String,
    EmailAddress: String,
    Phone: String,
    totalPrice: Number,
    DriverLiscense: String,
    orderProducts: Array<CartProductType>,
    paymentId: String,
    shipmentStatus: String,
    orderId: String,
  ) => {
    const dynamoDBClient = await getDynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
      TableName: DYNAMO_DB_TABLE_ORDERS_NAME,
      Item: {
        buyerEmail,
        name,
        date,
        EmailAddress,
        Phone,
        totalPrice,
        DriverLiscense,
        orderProducts,
        paymentId,
        shipmentStatus,
        orderId,
      },
    };
    // console.log("params", params);
    try {
      await docClient.send(new PutCommand(params));
      logger.info({ message: 'Successfully wrote to DynamoDB' }, 'info');
    } catch (error) {
      logger.error({ message: 'Error writing to DynamoDB', error }, 'error');
      throw error;
    }
  };
  
  export const deleteFromDynamoDb = async (
    entityType: string,
    entityId: string,
    createdAt: string
  ) => {
    const dynamoDBClient = await getDynamoDBClient();
    const params = {
      TableName: DYNAMO_DB_TABLE_NAME,
      Key: {
        pk: { S: `${entityType}_${entityId}` },
        createdAt: { S: createdAt },
      },
    };
  
    try {
      await dynamoDBClient.send(new DeleteItemCommand(params));
      logger.info({ message: 'Successfully deleted item from DynamoDB' }, 'info');
    } catch (error) {
      logger.error(
        { message: 'Error deleting item from DynamoDB', error },
        'error'
      );
      throw error;
    }
  };
  
  export const scanDynamoDBProduct = async (page?: number, limit?: number) => {
    const dynamoDBClient = await getDynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
        TableName: DYNAMO_DB_TABLE_NAME,
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        return mapToStandardFormat(data.Items, limit, page);
    } catch (err) {
        console.error("Unable to scan the table. Error:", JSON.stringify(err, null, 2));
    }

  }

  export const queryDynamoDbSingleProductDetails = async () => {
    
  }
  export const queryDynamoDbByEntityTypeID = async (
    _id: string,
  ) => {
    const dynamoDBClient = await getDynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
      TableName: DYNAMO_DB_TABLE_NAME,
      KeyConditionExpression: "#id = :value",
        ExpressionAttributeNames: {
            "#id": "_id" // 使用占位符#id来代替实际的键名_id
        },
        ExpressionAttributeValues: {
            ":value": { S: _id.toString() }
        }
    };
  
    try {
      const data = await docClient.send(new QueryCommand(params));
      if (!data || !data.Items) {
        logger.error({ message: 'No items found in the query.' }, 'error');
        return [];
      }
      return mapToStandardFormat(data.Items);
    } catch (error) {
        console.log(error);
      logger.error({ message: 'Error querying DynamoDB', error }, 'error');
      throw error;
    }
  };
  
  export const queryDynamoDbByEntityType = async (productName: string) => {
    const dynamoDBClient = await getDynamoDBClient();
    const params = {
      TableName: DYNAMO_DB_TABLE_NAME,
      KeyConditionExpression: '_id = :_id',
      ExpressionAttributeValues: {
        ':prodcutName': { S: `${productName}` },
      },
    };
  
    try {
      const data = await dynamoDBClient.send(new ScanCommand(params));
      if (!data || !data.Items) {
        logger.error({ message: 'No items found in the query.' }, 'error');
        return [];
      }
      return mapToStandardFormat(data.Items);
    } catch (error) {
      logger.error({ message: 'Error querying DynamoDB', error }, 'error');
      throw error;
    }
  };
  
  export const queryDynamoDBByFilteringProduct = async ( searchQuery: string, page?: string, limit?: number) => {
    const dynamoDBClient = await getDynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
    const params = {
        TableName: DYNAMO_DB_TABLE_NAME,
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        const items = mapToStandardFormat(data.Items, limit, parseInt(page || '0'));
        const results = items.products.filter(item => 
          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subcategoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {products: results, totalPages: items.totalPages, currentPage: items.currentPage};
    } catch (err) {
        console.error("Unable to scan the table. Error:", JSON.stringify(err, null, 2));
    }

  }

  const mapToStandardFormat = (items?: any[], parsedLimit?: number, parsedPage?: number) => {
    if (!items) {
        return { products: []}
    }

    const skip = ((parsedPage || 1) - 1) * (parsedLimit || 12);
    return { products: items.slice(skip, skip +(parsedLimit || 12)).map(item => {
        return {
            _id: item._id.S,
            categoryName: item.categoryName.S,
            oldPrice: item.oldPrice.N,
            price: item.price.N,
            productDetails: item.productDetails.S,
            productImages: item.productImages.L.map((item: any) => item.S),
            productName: item.productName.S,
            productQuantity: item.productQuantity.N,
            subcategoryName: item.subcategoryName.S,
            img: item.img.S,
            date: item.date.S,
            offer: item.offer.BOOL,
            offerPersent: item.offerPersent.N,
            rettings: item.rettings.L.map((item: any) => parseFloat(item.N)),
            productStatus: item.productStatus.S,
            __v: item.__v.M,
        };
        }),
        totalPages: Math.ceil(items.length/(parsedLimit || 12)),
        currentPage: parsedPage || 1,
    }
  };

  const filterElementByAttributes = (array: object[], attribute: string) => {
    const seenAttr = new Map();
    const uniqueArray = array.filter((item: any) => {
      const attributeValue = item[attribute];
      if (seenAttr.get(attributeValue)) {
        return false;
      } else {
        seenAttr.set(attributeValue, true);
        return true;
      }
    })
    return uniqueArray;
  }
  