import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUsetDataFromAuth,
} from "../../../utilities/firebase/firebase.util";

import SignUpForm from '../sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log("respone signin", response);
    const userSnapShot = await createUsetDataFromAuth(response.user);
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
