
# Haulmatic Application

## Overview

Haulmatic is a full-stack web application designed to manage users. It consists of a client-side built with React and a server-side built with Node.js and Express.

## Directory Structure

- **client/**: Contains the frontend code.
  - **public/**: Static files for the frontend.
  - **src/**: Source code for the React application.
    - **components/**: React components.
    - **context/**: Context API for state management.
    - **hooks/**: Custom React hooks.
    - **styles/**: CSS styles.
    - **App.jsx**: Main App component.
     
- **server/**: Contains the backend code.
  - **config/**: Configuration files.
  - **controllers/**: Request handlers for various routes.
  - **logs/**: Log files.
  - **middleware/**: Custom middleware functions.
  - **routes/**: Route definitions.
  - **.env**: Environment variables.
  - **server.js**: Entry point for the server.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above)
- MySQL (for the database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/geenathWeerasingha/ase-coding-project
   cd ase-coding-project
   ```

2. **Install dependencies:**
   - Client-side:
     ```bash
     cd client
     npm install
     ```
   - Server-side:
     ```bash
     cd server
     npm install
     ```
### Database Setup

1. **Configure the database:**

   Inside the \`server/config\` folder, there is a file named \`database.js\`. Update this file with your database configuration:
   \`\`\`javascript
   const mysql = require(\"mysql2\");
   
   const pool = mysql.createPool({
     host: \"localhost\",
     user: \"root\",
     password: \"\",
     database: \"user_management_system\",
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
   });
   
   const db = pool.promise();
   
   module.exports = db;
   \`\`\`

2. **Create the database:**

   Create a database named \`user_management_system\` in MySQL. You can run the following SQL query:
   \`\`\`sql
   CREATE DATABASE user_management_system;
   \`\`\`

3. **Create the \`users\` table:**

   Inside the \`user_management_system\` database, create the \`users\` table with the following SQL query:
   \`\`\`sql
   CREATE TABLE users (
       id INT(11) NOT NULL AUTO_INCREMENT,
       username VARCHAR(50) NOT NULL,
       password VARCHAR(255) NOT NULL,
       firstname VARCHAR(50) NOT NULL,
       lastname VARCHAR(50) NOT NULL,
       refreshToken TEXT DEFAULT NULL,
       roles LONGTEXT DEFAULT '{\"User\": 2001}',
       PRIMARY KEY (id)
   );
   \`\`\`

4. **Insert an initial admin user:**

   Insert an initial admin user with the following SQL query:
   \`\`\`sql
   INSERT INTO users (username, password, firstname, lastname, roles)
   VALUES ('haulmatic', '$2a$10$YeDZVcxsuBeaCCi8ly2ep.fHHITmoWnVrgfYXlFU7acygBs94/UoK', 'Haul', 'Matic', '{\"User\": 2001, \"Admin\": 5150}');
   \`\`\`

 
### Running the Application

1. **Start the server:**
   ```bash
   cd server
   npm start
   ```

2. **Start the client:**
   ```bash
   cd client
   npm run dev
   ```

The client application will be available at `http://localhost:5173` and the server at `http://localhost:3500`.

## Features

- **User Authentication:** login, and manage user sessions.
- **Role-Based Access Control:** Different access levels for different user roles.
- **Data Management:** CRUD operations for managing user data.
- **Logging:** Request and error logging for better debugging and monitoring.

## Technologies Used

- **Frontend:**
  - React
  - Context API
  - Axios
- **Backend:**
  - Node.js
  - Express
  - MySql
  - JWT for authentication

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
