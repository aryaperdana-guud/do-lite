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

// Find the parent menu for a given submenu href
const findParentMenu = (submenuHref) => {
  for (const item of navigation) {
    if (item.submenu) {
      const found = item.submenu.find((sub) => sub.href === submenuHref);
      if (found) return item.href;
    }
  }
  return null;
};

export function NavigationBar() {
  // Default to the active list on initial load if no session data
  const defaultActiveSubmenu = "/bol/active";
  const defaultActiveMenu =
    findParentMenu(defaultActiveSubmenu) || "/bill-of-ladings";

  const [activeMenu, setActiveMenu] = useState(defaultActiveMenu);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(defaultActiveSubmenu);
  const [isMinimized, setIsMinimized] = useState(false);

  useLayoutEffect(() => {
    const storedExpandedMenu = sessionStorage.getItem("expandedMenu");
    const storedActiveMenu = sessionStorage.getItem("activeMenu");
    const storedActiveSubmenu = sessionStorage.getItem("activeSubmenu");

    if (storedExpandedMenu) {
      setExpandedMenu(storedExpandedMenu);
    }
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    }
    if (storedActiveSubmenu) {
      setActiveSubmenu(storedActiveSubmenu);
    } else {
      // If no active submenu is stored, default to "/bol/active"
      setActiveSubmenu(defaultActiveSubmenu);
      setActiveMenu(defaultActiveMenu);

      // Store the defaults
      sessionStorage.setItem("activeSubmenu", defaultActiveSubmenu);
      sessionStorage.setItem("activeMenu", defaultActiveMenu);
    }
  }, []);

  const handleMenuClick = (href) => {
    setExpandedMenu((prev) => (prev === href ? null : href));
    setActiveMenu(href);
    sessionStorage.setItem("expandedMenu", expandedMenu === href ? "" : href);
    sessionStorage.setItem("activeMenu", href);
  };

  const handleSubmenuClick = (href) => {
    setActiveSubmenu(href);
    setExpandedMenu(null);
    sessionStorage.setItem("activeSubmenu", href);

    const parentMenu = findParentMenu(href);
    if (parentMenu) {
      setActiveMenu(parentMenu);
      sessionStorage.setItem("activeMenu", parentMenu);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      if (!prev) {
        if (expandedMenu) {
          sessionStorage.setItem("lastExpandedMenu", expandedMenu);
        }
        setExpandedMenu(null);
        sessionStorage.removeItem("expandedMenu");
      } else {
        const lastExpanded = sessionStorage.getItem("lastExpandedMenu");
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmenuClick(subitem.href);

                      window.location.href = subitem.href;
                    }}
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
