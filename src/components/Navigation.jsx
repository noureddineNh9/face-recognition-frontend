import React from "react";
import profileIcon from "../assets/user.png";
import DropDown from "./layouts/drop-down/drop-down.component";

function Navigation(props) {
   return (
      <nav className="flex justify-between items-center py-4 px-8 shadow-md">
         <h4>Face Recognition</h4>
         <div className="flex">
            {props.isSignin ? (
               <>
                  <DropDown
                     icon={
                        <img
                           src={profileIcon}
                           alt="profile"
                           className="profileIcon"
                        />
                     }
                  >
                     <div className="flex flex-col text-center px-8 py-4 ">
                        <button
                           className="nav__link my-2"
                           onClick={props.toggleModal}
                        >
                           Profile
                        </button>
                        <button
                           className="nav__link my-2"
                           onClick={() => props.changeRoute("signin")}
                        >
                           Sign Out
                        </button>
                     </div>
                  </DropDown>
               </>
            ) : (
               <>
                  <button
                     className="nav__link ml-8"
                     onClick={() => props.changeRoute("signin")}
                  >
                     Sign In
                  </button>
                  <button
                     className="nav__link ml-8"
                     onClick={() => props.changeRoute("register")}
                  >
                     Register
                  </button>
               </>
            )}
         </div>
      </nav>
   );
}

export default Navigation;
