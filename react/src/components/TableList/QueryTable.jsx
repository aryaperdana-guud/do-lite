import React from "react";
import { CircleHelp, X, Download } from "lucide-react";

const table = {
    borderBottom: '2px solid #ccc', 
    padding: '10px',
}

const QueryTable = ({ data }) => {
  return (
    <div>
        <div style={{background: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
            <h4 style={{textAlign: 'center', fontSize: '20px'}}><CircleHelp size={16}/> Query</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                <thead className="table-head" style={{borderBottom: '1px solid #000000'}}>
                    <tr>
                    <th style={table}>Query ID</th>
                    <th style={table}>Requester</th>
                    <th style={table}>Query</th>
                    <th style={table}>Query Date</th>
                    <th style={table}>Responder</th>
                    <th style={table}>Response</th>
                    <th style={table}>Response Date</th>
                    <th style={table}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '18px', height: '100px', overflow: 'auto'}}>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.queryID}</td>
                    <td>{row.requester}</td>
                    <td>{row.query}</td>
                    <td>{row.queryDate}</td>
                    <td>{row.responder}</td>
                    <td>{row.response}</td>
                    <td>{row.responseDate}</td>
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

export default QueryTable;
