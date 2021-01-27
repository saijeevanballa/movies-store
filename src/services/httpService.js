import axios from "axios";
const baseUrl =
  "https://routelldvf5ez-saijeevanballa-che.8a09.starter-us-east-2.openshiftapps.com";

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  put: axios.put,
  baseUrl,
};
