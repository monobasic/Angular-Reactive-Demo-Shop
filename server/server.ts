// https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

// setup super-secret env variables
import * as dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import * as mongoose from 'mongoose';

import config from './config/database';

import app from './app';

// connect to mlab hosted mongoDB
mongoose.connect(config.database);

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
