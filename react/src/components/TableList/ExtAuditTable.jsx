import React from "react";

const ExtAuditTable = ({ data }) => {
  return (
    <div className="audit-table-container">
        <div className="table-wrapper">
            <table className="audit-table">
                <thead className="t-head">
                    <tr>
                        <th>Event</th>
                        <th>Timestamp</th>
                        <th>Remarks</th>
                        <th>User ID</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody className="t-body">
                    {data.map((row, index) => (
                    <tr key={index}>
                    <td>{row.event}</td>
                    <td>{row.timestamp}</td>
                    <td>{row.remarks || "-"}</td>
                    <td>{row.userId}</td>
                    <td>{row.userName}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ExtAuditTable;
