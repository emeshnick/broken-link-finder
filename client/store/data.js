import axios from "axios";

/*
 * Data Reducer, action functions, and thunks for managing app state
 */

const RUN_DATA = "RUN_DATA";

const ranData = (url, brokenLinks, numLinks) => {
  return {
    type: RUN_DATA,
    url,
    brokenLinks,
    numLinks,
  };
};

export const runData = (url) => {
  return async (dispatch) => {
    try {
      //Axios request sends input url and dispatches response
      const res = await axios.post("/api", {
        url,
      });
      dispatch(ranData(url, res.data.brokenLinks, res.data.numLinks));
    } catch (err) {
      throw err;
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case RUN_DATA:
      return {
        brokenLinks: action.brokenLinks,
        numLinks: action.numLinks,
        url: action.url,
      };
    default:
      return state;
  }
}
