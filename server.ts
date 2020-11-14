import path from 'path';
import express from 'express';

const app = express();
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
