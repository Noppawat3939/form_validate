import React, { useEffect, useState } from "react";
import { regex } from "../utils/reg";

const App = () => {
  const initalState = {
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initalState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setFormValues(initalState);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("login success");
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "* Username is required";
    }

    if (!values.email) {
      errors.email = "* Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Your email is not valid!";
    }

    if (!values.password) {
      errors.password = "* Password is required";
    } else if (!regex.test(values.password) && values.password.length < 6) {
      errors.password =
        "Your password must be at least 6 characters and includes A-Z , a-z and '!@#$%^&*()_+' ";
    } else if (!regex.test(values.password) && values.password.length > 10) {
      errors.password = `Your password can not more than 10 characters (you password have ${values.password.length} characters )`;
    }

    return errors;
  };

  return (
    <div className="appContainer">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h1 className="title">login success</h1>
      ) : (
        <h1 className="title">login</h1>
      )}
      <form>
        <div>
          <label htmlFor="username">username:</label>
          <input
            placeholder="Enter your username"
            onChange={handleOnChange}
            name="username"
            value={formValues.username}
          />
        </div>
        <p className="errorText">{formErrors.username}</p>
        <div>
          <label htmlFor="email">email:</label>
          <input
            placeholder="Enter your email"
            onChange={handleOnChange}
            name="email"
            value={formValues.email}
          />
        </div>
        <p className="errorText">{formErrors.email}</p>
        <div>
          <label htmlFor="password">password:</label>
          <input
            placeholder="Enter your password"
            onChange={handleOnChange}
            name="password"
            value={formValues.password}
          />
        </div>
        <p className="errorText">{formErrors.password}</p>
        <button type="submit" onClick={handleSubmit}>
          login
        </button>
      </form>
    </div>
  );
};

export default App;
