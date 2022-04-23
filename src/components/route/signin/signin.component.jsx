import { signInWithGooglePopup, createUsetDataFromAuth } from "../../../utilities/firebase/firebase.util";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log("respone signin", response);
    const userSnapShot = await createUsetDataFromAuth(response.user)
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
