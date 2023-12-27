import Errors from "components/FormItems/error/errors";
import axios from "axios";
// import config from "../config";
// import { mockUser } from "../actions/mock";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
async function list() {
  const response = await axios.get(`/user/get-users`);
  return response.data;
}

const actions = {
  // doFetch: (filter, keepPagination = false) => async (dispatch) => {
  //   if (!config.isBackend) {
  //     dispatch({
  //       type: 'USERS_LIST_FETCH_SUCCESS',
  //       payload: {
  //         rows: [mockUser],
  //         count: 1,
  //       },
  //     });
  //   } else {
  //     try {
  //       dispatch({
  //         type: 'USERS_LIST_FETCH_STARTED',
  //         payload: { filter, keepPagination },
  //       });

  //       const response = await list();

  //       dispatch({
  //         type: 'USERS_LIST_FETCH_SUCCESS',
  //         payload: {
  //           rows: response.rows,
  //           count: response.count,
  //         },
  //       });
  //     } catch (error) {
  //       Errors.handle(error);

  //       dispatch({
  //         type: 'USERS_LIST_FETCH_ERROR',
  //       });
  //     }
  //   }
  // },

  doFetch:
    (filter, keepPagination = false) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "USERS_LIST_FETCH_STARTED",
          payload: { filter, keepPagination },
        });

        const response = await list();

        if (response.status) {
          dispatch({
            type: "USERS_LIST_FETCH_SUCCESS",
            payload: {
              rows: response.data,
            },
          });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        // Errors.handle(error);
        toast.error(error.response.data.message);

        dispatch({
          type: "USERS_LIST_FETCH_ERROR",
        });
      }
    },

  findOne: (id) => async (dispatch) => {
    try {
      dispatch({
        type: "USERS_LIST_DELETE_STARTED",
      });

      const response = await axios.get(`/user/${id}`);
      dispatch({
        type: "USER_LIST_FETCH_SUCCESS",
        payload: {
          row: response.data,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "USERS_LIST_DELETE_ERROR",
      });
    }
  },

  editOne: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: "USERS_LIST_UPDATE_STARTED",
      });

      const response = await axios.patch(`/user/${id}`, values);
      if (response.data.status) {
        dispatch({
          type: "USERS_LIST_UPDATE_SUCCESS",
          payload: {
            row: response.data,
          },
        });
        toast.success(response.data.message);
        dispatch(push("/admin/users"));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "USERS_LIST_UPDATE_ERROR",
      });
    }
  },

  updateUser: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: "USERS_LIST_UPDATE_STARTED",
      });

      const response = await axios.patch(`/user/update-profile/${id}`, values);
      if (response.data.status) {
        console.log({ response });
        dispatch({
          type: "AUTH_INIT_SUCCESS",
          payload: {
            currentUser: response.data.data,
          },
        });
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success(response.data.message);
        dispatch(push("/app/profile"));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "USERS_LIST_UPDATE_ERROR",
      });
    }
  },

  doDelete: (id) => async (dispatch) => {
    try {
      dispatch({
        type: "USERS_LIST_DELETE_STARTED",
      });

      const deleteRes = await axios.delete(`/user/${id}`);
      console.log({ deleteRes });
      dispatch({
        type: "USERS_LIST_DELETE_SUCCESS",
      });

      const response = await list();

      dispatch({
        type: "USERS_LIST_FETCH_SUCCESS",
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
      toast.success(deleteRes.data.message);
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: "USERS_LIST_DELETE_ERROR",
      });
    }
  },
  // doDelete: (id) => async (dispatch) => {
  //   if (!config.isBackend) {
  //     dispatch({
  //       type: "USERS_LIST_DELETE_ERROR",
  //     });
  //   } else {
  //     try {
  //       dispatch({
  //         type: "USERS_LIST_DELETE_STARTED",
  //       });

  //       await axios.delete(`/users/${id}`);

  //       dispatch({
  //         type: "USERS_LIST_DELETE_SUCCESS",
  //       });

  //       const response = await list();
  //       dispatch({
  //         type: "USERS_LIST_FETCH_SUCCESS",
  //         payload: {
  //           rows: response.rows,
  //           count: response.count,
  //         },
  //       });
  //     } catch (error) {
  //       Errors.handle(error);

  //       dispatch({
  //         type: "USERS_LIST_DELETE_ERROR",
  //       });
  //     }
  //   }
  // },
  doOpenConfirm: (id) => async (dispatch) => {
    dispatch({
      type: "USERS_LIST_OPEN_CONFIRM",
      payload: {
        id: id,
      },
    });
  },
  doCloseConfirm: () => async (dispatch) => {
    dispatch({
      type: "USERS_LIST_CLOSE_CONFIRM",
    });
  },
};

export default actions;
