import { NavigationBar } from "../components/NavigationBar/NavigationBar.jsx"
import { Pencil } from "lucide-react";
import "./EditDOClaimAttachments.css"
import EditDOClaimAtt from "../components/EditDOClaimAtt.jsx";
import EditDOClaimHeader from "../components/EditDOClaimHeader.jsx";
import React from "react"
import ProfileDropdown from "../components/ProfileBar/Profile.jsx";

const EditDOClaimAttachments = ({id}) => {
    console.log("EditDOClaimAttachments ID:", id);
   
    return (
        <div className="dashboard_att">
            <NavigationBar />
            <main className="main-content">
                <ProfileDropdown />
                <h1 className="title"><Pencil size={40}/>  Edit DO</h1>
                <div className="edit-do-container">
                    
                    <EditDOClaimHeader/>
                    <EditDOClaimAtt/>
                </div>
            </main>
                       
        </div>
    );
};
  
export default EditDOClaimAttachments;