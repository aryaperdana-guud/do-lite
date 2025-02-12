"use client"

import { useState } from "react"
import "./NavigationBar.css"
import {
  FaFileAlt,
  FaClipboardList,
  FaFolder,
  FaCalendarAlt,
  FaCreditCard,
  FaChevronDown,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import NavImage from "../assets/NAV-icon.png"

const navigation = [
  {
    title: "Bill of Ladings",
    href: "/bill-of-ladings",
    icon: <FaFileAlt />,
    submenu: [{ title: "New BL", href: "/bill-of-ladings/new" }],
  },
  {
    title: "DO Claims",
    href: "/do-claims",
    icon: <FaClipboardList />,
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "My DO",
    href: "/my-do",
    icon: <FaFolder />,
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "DO Extension",
    href: "/do-extension",
    icon: <FaCalendarAlt />,
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "DO Payments",
    href: "/do-payments",
    icon: <FaCreditCard />,
    submenu: [
      { title: "Payments", href: "#" },
      { title: "Transactions", href: "#" },
    ],
  },
]

export function NavigationBar() {
  const [activeMenu, setActiveMenu] = useState("/bill-of-ladings")
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleMenuClick = (href) => {
    if (activeMenu === href) {
      setExpandedMenu(expandedMenu === href ? null : href)
    } else {
      setActiveMenu(href)
      setExpandedMenu(href)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (!isMinimized) {
      setExpandedMenu(null)
    }
  }

  return (
    <div className={`navigation-bar ${isMinimized ? "minimized" : ""}`}>
      <div className="nav-header">
        <div className="logo-container">
          <img src={NavImage} alt="Clickargo Logo" className="logo" />
        </div>
      </div>

      <nav className="nav-menu">
          <button 
              className={`toggle-button ${isMinimized ? "rotated" : ""}`} 
              onClick={toggleMinimize}>{isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

        {navigation.map((item) => (
          <div key={item.href} className="menu-item">
            <button
              onClick={() => handleMenuClick(item.href)}
              className={`menu-button ${activeMenu === item.href ? "active" : ""}`}
            >
              <div className="menu-icon-container">{item.icon}</div>
              <span className="menu-title">{item.title}</span>
              {item.submenu && (
                <span className={`chevron ${expandedMenu === item.href ? "rotated" : ""}`}>
                  <FaChevronDown />
                </span>
              )}
            </button>
            {item.submenu && (
              <div className={`submenu ${expandedMenu === item.href ? "expanded" : ""}`}>
                {item.submenu.map((subitem) => (
                  <a key={subitem.href} href={subitem.href} className="submenu-item">
                    {subitem.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="footer-links">
        <a href="/faq" className="footer-link">
          FAQ
        </a>
        <span className="separator">•</span>
        <a href="/contact" className="footer-link">
          Contact Us
        </a>
      </div>
    </div>
  )
}

