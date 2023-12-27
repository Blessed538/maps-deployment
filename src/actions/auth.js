import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
import Errors from "../components/FormItems/error/errors";
import { mockUser } from "./mock";
import { Jwt } from "jsonwebtoken";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const PASSWORD_RESET_EMAIL_REQUEST = "PASSWORD_RESET_EMAIL_REQUEST";
export const PASSWORD_RESET_EMAIL_SUCCESS = "PASSWORD_RESET_EMAIL_SUCCESS";
export const AUTH_INIT_SUCCESS = "AUTH_INIT_SUCCESS";
export const AUTH_INIT_ERROR = "AUTH_INIT_ERROR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
//
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST ";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UDPATE_USER_ERROR = "UDPATE_USER_ERROR";

async function findMe() {
  if (config.isBackend) {
    const response = await axios.get("/auth/me");
    return response.data;
  } else {
    return mockUser;
  }
}

export function authError(payload) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

// export function doInit() {
//   return async (dispatch) => {
//     let currentUser = null;
//     if (!config.isBackend) {
//       currentUser = mockUser;
//       // dispatch({
//       //   type: AUTH_INIT_SUCCESS,
//       //   payload: {
//       //     currentUser,
//       //   },
//       // });
//     } else {
//       try {
//         let token = localStorage.getItem("token");
//         if (token) {
//           currentUser = await findMe();
//         }
//         // dispatch({
//         //   type: AUTH_INIT_SUCCESS,
//         //   payload: {
//         //     currentUser,
//         //   },
//         // });
//       } catch (error) {
//         Errors.handle(error);

//         dispatch({
//           type: AUTH_INIT_ERROR,
//           payload: error,
//         });
//       }
//     }
//   };
// }

// export function doInit() {
//   return async (dispatch) => {
//     let currentUser = null;
//     if (!config.isBackend) {
//       currentUser = mockUser;
//       dispatch({
//         type: AUTH_INIT_SUCCESS,
//         payload: {
//           currentUser,
//         },
//       });
//     } else {
//       try {
//         let token = localStorage.getItem("token");
//         if (token) {
//           currentUser = await findMe();
//         }
//         dispatch({
//           type: AUTH_INIT_SUCCESS,
//           payload: {
//             currentUser,
//           },
//         });
//       } catch (error) {
//         Errors.handle(error);

//         dispatch({
//           type: AUTH_INIT_ERROR,
//           payload: error,
//         });
//       }
//     }
//   };
// }

export function doInit() {
  return async (dispatch) => {
    let currentUser = null;

    try {
      let token = localStorage.getItem("token");

      if (token) {
        // Decode the token to get expiration time
        const decodedToken = Jwt.decode(token);
        console.log(decodedToken, "decodedToken");

        // Check if the token is expired
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          // Token has expired, log the user out
          dispatch(logoutUser());
          return;
        }

        // Token is still valid, fetch user details
        // currentUser = await findMe();
      }

      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          // currentUser,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: AUTH_INIT_ERROR,
        payload: error,
      });
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(push("/login"));
  };
}

export function receiveToken(token, userObj) {
  return (dispatch) => {
    // let user = jwt.decode(token);
    localStorage.setItem("token", token);
    console.log({ userObj });
    localStorage.setItem("user", JSON.stringify(userObj));

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch(push("/app"));
  };
}

export function updateUserProfile(creds) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    axios
      .post("/auth/signin", creds)
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: AUTH_INIT_SUCCESS,
            payload: {
              currentUser: res.data.data.user,
            },
          });
          dispatch(push("/app"));
        } else if (!res.data.status) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        dispatch(authError(err.response.data));
        toast.error(err.response.data);
      });
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    if (creds.email.length > 0 && creds.password.length > 0) {
      axios
        .post("/auth/signin", creds)
        .then((res) => {
          if (res.data.status) {
            const token = res.data.data.tokens.accessToken;
            const userObj = res.data.data.user;
            dispatch(receiveToken(token, userObj));
            dispatch(doInit());
            dispatch({
              type: AUTH_INIT_SUCCESS,
              payload: {
                currentUser: res.data.data.user,
              },
            });
            dispatch(push("/app"));
          } else if (!res.data.status) {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
          toast.error(err.response.data);
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}

// export function loginUser(creds) {
//   return (dispatch) => {
//     if (!config.isBackend) {
//       dispatch(receiveToken("token"));
//       dispatch(doInit());
//       dispatch(push("/app"));
//     } else {
//       dispatch({
//         type: LOGIN_REQUEST,
//       });
//       if (creds.social) {
//         window.location.href =
//           config.baseURLApi +
//           "/auth/signin/" +
//           creds.social +
//           "?app=" +
//           config.redirectUrl;
//       } else if (creds.email.length > 0 && creds.password.length > 0) {
//         axios
//           .post("/auth/signin/local", creds)
//           .then((res) => {
//             const token = res.data;
//             dispatch(receiveToken(token));
//             dispatch(doInit());
//             dispatch(push("/app"));
//           })
//           .catch((err) => {
//             dispatch(authError(err.response.data));
//           });
//       } else {
//         dispatch(authError("Something was wrong. Try again"));
//       }
//     }
//   };
// }

export function verifyEmail(token) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push("/login"));
    } else {
      axios
        .put("/auth/verify-email", { token })
        .then((verified) => {
          if (verified) {
            toast.success("Your email was verified");
          }
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          dispatch(push("/login"));
        });
    }
  };
}

export function resetPassword(token, password) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push("/login"));
    } else {
      dispatch({
        type: RESET_REQUEST,
      });
      axios
        .put("/auth/password-reset", { token, password })
        .then((res) => {
          dispatch({
            type: RESET_SUCCESS,
          });
          toast.success("Password has been updated");
          dispatch(push("/login"));
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
        });
    }
  };
}

export function sendPasswordResetEmail(email) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push("/login"));
    } else {
      dispatch({
        type: PASSWORD_RESET_EMAIL_REQUEST,
      });
      axios
        .post("/auth/send-password-reset-email", { email })
        .then((res) => {
          dispatch({
            type: PASSWORD_RESET_EMAIL_SUCCESS,
          });
          toast.success("Email with resetting instructions has been sent");
          dispatch(push("/login"));
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
        });
    }
  };
}

export function registerUser(creds) {
  return (dispatch) => {
    if (creds.email.length > 0 && creds.password.length > 0) {
      axios
        .post("/auth/signup", creds)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          toast.success(
            "You've been registered successfully. Please check your email for verification link"
          );
          dispatch(push("/login"));
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}
// export function registerUser(creds) {
//   return (dispatch) => {
//     if (!config.isBackend) {
//       dispatch(push('/login'));
//     } else {
//       dispatch({
//         type: REGISTER_REQUEST,
//       });

//       if (creds.email.length > 0 && creds.password.length > 0) {
//         axios.post("/auth/signup", creds).then(res => {
//           dispatch({
//             type: REGISTER_SUCCESS
//           });
//           toast.success("You've been registered successfully. Please check your email for verification link");
//           dispatch(push('/login'));
//         }).catch(err => {
//           dispatch(authError(err.response.data));
//         })

//       } else {
//         dispatch(authError('Something was wrong. Try again'));
//       }
//     }
//   };
// }
