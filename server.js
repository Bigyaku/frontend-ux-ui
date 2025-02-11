import express from 'express'; 
import path from 'path';
import mysql from 'mysql2';
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const saltRounds = 10;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'new_password',
    database: process.env.DB_NAME || 'user_db',
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL database!');
});

// ให้ Express ใช้ไฟล์ในโฟลเดอร์ปัจจุบัน
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Login.html')));
app.get('/project', (req, res) => res.sendFile(path.join(__dirname, 'Project.html')));

// ✅ API ล็อกอิน
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("🔑 Login request received:", email);

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            console.warn("⚠️ User not found:", email);
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.warn("⚠️ Invalid password for user:", email);
            return res.status(401).json({ message: 'Invalid password' });
        }

        console.log("✅ Login successful:", user.username);
        res.status(200).json({ message: 'Login successful', username: user.username });
    });
});

// ✅ API ล็อกอิน
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("🔑 Login request received:", email);

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('❌ Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            console.warn("⚠️ User not found:", email);
            return res.status(400).json({ message: 'User not found' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.warn("⚠️ Invalid password for user:", email);
            return res.status(401).json({ message: 'Invalid password' });
        }

        console.log("✅ Login successful:", user.username);
        res.status(200).json({ message: 'Login successful', username: user.username });
    });
});

// ✅ API ออกจากระบบ
app.post("/logout", (req, res) => {
    res.clearCookie("user");
    res.json({ message: "Logged out successfully" });
});

// 🚀 เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
