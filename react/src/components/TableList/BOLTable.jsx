"use client"
import React from "react"
import { useState } from "react"
import { Download, File, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react"
import "./BOLTable.css"
import { Navigate, useNavigate } from "react-router-dom"
import { StatusIcon } from '../StatusRender.jsx';  // Make sure path is correct
import { Badge, IconButton, Typography } from "@mui/material";
import FileIcon from "@mui/icons-material/InsertDriveFile";


export const BOLTable = ({
  title,
  data,
  loading = false,
  onDownload,
  onDownloadItem,
  onViewItem,
  onDeleteItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedItems, setSelectedItems] = useState([])

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(paginatedData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const navigate = useNavigate()

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const paginatedData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || []

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">{title}</h2>
          <div className="active-lists__actions">
            <button className="active-lists__download" onClick={onDownload}>
             {title!=="History List"&& (<Badge
                badgeContent={selectedItems.length}
                color="primary"
                overlap="circular"
                title="Selected"
              ><File size={30} />
              </Badge>)}
            </button>      
          
            <button className="active-lists__download" onClick={onDownload} title="Download Lists">
                <Download size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="active-lists__content">
        {loading ? (
          <div className="active-lists__loading">Loading...</div>
        ) : (
          <table className="active-lists__table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={paginatedData.length > 0 && selectedItems.length === paginatedData.length}
                      className="checkbox-input"
                    />
                  </div>
                </th>
                <th>Status</th>
                <th>BL No.</th>
                <th>Container No.</th>
                <th>Shipping Line</th>
                <th>Submitted Date</th>
                <th>Submitted By</th>
                <th>Assigned Job No.</th>
                <th>Assigned Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                    Sorry, no matching records found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td className="checkbox-column">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(row.id)}
                          onChange={() => handleSelectItem(row.id)}
                          className="checkbox-input"
                        />
                      </div>
                    </td>
                    <td>
                      <td><StatusIcon status={row.status} /></td>
                    </td>
                    <td>{row.blNo}</td>
                    <td>{row.containerNo}</td>
                    <td>{row.shippingLine}</td>
                    <td>{row.submittedDate}</td>
                    <td>{row.submittedBy}</td>
                    <td>{row.assignedJobNo}</td>
                    <td>{row.assignedDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-button"
                          onClick={() => navigate(`/bol/active/view/${row.id}`, { state: row }) }
                          title="View"
                        >
                          <Eye size={16} />
                        </button>


                        <button className="action-button" onClick={() => onDownloadItem?.(row)} title="Download">
                          <Download size={16} />
                        </button>

                        <button className="action-button" onClick={() => onDeleteItem?.(row)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="active-lists__footer">
        <div className="active-lists__controls">
          <div className="active-lists__column-select">
            <span>Column:</span>
            <select className="row-number"value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="active-lists__pagination">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BOLTable

