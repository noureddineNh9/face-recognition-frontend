import { useEffect, useState } from "react";
import "./styles/main.scss";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition";
import Register from "./components/Register";
import Signin from "./components/Signin";
import NotFoundImage from "./images/NotFound.png";

const particlesOptions = {
   particles: {
      number: {
         value: 30,
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
   const [route, setRoute] = useState("signin");
   const [user, setUser] = useState({
      id: "",
      name: "default",
      email: "",
      entries: "0",
      joined: "",
   });

   //const BASE_URL = "https://desolate-coast-02851.herokuapp.com";
   const BASE_URL = "http://localhost:3000";

   useEffect(() => {
      resetState();
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

   const loadUser = (data) => {
      setUser({
         id: data.id,
         name: data.name,
         email: data.email,
         entries: data.entries,
         joined: data.joined,
      });
   };

   const onSubmit = () => {
      document.getElementById("face-image-holder").classList.add("hide");

      setImageUrl(inputValue);

      fetch(BASE_URL + "/imageurl", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
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
               headers: { "Content-Type": "application/json" },
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

   return (
      <div className="App">
         <Particles className="particles" params={particlesOptions} />
         <Navigation isSignin={isSignin} changeRoute={changeRoute} />
         <div className="main">
            {route === "home" ? (
               <>
                  <div className=" text-center">
                     <p
                        style={{
                           textJustify: "center",
                        }}
                     >
                        This Magin Brain will detect faces in your pictures. Git
                        it a try.
                     </p>

                     <br />
                     <br />
                     <h2>Welcome {user.name}</h2>
                     <h4>entries : {user.entries}</h4>
                  </div>

                  <div className=" p-4 row justify-content-center">
                     <ImageLinkForm
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                     />
                  </div>

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
      </div>
   );
}

export default App;
