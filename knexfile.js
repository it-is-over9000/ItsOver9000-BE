// Update with your config settings.

const localPg = {
  host: 'localhost',
  database: 'hobbits',
  user: 'student',
  password: 'hired',
}

const productionDbConnection = process.env.DATABASE_URL || localPg;
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/users.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    // by default SQLite will not enforce foreign keys
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done); // enforce FK
      },
    },
  },

  
  production: {
    client: 'pg',
    connection: productionDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex-migrations',
      directory: '/app/migrations'
    }
  }

};
