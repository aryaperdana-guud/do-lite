import { useState, useLayoutEffect } from "react";
import "./NavigationBar.css";
import {
  FaFileAlt,
  FaClipboardList,
  FaFolder,
  FaCalendarAlt,
  FaCreditCard,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import NavImage from "../../assets/NAV-icon.png";

const navigation = [
  {
    title: "Bill of Ladings",
    href: "/bill-of-ladings",
    icon: <FaFileAlt />,
    submenu: [
      { title: "New BL", href: "/bol/newbl" },
      { title: "Active List", href: "/bol/active" },
      { title: "History List", href: "/bol/history" },
    ],
  },
  {
    title: "DO Claims",
    href: "/do-claims",
    icon: <FaClipboardList />,
    submenu: [
      { title: "Active List", href: "/do-claims/active" },
      { title: "History List", href: "/do-claims/history" },
    ],
  },
  {
    title: "My DO",
    href: "/my-do",
    icon: <FaFolder />,
    submenu: [
      { title: "Active List", href: "/my-do/active" },
      { title: "History List", href: "/my-do/history" },
    ],
  },
  {
    title: "DO Extension",
    href: "/do-extension",
    icon: <FaCalendarAlt />,
    submenu: [
      { title: "Active List", href: "/do-extension/active" },
      { title: "History List", href: "/do-extension/history" },
    ],
  },
  {
    title: "DO Payments",
    href: "/do-payments",
    icon: <FaCreditCard />,
    submenu: [
      { title: "Payments", href: "/do-payment/payment" },
      { title: "Transactions", href: "/do-payment/transactions" },
    ],
  },
];

export function NavigationBar() {
  const [activeMenu, setActiveMenu] = useState("/bill-of-ladings");
  const [expandedMenu, setExpandedMenu] = useState(null); // Track expanded menu
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Track active submenu
  const [isMinimized, setIsMinimized] = useState(false);

  useLayoutEffect(() => {
    const storedExpandedMenu = localStorage.getItem("expandedMenu");
    const storedActiveMenu = localStorage.getItem("activeMenu");
    const storedActiveSubmenu = localStorage.getItem("activeSubmenu");

    if (storedExpandedMenu) {
      setExpandedMenu(storedExpandedMenu);
    }
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    }
    if (storedActiveSubmenu) {
      setActiveSubmenu(storedActiveSubmenu);
    }
  }, []);

  const handleMenuClick = (href) => {
    setExpandedMenu((prev) => (prev === href ? null : href)); // Toggle if clicked again
    setActiveMenu(href); // Set the active menu
    localStorage.setItem("expandedMenu", expandedMenu === href ? "" : href); // Save expanded state
    localStorage.setItem("activeMenu", href);
  };

  const handleSubmenuClick = (href) => {
    setActiveSubmenu(href); // Set the active submenu
    setExpandedMenu(null); // Collapse the parent menu after submenu selection
    localStorage.setItem("activeSubmenu", href); // Save submenu active state
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      if (!prev) {
        // Before minimizing, save the current expanded menu
        if (expandedMenu) {
          localStorage.setItem("lastExpandedMenu", expandedMenu);
        }
        setExpandedMenu(null);
        localStorage.removeItem("expandedMenu");
      } else {
        // When expanding back, restore the last expanded menu
        const lastExpanded = localStorage.getItem("lastExpandedMenu");
        if (lastExpanded) {
          setExpandedMenu(lastExpanded);
        }
      }
      return !prev;
    });
  };

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
          onClick={toggleMinimize}
        >
          {isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
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
                <span
                  className={`chevron ${expandedMenu === item.href ? "rotated" : ""}`}
                >
                  <FaChevronDown />
                </span>
              )}
            </button>
            {item.submenu && (
              <div
                className={`submenu ${expandedMenu === item.href ? "expanded" : ""}`}
              >
                {item.submenu.map((subitem) => (
                  <a
                    key={subitem.href}
                    href={subitem.href}
                    className={`submenu-item ${activeSubmenu === subitem.href ? "active" : ""}`}
                    onClick={() => handleSubmenuClick(subitem.href)} // Handle submenu click
                  >
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
  );
}
