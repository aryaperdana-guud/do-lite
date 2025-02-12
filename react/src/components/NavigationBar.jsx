"use client"

import { useState } from "react"
import "./NavigationBar.css"
import NavImage from "../assets/Nav-icon.png"

const navigation = [
  {
    title: "Bill of Ladings",
    href: "/bill-of-ladings",
    submenu: [{ title: "New BL", href: "/bill-of-ladings/new" }],
  },
  {
    title: "DO Claims",
    href: "/do-claims",
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "My DO",
    href: "/my-do",
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "DO Extension",
    href: "/do-extension",
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
    ],
  },
  {
    title: "DO Payments",
    href: "/do-payments",
    submenu: [
      { title: "Nav 1", href: "#" },
      { title: "Nav 2", href: "#" },
      { title: "Nav 3", href: "#" },
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
        <img src= {NavImage} alt="Clickargo Logo" className="logo" />
      </div>

      <nav className="nav-menu">
        {navigation.map((item) => (
          <div key={item.href} className="menu-item">
            <button
              onClick={() => handleMenuClick(item.href)}
              className={`menu-button ${activeMenu === item.href ? "active" : ""}`}
            >
              {item.title}
              {item.submenu && <span className={`chevron ${expandedMenu === item.href ? "rotated" : ""}`}>▶</span>}
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

