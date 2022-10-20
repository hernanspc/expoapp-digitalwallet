import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ID: null,
  APELLIDOS_Y_NOMBRES: null,
  USUARIO: null,
  ID_TIENDA: null,
  NOM_TIENDA: null,
  TIPO_USUARIO: null,
  ID_EMISOR: null,
  ID_MONEDA: null,
  PASSWORD: null,
  EMPRESA: null,
};
// const initialState = {
//   id: null,
//   firstName: null,
//   lastName: null,
//   profilePicture: null,
//   email: null,
//   status: null,
//   notificationToken: null,
//   latitude: null,
//   longitude: null,
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.ID = action.payload.ID;
      state.APELLIDOS_Y_NOMBRES = action.payload.APELLIDOS_Y_NOMBRES;
      state.USUARIO = action.payload.USUARIO;
      state.ID_TIENDA = action.payload.ID_TIENDA;
      state.NOM_TIENDA = action.payload.NOM_TIENDA;
      state.TIPO_USUARIO = action.payload.TIPO_USUARIO;
      state.ID_EMISOR = action.payload.ID_EMISOR;
      state.ID_MONEDA = action.payload.ID_MONEDA;
      state.PASSWORD = action.payload.PASSWORD;
      state.EMPRESA = action.payload.EMPRESA;
    },
    resetUser: (state) => {
      return (state = {
        ID: null,
        APELLIDOS_Y_NOMBRES: null,
        USUARIO: null,
        ID_TIENDA: null,
        NOM_TIENDA: null,
        TIPO_USUARIO: null,
        ID_EMISOR: null,
        ID_MONEDA: null,
        PASSWORD: null,
        EMPRESA: null,
      });
    },
    // resetProfilePicture: (state, action) => {
    //   return {
    //     ...state,
    //     profilePicture: action.payload,
    //   };
    // },
    // resetFirstName: (state, action) => {
    //   return {
    //     ...state,
    //     firstName: action.payload,
    //   };
    // },
    // resetlastName: (state, action) => {
    //   return {
    //     ...state,
    //     lastName: action.payload,
    //   };
    // },
    // resetStatus: (state, action) => {
    //   return {
    //     ...state,
    //     status: action.payload,
    //   };
    // },
    // resetNotificationToken: (state, action) => {
    //   return {
    //     ...state,
    //     notificationToken: action.payload,
    //   };
    // },
    // resetLocation: (state, action) => {
    //   const { latitude, longitude } = action.payload;
    //   return {
    //     ...state,
    //     latitude: latitude,
    //     longitude: longitude,
    //   };
    // },
  },
});

export const {
  setUser,
  resetUser,
  // resetProfilePicture,
  // resetFirstName,
  // resetStatus,
  // resetlastName,
  // resetLocation,
  // resetNotificationToken,
} = userSlice.actions;
export default userSlice.reducer;
