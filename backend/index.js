import express from 'express'
import cors from 'cors'
import compression from "compression"
import methodOverride from "method-override"
import {BaseError} from "./config/error.js"
import {status} from "./config/responseStatus.js"
import {response} from "./config/response.js"
import {connectRouter} from "./src/route/connectRoute.js"
import { specs } from './config/swagger.js';
import SwaggerUi from 'swagger-ui-express';

const app = express()
const port = 8080

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(methodOverride());

app.use(cors());

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/connect', connectRouter);

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));
});


app.listen(port, () => {
    console.log(`Pumble Bank listening on port ${port}`)
})