import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";

import storage from "../../utils/storage";

const config = {
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
};

export const login = ({ remember, ...credentials }) => {
  return client.post("/api/login", credentials).then(({ token }) => {
    setAuthorizationHeader(token);
    storage.remove("auth");
    if (remember) {
      storage.set("auth", token);
    }
    return token;
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};

export const userInfo = () => {
  return client.get("/api/profile").then((response) => console.log(response));
};

// const adsUrl = "/api/newadvert";
//const adsUrl = "/api/newadvert";
export const setAd = (newAd) => {
  //const url = adsUrl;
  return client.post("/api/adverts", newAd, config);
};
