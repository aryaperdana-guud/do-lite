import React, {useState,useEffect} from "react";
import AttachmentTable from "./TableList/AttachmentTable";

const buttons = {
    display: 'flex', 
    gap: '10px',
    paddingTop: '20px',
}

const button = {
    color: 'white', 
    borderRadius: '10px',
}

const DOClaimViewAttachments = () => {

  const [attData, setAttdata] = useState([]);

    useEffect(() => {
        // Simulasi Fetch Data
        setAttdata([
          {
            documentID: "CKJA1234567890",
            docType: "POWER OF AUTHORITY",
            authoriser: "CARGO OWNER 1",
            blNo: "MEDUU12345",
            doNo: "DO1234567890",
            createdAt: "10/02/2025 15:51:07",
            validityDate: "10/02/2025 15:51:07",
          },
          {
            documentID: "CKJA1234567890",
            docType: "CONTAINER GUARANTEE",
            authoriser: "CARGO OWNER 1",
            blNo: "MEDUU12345",
            doNo: "DO1234567890",
            createdAt: "10/02/2025 15:51:07",
            validityDate: "10/02/2025 15:51:07",
          },
        ]);
      }, []);

return (
    <div>
        <div>
            <AttachmentTable data={attData} />
        </div>
        <div style={buttons}>
            <button style={{...button, backgroundColor: '#263754' }}>ADD</button>
            <button style={{...button, backgroundColor: '#39E839'}}>CONFIRM</button>
        </div>
    </div>
  );
};

export default DOClaimViewAttachments;