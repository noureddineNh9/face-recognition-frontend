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
      }).then((res) => {
         if (!res.ok) {
            res.json().then((data) => {
               console.log(data);
            });
         } else {
            res.json().then((data) => {
               props.loadUser(data);
               props.changeRoute("home");
            });
         }
      });
   };

   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
         }}
      >
         <article className="register-form">
            <h3 className="text-center mb-5 mt-2">Sign In</h3>
            <form
               className="mb-5"
               method="get"
               id="contactForm"
               name="contactForm"
            >
               <div className=" form-group mb-3">
                  <input
                     onChange={onValueChange}
                     type="email"
                     className="form-control"
                     name="email"
                     id="email"
                     placeholder="Your email"
                  />
               </div>

               <div className="col-md-12 form-group mb-3">
                  <input
                     onChange={onValueChange}
                     type="password"
                     className="form-control"
                     name="password"
                     id="password"
                     placeholder="Password"
                  />
               </div>

               <div
                  className=""
                  style={{
                     display: "flex",
                     justifyContent: "center",
                  }}
               >
                  <button
                     onClick={onSubmit}
                     type="submit"
                     className=" mt-3 _btn _btn--main _btn-sm btn--animated"
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
