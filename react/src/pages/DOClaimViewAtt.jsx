import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { Pencil} from "lucide-react";
import React from "react";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import DOClaimHeader from "../components/DOClaimHeader.jsx";
import DOClaimViewAttachments from "../components/DOClaimViewAttachments.jsx";

const DOClaimViewAtt = () => {
  
  return (
    <div className="dashboard_claim">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />
        <h1 className="title">
          <Pencil size={40} /> Edit DO
        </h1>
        <div className="edit-do-container">
            <DOClaimHeader/>
            <DOClaimViewAttachments/>
        </div>
      </main>
    </div>
  );
};

export default DOClaimViewAtt;
