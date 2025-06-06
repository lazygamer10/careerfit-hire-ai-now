import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const formData = req.body;
  const filePath = path.join(process.cwd(), 'public', 'submissions.xlsx');
  const sheetName = 'Submissions';
  let data = [];

  try {
    if (fs.existsSync(filePath)) {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[sheetName];
      if (worksheet) {
        data = XLSX.utils.sheet_to_json(worksheet);
      }
      data.push(formData);
      const newSheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets[sheetName] = newSheet;
      XLSX.writeFile(workbook, filePath);
    } else {
      data.push(formData);
      const newSheet = XLSX.utils.json_to_sheet(data);
      const newBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newBook, newSheet, sheetName);
      XLSX.writeFile(newBook, filePath);
    }

    return res.status(200).json({ message: 'Form data saved to Excel!' });
  } catch (error) {
    console.error('❌ Excel write failed:', error);
    return res.status(500).json({ error: 'Failed to write to Excel file' });
  }
}
