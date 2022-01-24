import axios from "axios";

/*
 * Data Reducer, action functions, and thunks for managing app state
 */

const RUN_DATA = "RUN_DATA";

const ranData = (url, data) => {
  return {
    type: RUN_DATA,
    url,
    data,
  };
};

export const runData = (url) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api", {
        url,
      });
      dispatch(ranData(url, res.data));
    } catch (err) {
      throw err;
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case RUN_DATA:
      return action.data;
    default:
      return state;
  }
}
