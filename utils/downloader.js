import { YtDlpWrap } from 'yt-dlp-wrap';
import path from 'path';
import fs from 'fs';

const ytDlpWrap = new YtDlpWrap();
const outputDir = './downloads';

export async function downloadMedia(url, format, type) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const ext = format;
  const outputPath = path.join(outputDir, `${Date.now()}.${ext}`);

  const args = [
    url,
    type === 'audio' ? '-x' : '',
    type === 'audio' ? `--audio-format=${format}` : `--recode-video=${format}`,
    '-o',
    outputPath,
  ].filter(Boolean);

  return new Promise((resolve, reject) => {
    ytDlpWrap.exec(args)
      .on('close', () => resolve(outputPath))
      .on('error', reject);
  });
}
