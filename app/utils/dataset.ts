import fs from 'fs';
import path from 'path';

export function getDataset() {
  const filePath = path.join(process.cwd(), 'data', 'responses.ts'); 
  const data = fs.readFileSync(filePath, 'utf8'); 
  return JSON.parse(data); 
}
