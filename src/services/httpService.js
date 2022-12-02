import axios from "axios";
import { toast } from "react-toastify";
import Raven from "raven-js";
// axios.interceptors.response.use(success, error);
axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }
  //   console.log("interceptors called");
  //   alert("something failed while deleteing a post, called from interceptors ");
  //   Raven.captureException();
  toast.error("An unexpected error occurrred.");
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
