import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { Search} from "lucide-react";
import React from "react";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import DOClaimHeader from "../components/DOClaimHeader.jsx";
import DOClaimViewAudit from "../components/DOClaimViewAudit.jsx";

const DOClaimViewAdt = () => {
  
  return (
    <div className="dashboard_claim">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />
        <h1 className="title">
          <Search size={40} /> View DO
        </h1>
        <div className="edit-do-container">
            <DOClaimHeader/>
            <DOClaimViewAudit/>
        </div>
      </main>
    </div>
  );
};

export default DOClaimViewAdt;
