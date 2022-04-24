import {
  createUserAuthWithEmailAndPassword,
  createUsetDataFromAuth,
} from "../../../utilities/firebase/firebase.util";

import { FormInput } from "../../form-input/form-input.component";
import { useState } from "react";

const defaultFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [signUpField, setSignUpField] = useState(defaultFormData);
  const { displayName, email, password, confirmPassword } = signUpField;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password not match");
      return;
    } else if (password.length < 6) {
      alert("password should be at least 6 character");
      return;
    }
    try {
      const response = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await createUsetDataFromAuth(response.user, { displayName });
      setSignUpField(defaultFormData);
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        alert("email already in used");
      }
      console.log("error creation user and email", err);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpField({ ...signUpField, [name]: value });
  };

  return (
    <div>
      <h2>Sign Up With Email And Passwork</h2>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          required
          onChange={handleFormChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleFormChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          autoComplete="on"
          value={password}
          required
          onChange={handleFormChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          autoComplete="on"
          value={confirmPassword}
          required
          onChange={handleFormChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
