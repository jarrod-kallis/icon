import express from 'express';
import jwt from 'jsonwebtoken';
import oracledb from 'oracledb';

import ConnectionPool from '../connectionPool';

let router = express.Router();

// Log in
router.post('/', async (request, response) => {
  const { username, password, environment } = request.body;

  await ConnectionPool.setEnvironmentName(environment);

  const result = await ConnectionPool.execute(`BEGIN IS_SECURITY.P_SET_IKON_USER(:A_USER_NAME, :A_PASSWORD, :A_LOGON_RESULT, :A_USER_SEQ, :A_SUPERUSER); END;`, {
    A_USER_NAME: username,
    A_PASSWORD: password,
    A_LOGON_RESULT: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 2 },
    A_USER_SEQ: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
    A_SUPERUSER: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 1 }
  });

  console.log('result', result);

  // User.query({
  //   where: { username: identifier },
  //   orWhere: { email: identifier }
  // })
  //   .fetch()
  //     .then(user => {
  //       if (user) {
  //         if (bcrypt.compareSync(password, user.get('passwordDigest'))) {
  //           const token = jwt.sign({
  //             id: user.get('id'),
  //             username: user.get('username'),
  //             firstName: user.get('firstName') ? user.get('firstName') : '',
  //             surname: user.get('surname') ? user.get('surname') : ''
  //           }, config.jwtSecret);

  //           response.status(201).json({ token });
  //         } else {
  //           response.status(401).json({ errors: { form: 'Invalid Credentials' }});
  //         }
  //       } else {
  //         response.status(401).json({ errors: { form: 'Invalid Credentials' }});
  //       }
  //     });
  response.status(401).json({ errors: { form: 'Invalid Credentials' } });
});

export default router;
