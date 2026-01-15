import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '../uploads');



const uploadFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

    const files = req.files.map(f => ({
        name: f.originalname,
        size: f.size,
        path: f.filename,
        url: baseUrl + f.filename,
        id: f.filename,
        created: Date.now()
    }));

    res.json(files[0]);
};

const readFile = (req, res) => {
    const filepath = path.join(UPLOADS_DIR, req.params.filename);
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('File not found');
    }
};

const deleteFile = (req, res) => {
    const filepath = path.join(UPLOADS_DIR, req.params.filename);
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
};

export { uploadFiles, readFile, deleteFile };
