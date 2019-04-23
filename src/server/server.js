import express from 'express';
import oracledb from 'oracledb';

const app = express();

const connection = oracledb.getConnection({
  user: 'SRM_INT',
  password: 'int1_aug2018',
  connectString: 'CASINT'
}, function (err, connection) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connection was successful!');

  app.listen(3001, () => console.log('Express server listening on port 3001!'));

  // connection.execute('SELECT count(*) FROM is_menus').then(data => {
  //   console.log(data.rows[0][0]);

  //   connection.close(
  //     function (err) {
  //       if (err) {
  //         console.error(err.message);
  //         return;
  //       }
  //     });
  // });

});