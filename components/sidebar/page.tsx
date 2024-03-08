"use client";
import { Fragment, useState } from "react";

import CloseSideBar from "./close-side-bar/page";
import OpenSideBar from "./open-side-bar/page";
import { useAuth } from "@/context/AuthContext";
import ErrorModal from "../error-modal/page";

const Sidebar: React.FC = () => {
  const [openSideBar, setOpenSideBar] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openErrorModal, setOpenErrorModal] = useState<Boolean>(false);
  const { user } = useAuth();

  const warningUserNotLoggedIn = () => {
    if (!user.email || !user.displayName || !user.password) {
      setErrorMessage("Please Sign In");
      setOpenErrorModal(true);
    }
  };

  const toggleSideBarHandler = () => {
    if (user.email || user.displayName || user.password) {
      setOpenSideBar(!openSideBar);
    } 
    else {
      warningUserNotLoggedIn();
    }
  };

  const closeErrorModal  = () => {
    setOpenErrorModal(false);
  }

  return (
    <Fragment>
      {user && (
        <>
          {openSideBar ? (
            <OpenSideBar onClose={toggleSideBarHandler} />
          ) : (
            <>
              <CloseSideBar
                onWarning={warningUserNotLoggedIn}
                onOpen={toggleSideBarHandler}
              />
              {errorMessage && openErrorModal && <ErrorModal message={errorMessage} onClose={closeErrorModal}/>}
            </>
          )}
        </>
      )}
    </Fragment>
  );
};

export default Sidebar;
