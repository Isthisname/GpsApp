
import app from './app.js'
import { connectDB } from './db.js'
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 3300;
const dbUrl = process.env.DB_CONNSTRING;

connectDB(dbUrl);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});