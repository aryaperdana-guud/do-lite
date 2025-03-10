import React from "react";
import { Paperclip, X, Download } from "lucide-react";

const table = {
    borderBottom: '2px solid #ccc', 
    padding: '10px',
}
const AttachmentTable = ({ data }) => {
  return (
    <div>
        <div style={{background: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px', height: '400px'}}>
            <h4 style={{textAlign: 'center', fontSize: '20px'}}><Paperclip size={16}/> Attachments</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                <thead className="table-head" style={{borderBottom: '1px solid #000000'}}>
                    <tr>
                    <th style={table}>Document ID</th>
                    <th style={table}>Document Type</th>
                    <th style={table}>Authoriser</th>
                    <th style={table}>BL No.</th>
                    <th style={table}>DO No.</th>
                    <th style={table}>Created At</th>
                    <th style={table}>Validity Date</th>
                    <th style={table}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '18px', height: '100px', overflow: 'auto'}}>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.documentID}</td>
                    <td>{row.docType}</td>
                    <td>{row.authoriser}</td>
                    <td>{row.blNo}</td>
                    <td>{row.doNo}</td>
                    <td>{row.createdAt}</td>
                    <td>{row.validityDate}</td>
                    <td style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                        <div className="button-action">
                        <button className="action-button_sbol" onClick={() => console.log("Delete clicked")}>
                            <X size={16} />
                        </button>
                        <button className="action-button_sbol" onClick={() => console.log("Download clicked")}>
                            <Download size={16} />
                        </button>
                        </div>
                    </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
};

export default AttachmentTable;
