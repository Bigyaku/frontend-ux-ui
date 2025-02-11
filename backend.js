const mysql = require('mysql2');

// สร้างการเชื่อมต่อ
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'new_username', // เปลี่ยนจาก your_username
    password: 'new_password', // เปลี่ยนจาก your_password
    database: 'user_db'
  });
  

// เชื่อมต่อ
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});
