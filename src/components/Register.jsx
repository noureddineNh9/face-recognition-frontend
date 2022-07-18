import React, { useState } from "react";

import { BASE_URL } from "../api/api";

function Register(props) {
   //const BASE_URL = "https://desolate-coast-02851.herokuapp.com";

   const [formValue, setFormValue] = useState({
      email: "",
      name: "",
      password: "",
      entries: "0",
      joined: "",
   });
   const [errors, setErrors] = useState({});

   const onValueChange = (event) => {
      const value = event.target.value;
      setFormValue({
         ...formValue,
         [event.target.name]: value,
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();

      fetch(BASE_URL + "/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            email: formValue.email,
            name: formValue.name,
            password: formValue.password,
         }),
      })
         .then((res) => {
            if (!res.ok) {
               res.json().then((data) => console.log(data));
            } else {
               res.json().then((data) => {
                  props.loadUser(data);
                  props.changeRoute("home");
               });
            }
         })
         .catch(console.log());
   };

   return (
      <div className="flex justify-center">
         <article
            className="bg-white p-16 rounded-lg shadow-md"
            style={{ width: "500px" }}
         >
            <h3 className="text-center mb-6 ">Register</h3>
            <form
               className="form__1 mb-5"
               method="get"
               id="contactForm"
               name="contactForm"
            >
               <div className="mb-6">
                  <input
                     onChange={onValueChange}
                     type="text"
                     className="form-input"
                     name="name"
                     id="name"
                     placeholder="Your name"
                  />
               </div>
               <div className="mb-6">
                  <input
                     onChange={onValueChange}
                     type="email"
                     className="form-input"
                     name="email"
                     id="email"
                     placeholder="Your email"
                  />
               </div>

               <div className="mb-6">
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
                     Register
                  </button>
               </div>
            </form>
         </article>
      </div>
   );
}

export default Register;
