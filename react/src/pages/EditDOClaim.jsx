import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx";
import { Pencil } from "lucide-react";
import "./EditDOClaim.css";
import EditDOClaimHeader from "../components/EditDOClaimHeader.jsx";
import EditDOClaimViewClaimDetails from "../components/EditDOClaimClaimDetails.jsx";
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const EditDOClaim = () => {
  return (
    <div className="dashboard_claim">
      <NavigationBar />
      <main className="main-content">
        <ProfileDropdown />
        <h1 className="title">
          <Pencil size={40} /> Edit DO
        </h1>
        <div className="edit-do-container">
          <EditDOClaimHeader/>
          <EditDOClaimViewClaimDetails/>
        </div>
      </main>
    </div>
  );
};

export default EditDOClaim;
