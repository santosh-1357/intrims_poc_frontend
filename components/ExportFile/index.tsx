import * as XLSX from "xlsx";
import Icon from "../Icons";
import { Button } from "primereact/button";
import { ExportButtonProps } from "@/common/types";

const commonStyle =
  "flex h-8 w-8 justify-center bg-brand-500 p-1.5 text-white transition duration-200";

// XLSX export component
const ExcelExportButton = ({
  data,
  fileName = "download",
}: ExportButtonProps) => {
  const handleExport = () => {
    const workbook = XLSX.utils.book_new();

    if (Array.isArray(data)) {
      // If data is a single array, create a single sheet named 'Sheet1'
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    } else if (typeof data === "object" && Object.keys(data).length > 0) {
      // If data is an object with multiple sheets, create sheets dynamically
      Object.keys(data).forEach((sheetName) => {
        const worksheet = XLSX.utils.json_to_sheet(data[sheetName]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });
    } else {
      console.error("Invalid data format for Excel export.");
      return;
    }

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button
      type="button"
      tooltip="Download XLSX"
      onClick={handleExport}
      disabled={!data?.length}
      tooltipOptions={{
        position: "bottom",
        mouseTrack: true,
        mouseTrackTop: 15,
      }}
      severity="success"
      rounded
      className={commonStyle}
    >
      <Icon name="excel-file" />
    </Button>
  );
};

// CSV export Component
const CSVExportButton = ({
  data,
  fileName = "download",
}: ExportButtonProps) => {
  const handleExport = () => {
    // Convert data to CSV content
    const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create download link and trigger download
    const csvURL = URL.createObjectURL(csvBlob);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <Button
      type="button"
      tooltip="Download CSV"
      onClick={handleExport}
      disabled={!data?.length}
      tooltipOptions={{
        position: "bottom",
        mouseTrack: true,
        mouseTrackTop: 15,
      }}
      severity="success"
      rounded
      className={commonStyle}
    >
      <Icon name="csv-file" />
    </Button>
  );
};

export { ExcelExportButton, CSVExportButton };
