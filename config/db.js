const mysql = require("mysql2");
require("dotenv").config();

// Initial connection to check if the database exists or create it
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

const initializeDatabase = () => {
  const dbName = process.env.DB_NAME;
  const createDBQuery = `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`;
  const useDBQuery = `USE \`${dbName}\`;`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  connection.query(
    `${createDBQuery} ${useDBQuery} ${createTableQuery}`,
    (err, results) => {
      if (err) {
        console.error("Error initializing the database:", err);
        process.exit(1); // Exit the process if initialization fails
      }
      console.log("Database and table initialization successful");

      // Close the connection after initialization
      connection.end((err) => {
        if (err) {
          console.error("Error closing the connection:", err);
        } else {
          console.log("Initial connection closed");
        }
      });
    }
  );
};

// Connect to the database and initialize it
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the server:", err);
    process.exit(1); // Exit if connection fails
  }
  console.log("Connected to the MySQL server");
  initializeDatabase();
});

// Export a new connection for application use
const appConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

appConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit if connection fails
  }
  console.log("Connected to the MySQL database");
});

module.exports = appConnection;
