"use client";
import { Fragment, useState } from "react";

import CloseSideBar from "./close-side-bar/page";
import OpenSideBar from "./open-side-bar/page";
import { useAuth } from "@/context/AuthContext";

const Sidebar: React.FC = () => {
  const [openSideBar, setOpenSideBar] = useState<Boolean>(false);
  const { user } = useAuth();

  const featureWarningHandler = () => {
    if (!user.email || !user.displayName || !user.password) {
      alert("Please sign in to use this feature");
    }
  };

  const toggleSideBarHandler = () => {
    if (user.email || user.displayName || user.password) {
      setOpenSideBar(!openSideBar);
    } 
    else {
      featureWarningHandler();
    }
  };

  return (
    <Fragment>
      {user && (
        <>
          {openSideBar ? (
            <OpenSideBar onClose={toggleSideBarHandler} />
          ) : (
            <CloseSideBar
              onWarning={featureWarningHandler}
              onOpen={toggleSideBarHandler}
            />
          )}
        </>
      )}
    </Fragment>
  );
};

export default Sidebar;
