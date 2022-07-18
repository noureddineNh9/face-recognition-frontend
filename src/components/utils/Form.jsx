import React, { useState } from "react";

export const FormContext = React.createContext({
   formValues: {},
});
function Form(props) {
   const {
      children,
      onSubmit,
      initialValues,
      className,
      buttonName = "submit",
   } = props;
   const [formValues, setFormValues] = useState(initialValues);

   const handleFormChange = (event) => {
      // Get the name of the field that caused this change event
      // Get the new value of this field
      const { name, value } = event.target;

      // Update state
      // Assign new value to the appropriate form field
      setFormValues({
         ...formValues,
         [name]: value,
      });
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formValues);
   };

   return (
      <form onSubmit={handleSubmit} className={`${className && className}`}>
         <FormContext.Provider
            value={{
               formValues,
               handleFormChange,
            }}
         >
            {children}
         </FormContext.Provider>
         <input type="submit" value={buttonName} />
      </form>
   );
}
export default Form;
