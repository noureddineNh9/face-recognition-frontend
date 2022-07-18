import { useContext } from "react";
import { FormContext } from "./Form";

function FormInput(props) {
   const { type = "text", name, className } = props;

   const formContext = useContext(FormContext);
   const { formValues, handleFormChange } = formContext;

   return type === "textarea" ? (
      <textarea
         placeholder={name}
         className={`${className && className}`}
         name={name}
         value={formValues[name]}
         onChange={handleFormChange}
         rows="4"
      />
   ) : (
      <input
         placeholder={name}
         className={`${className && className}`}
         type={type}
         name={name}
         value={formValues[name]}
         onChange={handleFormChange}
      />
   );
}

export default FormInput;
