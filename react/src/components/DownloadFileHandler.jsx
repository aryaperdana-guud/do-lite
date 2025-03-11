import { useCallback } from "react";

const useDownloadFile = (apiUrl) => {
  return useCallback(
    async (blId) => {
      try {
        const authToken = localStorage.getItem("jwtToken"); // Pull token from local storage

        const url = `${apiUrl}?blId=${blId}&type=bl`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch file data");

        const data = await response.json();

        if (!data.blFileData || !data.blFileName)
          throw new Error("Invalid response: Missing file data");

        // Convert Base64 to Blob
        const byteCharacters = atob(data.blFileData);
        const byteNumbers = new Uint8Array(
          [...byteCharacters].map((char) => char.charCodeAt(0))
        );
        const blob = new Blob([byteNumbers], { type: "application/pdf" });

        // Trigger file download
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = data.blFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.error("Download failed:", error);
      }
    },
    [apiUrl]
  );
};

export default useDownloadFile;
