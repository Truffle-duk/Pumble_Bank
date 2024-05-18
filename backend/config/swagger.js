import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: 'Pumble Bank API',
            version: '1.0.0',
            description: 'Pumble Bank with express, API 설명'
        },
        host: 'localhost:8080',
        basepath: '../'
    },
    apis: ['./src/route/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);