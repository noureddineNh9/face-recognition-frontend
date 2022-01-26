import React from "react";

function FaceRecognition(props) {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
         }}
      >
         <div
            id="face-image-holder"
            style={{
               position: "relative",
            }}
         >
            <img
               id="image"
               src={props.imageUrl}
               alt=""
               style={{ width: "500px", height: "100%" }}
            />
            <div
               id="box"
               className=" hide"
               style={{
                  border: "2px solid blue",
                  position: "absolute",
                  top: ` ${props.boundingBox.top_row * 100}%`,
                  left: ` ${props.boundingBox.left_col * 100}%`,
                  right: ` ${(1 - props.boundingBox.right_col) * 100}%`,
                  bottom: ` ${(1 - props.boundingBox.bottom_row) * 100}%`,
                  paddingTop: "30px",
               }}
            ></div>
         </div>
      </div>
   );
}

export default FaceRecognition;
