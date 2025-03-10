import React from "react";
import { Clock } from "lucide-react";

const table = {
    borderBottom: '2px solid #ccc', 
    padding: '10px',
}

const AuditTable = ({ data }) => {
  return (
    <div>
        <div style={{background: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
            <h4 style={{textAlign: 'center', fontSize: '20px'}}><Clock size={16}/> Audit</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                <thead className="table-head" style={{borderBottom: '1px solid #000000'}}>
                    <tr>
                    <th style={table}>Event</th>
                    <th style={table}>Timestamp</th>
                    <th style={table}>Remarks</th>
                    <th style={table}>User ID</th>
                    <th style={table}>Username</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '18px', height: '100px', overflow: 'auto'}}>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.event}</td>
                    <td>{row.timestamp}</td>
                    <td>{row.remarks}</td>
                    <td>{row.userID}</td>
                    <td style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>{row.username}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
};

export default AuditTable;
