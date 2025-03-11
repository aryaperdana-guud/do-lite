import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { Search} from "lucide-react";
import React from "react";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";
import ViewExtHeader from "../components/ViewExtHeader.jsx";
import ViewExtGenDetails from "../components/ViewExtGenDetails.jsx";

const DOExtView = () => {
  
  return (
    <div className="dashboard_claim">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />
        <h1 className="title">
          <Search size={40} /> View DO Extension
        </h1>
        <div className="edit-do-container">
            <ViewExtHeader/>
            <ViewExtGenDetails/>
        </div>  
      </main>
    </div>
  );
};

export default DOExtView;
