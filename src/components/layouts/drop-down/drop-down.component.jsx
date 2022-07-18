import React, { useEffect } from "react";
import "./drop-down.styles.scss";

function DropDown({ children, icon }) {
   useEffect(() => {
      const dropDownBtn = document.getElementById("dropdown__button");
      const dropDownList = document.querySelector(".dropdown__list");

      dropDownBtn.addEventListener("click", () => {
         dropDownList.classList.toggle("hidden");
      });

      dropDownList.addEventListener("click", () => {
         dropDownList.classList.add("hidden");
      });
   }, []);

   return (
      <div className="relative">
         <span id="dropdown__button">{icon}</span>
         <div className="dropdown__list hidden">{children}</div>
      </div>
   );
}

export default DropDown;
