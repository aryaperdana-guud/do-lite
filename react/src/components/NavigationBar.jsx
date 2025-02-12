"use client"

import { useState } from "react"
import "./NavigationBar.css"
import NavImage from "../assets/Nav-icon.png"
import { FaFileAlt, FaClipboardList, FaFolder, FaCalendarAlt, FaCreditCard,FaChevronDown } from "react-icons/fa"


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

  const handleMenuClick = (href) => {
    if (activeMenu === href) {
      setExpandedMenu(expandedMenu === href ? null : href)
    } else {
      setActiveMenu(href)
      setExpandedMenu(href)
    }
  }

  return (
    <div className="navigation-bar">
      <div className="logo-container">
        <img src={NavImage} alt="Clickargo Logo" className="logo" />
      </div>

      <nav className="nav-menu">
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

