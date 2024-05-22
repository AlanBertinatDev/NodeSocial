import express from 'express';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json' assert { type: "json" };

import config from '../config.js';
import user from './components/user/network.js';

const app = express();

app.use(bodyParser.json());


//ROUER
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () =>{
    console.log('Api escuchando en el puerto:' + config.api.port);    
});


