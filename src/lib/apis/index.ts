import Axios from "axios";
import {API_BASE_URL} from "../constants";

// modularizing axios creation, headers and baseURL
export const request = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    pragma: "no-cache",
    Accept: "application/json",
  },
});
