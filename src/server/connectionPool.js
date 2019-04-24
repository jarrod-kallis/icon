import oracledb from 'oracledb';

import environments from '../../.env.json';

class ConnectionPool {
  constructor() {
    this.environment = null;
  }

  async setEnvironmentName(value) {
    this.environment = environments.find(env => env.name === value);
    await this.createPool();
  }

  async createPool() {
    if (this.environment) {
      try {
        await oracledb.createPool({
          user: this.environment.username,
          password: this.environment.password,
          connectString: this.environment.connection
        });
      } catch (e) {
        console.error('Error creating connection pool.', e);
      }
    } else {
      console.error('No environment details have been assigned');
    }
  }

  async closePoolAndExit() {
    console.log("Terminating");
    try {
      await oracledb.getPool().close(10);
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  execute(query, options = {}) {
    return new Promise(async function (resolve, reject) {
      let connection;
      try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(query, options);
        resolve(result);
      } catch (e) {
        console.error('Unable to connect to database.', e);
        reject(e);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error('Error closing connection', err);
          }
        }
      }
    });
  }
}

const getInstance = new ConnectionPool();
// Object.freeze(getInstance);

process
  .once('SIGTERM', () => {
    console.log('SIGTERM');
    getInstance.closePoolAndExit();
  })
  .once('SIGINT', () => {
    console.log('SIGINT');
    getInstance.closePoolAndExit();
  });

export default getInstance;
