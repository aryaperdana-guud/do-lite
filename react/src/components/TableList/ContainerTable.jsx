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
        <div style={{background: '#eaeaea', padding: '10px', borderRadius: '10px', textAlign: 'center', paddingBottom: '20px'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px', width: '100%' }}>
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
                    <tbody style={{ backgroundColor: 'white', borderCollapse: 'collapse', fontSize: '16px', height: '200px', overflow: 'auto'}}>
                        {data.map((row, index) => (
                        <tr key={index}>
                        <td style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>{row.marksAndNumber}</td>
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
                        <td style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{row.extDays}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContainerTable;
