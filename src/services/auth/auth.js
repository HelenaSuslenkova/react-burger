const isTokenExpired = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedJwt = parseJwtToken(accessToken);
    return decodedJwt.exp * 1000 < Date.now();
  }
};

const parseJwtToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.log(error);
  }
};

export default function isAutenticated(){
  return localStorage.getItem('accessToken') && !isTokenExpired();
};
