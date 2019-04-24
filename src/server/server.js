import dotenvJSON from 'dotenv-json';
import express from 'express';
import bodyParser from 'body-parser';
// import oracledb from 'oracledb';

import environmentRoute from './routes/environment';

dotenvJSON();

const app = express();
app.use(bodyParser.json());

app.use('/api/environment', environmentRoute);

// const connection = oracledb.getConnection({
//   user: 'SRM_INT',
//   password: 'int1_aug2018',
//   connectString: 'CASINT'
// }, function (err, connection) {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log('Connection was successful!');

//   app.listen(3001, () => console.log('Express server listening on port 3001!'));

//   // connection.execute('SELECT count(*) FROM is_menus').then(data => {
//   //   console.log(data.rows[0][0]);

//   //   connection.close(
//   //     function (err) {
//   //       if (err) {
//   //         console.error(err.message);
//   //         return;
//   //       }
//   //     });
//   // });

// });

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Server running on localhost:${port}`)
);