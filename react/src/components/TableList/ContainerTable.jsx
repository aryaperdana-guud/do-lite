import React, {useState} from "react";

const ContainerTable = ({ data }) => {

    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelect = (index) => {
        setSelectedRows((prevSelected) =>
          prevSelected.includes(index)
            ? prevSelected.filter((id) => id !== index)
            : [...prevSelected, index]
        );
    };

    return (
        <div className="table-container">
            <div className="wrapper">
                <table className="c-table">
                    <thead className="c-head">
                        <tr>
                            <th>Marks and Number</th>
                            <th>Container Category</th>
                            <th>Dangerous Good</th>
                            <th>Valid Till Date</th>
                            <th>Next Valid Till Date</th>
                            <th>Extension Days</th>
                        </tr>
                    </thead>
                    <tbody className="c-body">
                        {data.map((row, index) => (
                        <tr key={index}>
                        <td>{row.marksAndNumber}</td>
                        <td>{row.containerCat}</td>
                        <td>
                            {row.dangerousGood && row.dangerousGood !== "-" ? (
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(index)}
                                        onChange={() => handleRowSelect(index)}
                                    />
                                    <span> YES</span>
                                </label>
                                ) : (
                                "-"
                            )}
                        </td>
                        <td>{row.vtd}</td>
                        <td>{row.nextvtd}</td>
                        <td>{row.extDays}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContainerTable;
