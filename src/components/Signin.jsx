import React, { useState } from "react";

function Signin(props) {
   const [formValue, setFormValue] = useState({
      email: "",
      password: "",
   });

   //const BASE_URL = "https://desolate-coast-02851.herokuapp.com";
   const BASE_URL = "http://localhost:3000";

   const onValueChange = (event) => {
      const value = event.target.value;
      setFormValue({
         ...formValue,
         [event.target.name]: value,
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      fetch(BASE_URL + "/signin", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            email: formValue.email,
            password: formValue.password,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.userId) {
               window.sessionStorage.setItem("token", data.token);
               props.loadUser(data.userId, data.token);
               props.changeRoute("home");
            }
         });
   };

   return (
      <div className="flex justify-center">
         <article
            className="bg-white p-16 rounded-lg shadow-md"
            style={{ width: "500px" }}
         >
            <h3 className="text-center mb-8 ">Sign In</h3>
            <form
               className="form__1 mb-5"
               method="get"
               id="contactForm"
               name="contactForm"
            >
               <div className=" mb-6">
                  <input
                     onChange={onValueChange}
                     type="email"
                     className="form-input"
                     name="email"
                     id="email"
                     placeholder="Your email"
                  />
               </div>

               <div className=" mb-6">
                  <input
                     onChange={onValueChange}
                     type="password"
                     className="form-input"
                     name="password"
                     id="password"
                     placeholder="Password"
                  />
               </div>

               <div className="flex justify-center mt-8">
                  <button
                     onClick={onSubmit}
                     type="submit"
                     className="button__1"
                  >
                     Sign In
                  </button>
               </div>
            </form>
         </article>
      </div>
   );
}

export default Signin;
