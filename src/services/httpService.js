import axios from "axios";
const baseUrl =
  "https://routexhn2mp95-saijeevanballa-che.8a09.starter-us-east-2.openshiftapps.com";

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  put: axios.put,
  baseUrl,
};
