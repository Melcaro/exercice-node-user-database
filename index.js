const express = require('express');
const app = express();
const userRouter = require('./apiUser');
const movieRouter = require('./apiMovie');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use('/users', userRouter);

app.use('/movies', movieRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5200);
