import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const usersActions = {
  getCountries: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://restcountries.eu/rest/v2/all?fields=name"
        );
        dispatch({ type: "GET_COUNTRIES", payload: response.data });
      } catch (err) {
        console.error(err);
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
  },

  signUp: (data) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://my-tinerary-mian.herokuapp.com/api/user/signup",
          data
        );
        if (response.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Signed up successfully",
            showConfirmButton: true,
            timer: 1000,
          });
          dispatch({ type: "LOGGED_IN", payload: response.data });
        } else {
          response.data.error.forEach((err) => {
            toast.error(err.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
          return response.data.error;
        }
      } catch (err) {
        console.error(err);
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
  },

  logIn: (data) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://my-tinerary-mian.herokuapp.com/api/user/login",
          data
        );
        if (response.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Welcome " + response.data.user.first_name,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch({ type: "LOGGED_IN", payload: response.data });
        } else {
          toast.error(
            response.data.response.includes("Google")
              ? response.data.response
              : "Email and/or password incorrect",
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("We're doing some maintenance, please try later!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    };
  },

  like: (bool, id) => {
    return async (dispatch, getState) => {
      try {
        await axios.put(
          "https://my-tinerary-mian.herokuapp.com/api/user/like/",
          { bool, id },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("tokenMyTinerary")),
            },
          }
        );
        return { success: true };
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Session timed out",
          footer: '<a href="">Why do I have this issue?</a>',
        });

        dispatch({ type: "RESET_USER" });
      }
    };
  },

  comment: (id, action, comment, newComment) => {
    return async (dispatch) => {
      try {
        await axios.put(
          "https://my-tinerary-mian.herokuapp.com/api/user/comment/",
          { comment, id, action, newComment },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("tokenMyTinerary")),
            },
          }
        );
        return { success: true };
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Session timed out",
          footer: '<a href="">Why do I have this issue?</a>',
        });

        dispatch({ type: "RESET_USER" });
      }
    };
  },

  getId: () => {
    return async (dispatch, getState) => {
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/user/id",

          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("tokenMyTinerary")),
            },
          }
        );
        return response.data.id;
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Session timed out",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        dispatch({ type: "RESET_USER" });
      }
    };
  },

  resetUser: () => {
    return (dispatch) => {
      toast.info("Hope to see you soon!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: "RESET_USER" });
    };
  },

  validateToken: () => {
    return async (dispatch, getState) => {
      const token = JSON.parse(localStorage.getItem("tokenMyTinerary"));
      try {
        let response = await axios.get(
          "https://my-tinerary-mian.herokuapp.com/api/user/token",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        response.data.success &&
          dispatch({ type: "LOGGED_IN", payload: { ...response.data, token } });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Session timed out",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        dispatch({ type: "RESET_USER" });
      }
    };
  },
};

export default usersActions;
