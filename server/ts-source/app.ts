// https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

// Get dependencies
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as queryParams from 'express-query-params';
import * as appRootDir from 'app-root-dir';
import * as passport from 'passport';

const root = appRootDir.get();
console.log('root: ', root);

appRootDir.set(root);

// Get our API routes
import api from './routes/api.routes';
import users from './routes/user.routes';
import products from './routes/products.routes';
import adminAuth from './routes/auth.routes';

import errorHandlers from './errorHandlers';

// create app
const app = express();

// apply middleware:
// logging
app.use(morgan('common'));

// security
app.use(helmet());

// cross origin handler
app.use(cors());

// parsers for POST data
app.use(bodyParser.json());

// parse query params
app.use(queryParams());

app.use(passport.initialize());

// api routes.
app.use('/api', api);

// app.use('/api/auth', auth);
app.use('/api/admin-auth', adminAuth);
app.use('/api/users', users);
app.use('/api/products', products);

app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.devErrors);
}

// production error handler
app.use(errorHandlers.prodErrors);

export default app;
