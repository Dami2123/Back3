import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {config} from './config/config.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.routes.js'
import errorHandler from './middleware/errors/errorHandler.js';
import { swaggerOptions } from './config/swaggerConfig.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';


const app = express();
const PORT = config.PORT||8080;
console.log(config.MONGO_URL);
const connection = mongoose.connect(config.MONGO_URL ) 

const specs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter )
app.use(errorHandler)


app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));


app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
//.