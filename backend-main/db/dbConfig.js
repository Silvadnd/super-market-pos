const sql = require('mssql/msnodesqlv8');

const config = {
  database: "pos",
  server: "DESKTOP-LBKQMDG",
  options: {
    trustedConnection: true, // Enables Windows Authentication
    encrypt: false, // Disable encryption for local development
    trustServerCertificate: true, // Required for self-signed certificates
  },
  port: 1433, // Default port number
  driver: "msnodesqlv8", // Use the msnodesqlv8 driver
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed: ', err));

module.exports = { sql, poolPromise };
