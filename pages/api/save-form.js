console.log("🔥 API called");
import * as XLSX from "xlsx";
console.log("✅ File write attempted");
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body;

    const filePath = path.join(process.cwd(), "public", "submissions.xlsx");

    const sheetName = "Submissions";

    let data = [];

    // If file exists, read existing data
    if (fs.existsSync(filePath)) {
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[sheetName];
      if (worksheet) {
        data = XLSX.utils.sheet_to_json(worksheet);
      }
      data.push(formData);
      const newWorksheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets[sheetName] = newWorksheet;
      XLSX.writeFile(workbook, filePath);
    } else {
      // Create new workbook and sheet
      data.push(formData);
      const newWorkbook = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
      XLSX.writeFile(newWorkbook, filePath);
    }

    console.log("✅ Excel file updated at:", filePath);
    res.status(200).json({ message: "Form data saved to Excel!" });
  } else {
    res.status(405).json({ error: "Only POST method allowed" });
  }
}
