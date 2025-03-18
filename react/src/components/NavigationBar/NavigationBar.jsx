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

// Find the submenu that matches a pathname
const findMatchingSubmenu = (pathname) => {
  // First try to find an exact match
  for (const item of navigation) {
    if (item.submenu) {
      const exactMatch = item.submenu.find((sub) => sub.href === pathname);
      if (exactMatch) return exactMatch.href;
    }
  }

  // If no exact match, try to find a partial match
  for (const item of navigation) {
    if (item.submenu) {
      const partialMatch = item.submenu.find((sub) =>
        pathname.startsWith(sub.href)
      );
      if (partialMatch) return partialMatch.href;
    }
  }
};

export function NavigationBar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  useLayoutEffect(() => {
    // Get current path from browser
    const currentPath = window.location.pathname;

    // Find matching submenu for current path
    const matchingSubmenu = findMatchingSubmenu(currentPath);
    const matchingParent = findParentMenu(matchingSubmenu);

    // Use stored values if they match current URL, otherwise use detected values
    const storedActiveSubmenu = sessionStorage.getItem("activeSubmenu");
    const storedActiveMenu = sessionStorage.getItem("activeMenu");
    const storedExpandedMenu = sessionStorage.getItem("expandedMenu");

    // If stored values match current URL structure, use them
    if (
      storedActiveSubmenu &&
      (storedActiveSubmenu === currentPath ||
        currentPath.startsWith(storedActiveSubmenu))
    ) {
      setActiveSubmenu(storedActiveSubmenu);
      setActiveMenu(storedActiveMenu || matchingParent);
      setExpandedMenu(storedExpandedMenu || null);
    } else {
      // Otherwise set based on current URL
      setActiveSubmenu(matchingSubmenu);
      setActiveMenu(matchingParent);

      // Also expand parent menu if child is active
      if (matchingParent) {
        setExpandedMenu(matchingParent);
      }

      // Update session storage with new values
      sessionStorage.setItem("activeSubmenu", matchingSubmenu);
      sessionStorage.setItem("activeMenu", matchingParent);
      sessionStorage.setItem("expandedMenu", matchingParent || "");
    }

    const storedMinimized = localStorage.getItem("navMinimized");
    if (storedMinimized) {
      setIsMinimized(storedMinimized === "true");
    }
  }, []);

  const handleMenuClick = (href) => {
    // If clicking the active menu, toggle expanded state
    if (activeMenu === href) {
      const newExpandedState = expandedMenu === href ? null : href;
      setExpandedMenu(newExpandedState);
      sessionStorage.setItem("expandedMenu", newExpandedState || "");
    } else {
      // If clicking a different menu, set it as active and expanded
      setActiveMenu(href);
      setExpandedMenu(href);
      sessionStorage.setItem("activeMenu", href);
      sessionStorage.setItem("expandedMenu", href);
    }
  };

  const handleSubmenuClick = (href) => {
    setActiveSubmenu(href);
    sessionStorage.setItem("activeSubmenu", href);

    const parentMenu = findParentMenu(href);
    if (parentMenu) {
      setActiveMenu(parentMenu);
      sessionStorage.setItem("activeMenu", parentMenu);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      const newState = !prev;

      if (newState) {
        // Store expanded menu before minimizing
        if (expandedMenu) {
          sessionStorage.setItem("lastExpandedMenu", expandedMenu);
        }
        setExpandedMenu(null);
      } else {
        // Restore last expanded menu when maximizing
        const lastExpanded = sessionStorage.getItem("lastExpandedMenu");
        if (lastExpanded) {
          setExpandedMenu(lastExpanded);
        }
      }

      // Save minimized state to localStorage for persistence across sessions
      localStorage.setItem("navMinimized", newState.toString());
      return newState;
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
