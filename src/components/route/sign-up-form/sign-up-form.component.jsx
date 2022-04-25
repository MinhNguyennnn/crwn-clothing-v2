import {
  createUserAuthWithEmailAndPassword,
  createUsetDataFromAuth,
} from "../../../utilities/firebase/firebase.util";
import "./sign-up-form.styles.scss";

import Button from "../../button/button.component";
import { FormInput } from "../../form-input/form-input.component";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/users.contexts";

const defaultFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [signUpField, setSignUpField] = useState(defaultFormData);
  const { displayName, email, password, confirmPassword } = signUpField;

  //get current user from UserContext by useContext
  const { setCurrentUser } = useContext(UserContext);

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
      await createUsetDataFromAuth(response.user, {
        displayName,
      });
      setCurrentUser(response.user);
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
    <div className="sign-up-container">
      <h2>Don't Have An Account ?</h2>
      <span>Sign Up With Email And Password</span>
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
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
