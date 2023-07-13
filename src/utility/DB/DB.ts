import mysql, {Pool} from 'mysql2/promise';

export class DB {

  private static POOL: Pool;

  static get Connection(): Pool {
    if (!this.POOL) {
      this.POOL = mysql.createPool({
        host: process.env.DB_HOST || 'db',
        user: process.env.DB_USER || 'user-api',
        database: process.env.DB_DATABASE || 'challenges',
        password: process.env.DB_PASSWORD || 'user-api-password',
      });
    }

    return this.POOL;
  }
}