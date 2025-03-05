import React from "react";

const ExtAuditTable = ({ data }) => {
  return (
    <div style={{background: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}> 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{borderBottom: '2px solid #ccc', padding: '10px'}}>Event</th>
                        <th style={{borderBottom: '2px solid #ccc', padding: '10px'}}>Timestamp</th>
                        <th style={{borderBottom: '2px solid #ccc', padding: '10px'}}>Remarks</th>
                        <th style={{borderBottom: '2px solid #ccc', padding: '10px'}}>User ID</th>
                        <th style={{borderBottom: '2px solid #ccc', padding: '10px'}}>User Name</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '18px', height: '200px'}}>
                    {data.map((row, index) => (
                    <tr key={index}>
                    <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.event}</td>
                    <td>{row.timestamp}</td>
                    <td>{row.remarks || "-"}</td>
                    <td>{row.userId}</td>
                    <td  style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{row.userName}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ExtAuditTable;
