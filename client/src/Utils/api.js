import axios from "axios";
import { BASE_API_PATH } from "../Config/config";

const call = (request) =>
  new Promise((resolve, reject) => {
    request.url = `${BASE_API_PATH}${request.url}`;
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      request.headers = { Authorization: `Bearer ${accessToken}` };
    }

    axios(request)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default call;
