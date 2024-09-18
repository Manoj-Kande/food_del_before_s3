import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/ims', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("API working");
});
