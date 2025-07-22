import express from 'express';
import cors from 'cors';
import { downloadMedia } from './utils/downloader.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url, format, type } = req.body;

  if (!url || !format || !type) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const file = await downloadMedia(url, format, type);
    res.download(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Download failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
