import {
  signInWithGooglePopup,
  createUsetDataFromAuth,
  signInUserAuthWithEmailAndPassword,
} from "../../../utilities/firebase/firebase.util";
import "./sign-in-form.styles.scss";

import Button from "../../button/button.component";
import { FormInput } from "../../form-input/form-input.component";
import { useState} from "react";

const defaultFormData = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInField, setSignInField] = useState(defaultFormData);
  const { email, password } = signInField;

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInUserAuthWithEmailAndPassword(
        email,
        password
      );
      setSignInField(defaultFormData);
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect passowrd for email");
          break;
        case "auth/user-not-found":
          alert("incorrect email");
          break;
        default:
          console.log("error sign in ", err);
      }
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSignInField({ ...signInField, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already Have An Account ?</h2>
      <span>Sign In With Email And Password</span>
      <form onSubmit={handleFormSubmit}>
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
        <div className="sign-in-button-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonTypes="google" onClick={SignInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
