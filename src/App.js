import { useEffect, useState } from "react";
import { BASE_URL } from "./api/api";

import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NotFoundImage from "./images/NotFound.png";
import Modal from "./components/layouts/modal/modal.component.jsx";
import Profile from "./components/profile/profile.component";

const particlesOptions = {
   particles: {
      number: {
         value: 20,
         density: {
            enable: true,
            value_area: 800,
         },
      },
      line_linked: {
         enable: true,
         distance: 150,
         color: "#000000",
         opacity: 0.5,
      },
   },
};

function App() {
   const [inputValue, setInputValue] = useState("");
   const [imageUrl, setImageUrl] = useState(NotFoundImage);
   const [boundingBox, setBoundingBox] = useState("");
   const [isSignin, setIsSignin] = useState(false);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [route, setRoute] = useState("signin");

   const [isLoading, setIsLoading] = useState(true);

   const [user, setUser] = useState({
      id: "",
      name: "default",
      email: "",
      entries: "0",
      joined: "",
   });

   useEffect(async () => {
      await checkIfSignIn();
      resetState();

      setIsLoading(false);
   }, []);

   function resetState() {
      setInputValue("");
      setImageUrl(NotFoundImage);
      setBoundingBox("");
   }

   const onInputChange = (event) => {
      console.log(event.target.value);
      setInputValue(event.target.value);
   };

   const checkIfSignIn = async () => {
      const token = window.sessionStorage.getItem("token");
      if (token) {
         const res = await fetch(BASE_URL + "/signin", {
            method: "POST",
            headers: {
               "Content-type": "application/json",
               authorization: token,
            },
         });
         const data = await res.json();
         console.log(data);
         if (data && data.id) {
            await loadUser(data.id, token);
            changeRoute("home");
            console.log("success we need to get user profile");
         }
      }
   };

   const loadUser = async (id, token) => {
      const res = await fetch(BASE_URL + "/profile/" + id, {
         method: "GET",
         headers: {
            "Content-type": "application/json",
            authorization: token,
         },
      });
      const user = await res.json();
      setUser({
         id: user.id,
         name: user.name,
         email: user.email,
         entries: user.entries,
         joined: user.joined,
      });
   };

   const onSubmit = () => {
      document.getElementById("face-image-holder").classList.add("hide");

      setImageUrl(inputValue);

      fetch(BASE_URL + "/imageurl", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
         },
         body: JSON.stringify({
            input: inputValue,
         }),
      })
         .then((res) => res.json())
         .then((result) => {
            console.log(
               result.outputs[0].data.regions[0].region_info.bounding_box
            );
            setBoundingBox(
               result.outputs[0].data.regions[0].region_info.bounding_box
            );
            document.getElementById("box").classList.remove("hide");
            document
               .getElementById("face-image-holder")
               .classList.remove("hide");

            fetch(BASE_URL + "/image", {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  authorization: window.sessionStorage.getItem("token"),
               },
               body: JSON.stringify({
                  id: user.id,
               }),
            })
               .then((response) => response.json())
               .then((result) => {
                  setUser({
                     ...user,
                     entries: result,
                  });
                  console.log(result);
               })
               .catch((err) => {
                  console.log(err);
               });
         })
         .catch((err) => {
            document.getElementById("image").setAttribute("src", NotFoundImage);
            document.getElementById("box").classList.add("hide");
            document
               .getElementById("face-image-holder")
               .classList.remove("hide");
         });
   };

   const changeRoute = (route) => {
      if (route === "home") {
         setIsSignin(true);
         resetState();
      } else {
         setIsSignin(false);
      }

      console.log(route);
      setRoute(route);
   };

   const toggleModal = () => {
      setIsProfileOpen(!isProfileOpen);
      document.querySelector("body").classList.toggle("modal__active");
   };

   return (
      <div className="App">
         {isLoading ? (
            <div className="h-screen flex justify-center items-center">
               <h1>loading ...</h1>
            </div>
         ) : (
            <>
               {/* <Particles className="particles" params={particlesOptions} /> */}
               <Navigation
                  toggleModal={toggleModal}
                  isSignin={isSignin}
                  changeRoute={changeRoute}
               />
               {isProfileOpen && (
                  <Modal>
                     <Profile
                        setUser={setUser}
                        user={user}
                        toggleModal={toggleModal}
                     />
                  </Modal>
               )}
               <div className="main">
                  {route === "home" ? (
                     <>
                        <div className=" text-center">
                           <p>
                              This Magin Brain will detect faces in your
                              pictures. Git it a try.
                           </p>
                           <br />
                           <h2>Welcome {user.name}</h2>
                           <h4>entries : {user.entries}</h4>
                           <br />
                        </div>

                        <div className="flex justify-center ">
                           <ImageLinkForm
                              onInputChange={onInputChange}
                              onSubmit={onSubmit}
                           />
                        </div>
                        <br />

                        <FaceRecognition
                           imageUrl={imageUrl}
                           boundingBox={boundingBox}
                        />
                     </>
                  ) : route === "signin" ? (
                     <Signin loadUser={loadUser} changeRoute={changeRoute} />
                  ) : (
                     <Register loadUser={loadUser} changeRoute={changeRoute} />
                  )}
               </div>
            </>
         )}
      </div>
   );
}

export default App;
