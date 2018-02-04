// https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

// setup super-secret env variables
import * as dotenv from 'dotenv';
dotenv.config();

// Get dependencies
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as queryParams from 'express-query-params';

// connect to mlab hosted mongoDB
import config from './config/database';
mongoose.connect(config.database);

// Get our API routes
import api from './routes/api.routes';
import users from './routes/user.routes';
import products from './routes/products.routes';

// create app
const app = express();

// apply middleware:
// cross origin handler...
app.use(cors());

// ...parsers for POST data...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(queryParams());

// ...and our api routes.
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/products', products);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT;
app.set('port', port);

// Create HTTP server.
// for ssl try https://aghassi.github.io/ssl-using-express-4/
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
