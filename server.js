import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

// แปลง import.meta.url เป็น __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// ✅ ใช้ Express static middleware ให้บริการไฟล์จากโฟลเดอร์ 'frontend-ux-ui-main'
app.use(express.static('C:/Users/code-mac/Documents/frontend-ux-ui-main'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ ตั้งค่า MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'user_db'
});

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection error:', err);
        process.exit(1);
    } else {
        console.log('✅ Connected to MySQL database.');
    }
});

// ✅ จำกัดจำนวนครั้งล็อกอินผิดพลาด
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Please try again later.'
});

app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/code-mac/Documents/frontend-ux-ui-main', 'Login.html'));
});

app.get('/project', (req, res) => {
    if (req.cookies.user) {
        res.sendFile(path.join('C:/Users/code-mac/Documents/frontend-ux-ui-main', 'Project.html'));
    } else {
        res.redirect('/');
    }
});


// ✅ API เช็คสถานะล็อกอิน
app.get("/check-login", (req, res) => {
    if (req.cookies.user) {
        res.json({ loggedIn: true, username: req.cookies.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// ✅ API ออกจากระบบ
app.post("/logout", (req, res) => {
    res.clearCookie("user");
    res.json({ message: "Logged out successfully" });
});

// ✅ API ลงทะเบียนผู้ใช้
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkUserQuery, [username, email], async (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username or email already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: 'Failed to register user' });

            console.log('✅ User registered successfully');
            res.redirect('/');
        });
    });
});

// ✅ API ล็อกอิน
app.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (result.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        console.log('✅ Login successful');
        res.cookie('user', username, { maxAge: 3600000, httpOnly: true });
        return res.json({ message: '✅ Login successful' });
    });
});

// ✅ ตรวจสอบว่าเซิร์ฟเวอร์กำลังรันอยู่แล้วหรือไม่
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
