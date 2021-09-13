export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const logout = () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("token");
};
