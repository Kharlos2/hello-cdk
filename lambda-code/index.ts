import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB();

exports.handler = async (event:any) => {
    const { nombre, email } = event;



    // Generar un UUID si no se proporciona uno en el evento
    const uuid = event.uuid || '002';
 
    if (process.env.TABLE_NAME !== 'HelloCdkStack-LambdaDynamoDBDynamoTableB743FC08-IH30ZCQTX6KD') {
        return { statusCode: 500, body: 'Error: Nombre de la tabla no definido' };
    }

    // Insertar el usuario en la tabla de DynamoDB
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            uuid: { S: uuid },
            nombre: { S: nombre },
            email: { S: email },
        },
    };

    try {
        await dynamoDB.putItem(params).promise();
        return { statusCode: 200, body: process.env.SUCCESS_MESSAGE };
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        return { statusCode: 500, body: process.env.ERROR_MESSAGE };
    }
};
