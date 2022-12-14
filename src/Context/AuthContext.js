import * as React from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { getUser } from "../graphql/queries";
import { setChatRooms } from "../features/chatRooms";
import { API_BASE_URL, EMPRESA_APK } from "../utils/constants";
import { apis } from "../utils/const";
import * as Haptics from 'expo-haptics';
import { useToast } from "native-base";

const AuthContext = React.createContext({
  authState: "default",
  setAuthState: () => { },
  email: "",
  setEmail: () => { },
  password: "",
  setPassword: () => { },
  verificationCode: "",
  setVerificationCode: () => { },
  isLoading: false,
  firstName: "",
  setLastName: () => { },
  lastName: "",
  confirmPassword: "",
  setConfirmPassword: () => { },
  setFirstName: () => { },
  handleSignIn: () => { },
  handleSignUp: () => { },
  handleConfirmSignUp: () => { },
  handleForgotPassword: () => { },
  handleResetPassword: () => { },
  handleResendVerificationCode: () => { },
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState("default");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const dispatch = useDispatch();
  const toast = useToast();


  async function handleSignIn() {
    const body = {
      "empresa": EMPRESA_APK,
      "usuario": email,
      "clave": password
    }

    if (!email || !password) {
      alert("please enter an email and password");
      return;
    }
    try {
      setIsLoading(true);
      await fetch(API_BASE_URL + apis.TSP_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.length > 0) {
            toast.show({
              description: "Bienvenido",
            })
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            )
            const obj = {
              ID: data[0].ID,
              APELLIDOS_Y_NOMBRES: data[0].APELLIDOS_Y_NOMBRES,
              USUARIO: data[0].USUARIO,
              ID_TIENDA: data[0].ID_TIENDA,
              NOM_TIENDA: data[0].NOM_TIENDA,
              TIPO_USUARIO: data[0].TIPO_USUARIO,
              ID_EMISOR: data[0].ID_EMISOR,
              ID_MONEDA: data[0].ID_MONEDA,
              PASSWORD: body.clave,
              EMPRESA: body.empresa,
            };
            dispatch(
              setUser(obj)
            )
            setAuthState("signedIn");
          } else {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            )
            toast.show({
              description: "Contrase??a ?? Password Incorrecta",
            })
            return;
          }
        })
      // .catch((e) => {
      //   setIsLoading(false);
      //   console.log("Catch error: ", e.message);
      // });

      // const user = await Auth.signIn({
      //   username: email,
      //   password,
      // });
      // const userFromDB = await API.graphql(
      //   graphqlOperation(getUser, { id: user.attributes.sub })
      // );
      // dispatch(
      //   setUser({
      //     id: userFromDB.data.getUser.id,
      //     firstName: userFromDB.data.getUser.firstName,
      //     lastName: userFromDB.data.getUser.lastName,
      //     profilePicture: userFromDB.data.getUser.profilePicture,
      //     email: userFromDB.data.getUser.email.toLowerCase(),
      //     status: userFromDB.data.getUser.status,
      //     notificationToken: userFromDB.data.getUser.notificationToken,
      //     latitude: userFromDB.data.getUser.latitude,
      //     longitude: userFromDB.data.getUser.longitude,
      //   })
      // );
      // if (userFromDB.data.getUser.chatRooms.items !== null) {
      //   dispatch(setChatRooms(userFromDB.data.getUser.chatRooms.items));
      // }
      setIsLoading(false);
      console.log("by context user signed In");
      // setAuthState("signedIn");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
      console.log(e);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      });
      setAuthState("confirmSignUp");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleConfirmSignUp() {
    if (!verificationCode) {
      alert("Please enter verification code");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.confirmSignUp(email, verificationCode);
      const user = await Auth.signIn({
        username: email,
        password,
      });
      await saveUserToDatabase(user);
      alert("Welcome, account created succesfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.forgotPassword(email);
      setAuthState("confirmForgotPassword");
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!verificationCode || verificationCode.length !== 6) {
      alert("Please enter a valid verification code");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(email, verificationCode, password);
      alert("Password reset successfully, Now you can Sign In");
      setAuthState("signIn");
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResendVerificationCode() {
    try {
      await Auth.resendSignUp(email);
      alert(`Successfully resent confirmation code to ${email}`);
    } catch (e) {
      alert(e);
    }
  }

  async function saveUserToDatabase(user) {
    const { attributes } = user;
    const userToSave = {
      id: attributes.sub,
      firstName: attributes.given_name,
      lastName: attributes.family_name,
      profilePicture: null,
      email: attributes.email.toLowerCase(),
      status: null,
      notificationToken: null,
      latitude: null,
      longitude: null,
    };
    try {
      const userFromDB = await API.graphql(
        graphqlOperation(createUser, {
          input: userToSave,
        })
      );
      dispatch(setUser(userToSave));
      console.log("user saved to DB and Redux", userFromDB);
    } catch (e) {
      console.log("error saving user", e);
    }
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState,
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        handleSignUp,
        handleConfirmSignUp,
        verificationCode,
        setVerificationCode,
        isLoading,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        confirmPassword,
        setConfirmPassword,
        handleForgotPassword,
        handleResendVerificationCode,
        handleResetPassword,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
