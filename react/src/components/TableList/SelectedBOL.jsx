import React from "react";
import { MousePointer, X, Download } from "lucide-react";

const SelectedBOL = ({ data }) => {
  return (
    <div>
        <div style={{background: '#eaeaea', padding: '20px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
            <h4 className="form-title"><MousePointer size={16}/> Selected Bill of Ladings</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
                <thead className="table-head" style={{borderBottom: '1px solid #000000'}}>
                    <tr>
                    <th>BL No.</th>
                    <th>Container No.</th>
                    <th>Shipping Line</th>
                    <th>Authoriser</th>
                    <th>BL Date Submitted</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '18px', height: '100px', overflow: 'auto'}}>
                {data.map((row, index) => (
                    <tr key={index}>
                    <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.blNo}</td>
                    <td>{row.containerNo}</td>
                    <td>{row.shippingLine || "-"}</td>
                    <td>{row.authoriser}</td>
                    <td>{row.blDateSubmitted}</td>
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

export default SelectedBOL;
