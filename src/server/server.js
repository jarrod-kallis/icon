import express from 'express';
import bodyParser from 'body-parser';

import environmentRoute from './routes/environment';
import authRoute from './routes/auth';

const app = express();
app.use(bodyParser.json());

app.use('/api/environment', environmentRoute);
app.use('/api/auth', authRoute);

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Server running on localhost:${port}`)
);
