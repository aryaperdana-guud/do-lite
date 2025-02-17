"use client"

import { useState } from "react"
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react"
import "./DOActive.css"

const MOCK_DATA = [
  {
    id: 1,
    payment: false,
    surrender: true,
    document: false,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 2,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 3,
    payment: false,
    surrender: true,
    document: false,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 4,
    payment: false,
    surrender: false,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 10,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567899",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:53",
    noOfBl: 1,
  },
  {
    id: 3,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 4,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 10,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567899",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:53",
    noOfBl: 1,
  },
  {
    id: 3,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 4,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 10,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567899",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:53",
    noOfBl: 1,
  },
  {
    id: 3,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 4,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 3,
  },
  {
    id: 10,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567899",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:53",
    noOfBl: 1,
  },
  {
    id: 3,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 4,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567890",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:44",
    noOfBl: 1,
  },
  {
    id: 10,
    payment: false,
    surrender: true,
    document: true,
    jobId: "DOJF1234567899",
    shipmentType: "IMPORT",
    shippingLine: "MSC",
    dateSubmitted: "03/01/2025 13:56:53",
    noOfBl: 1,
  },
]

export const ActiveListsTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const StatusIcon = ({ type, status }) => {
    const iconClass = `status-icon status-icon--${type} ${status ? "status-icon--active" : ""}`
    return (
      <div className={iconClass}>
        {type === "payment" && "✕"}
        {type === "surrender" && "✓"}
        {type === "document" && "..."}
      </div>
    )
  }

  const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const paginatedData = MOCK_DATA.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="active-lists">
      <div className="active-lists__header">
        <div className="active-lists__title-section">
          <h2 className="active-lists__title">Active List</h2>
          <button className="active-lists__download">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="active-lists__content">
        <table className="active-lists__table">
          <thead>
            <tr>
              <th>Payment</th>
              <th>Surrender</th>
              <th>Document</th>
              <th>Job ID</th>
              <th>Shipment Type</th>
              <th>Shipping Line</th>
              <th>Date Submitted</th>
              <th>No of BL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>
                  <StatusIcon type="payment" status={row.payment} />
                </td>
                <td>
                  <StatusIcon type="surrender" status={row.surrender} />
                </td>
                <td>
                  <StatusIcon type="document" status={row.document} />
                </td>
                <td>{row.jobId}</td>
                <td>{row.shipmentType}</td>
                <td>{row.shippingLine}</td>
                <td>{row.dateSubmitted}</td>
                <td>{row.noOfBl}</td>
                <td>
                  <button className="action-button">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="active-lists__footer">
      <div className="active-lists__controls">
          <div className="active-lists__pagination">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft size={16} />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="active-lists__items-per-page">
            <label htmlFor="itemsPerPage">Show:</label>
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

