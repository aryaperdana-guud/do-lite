const downloadExcel = async (apiUrl, fileName) => {
  try {
    const XLSX = await import("xlsx"); // Dynamically import SheetJS

    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to download file");

    const arrayBuffer = await response.arrayBuffer();

    // Convert API response to a workbook
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Convert workbook to a Blob
    const excelBlob = new Blob(
      [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const timestamp = new Date()
      .toISOString()
      .replace("T", "_")
      .replace(/\..+/, "")
      .replace(/:/g, "-");

    const fullFileName = `${fileName}_${timestamp}.xlsx`;

    // Create and trigger download link
    const url = window.URL.createObjectURL(excelBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fullFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Failed to download file. Check the console for details.");
  }
};

export default downloadExcel;
