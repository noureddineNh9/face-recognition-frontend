import React from "react";
import "./profile.styles.scss";

import { BASE_URL } from "../../api/api";

import img from "../../assets/user.png";
import Form from "../utils/Form";
import FormInput from "../utils/FormInput";

function Profile({ toggleModal, user, setUser }) {
   const initialValues = {
      name: user.name,
   };

   const handleSubmit = async (FormValues) => {
      fetch(`${BASE_URL}/profile/${user.id}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
         },
         body: JSON.stringify(FormValues),
      }).then((res) => {
         setUser({ ...user, ...FormValues });
         toggleModal();
      });
   };

   return (
      <div className="profile__modal">
         <div className="profile__container">
            <button
               className="absolute top-1 right-3 text-6xl font-extralight"
               onClick={toggleModal}
            >
               &times;
            </button>
            <div className="mt-16">
               <div className="flex justify-center mb-8">
                  <img className="h-32 w-32 rounded-full" src={img} alt="" />
               </div>

               <Form
                  className="form__2"
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  buttonName="update"
               >
                  <div className="mb-8">
                     <label htmlFor="">name :</label>
                     <FormInput
                        className="form-input"
                        name="name"
                        type="text"
                        placeholder="name"
                        value={user.name}
                     />
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
}

export default Profile;
