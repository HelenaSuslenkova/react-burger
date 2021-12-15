const isTokenExpired = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedJwtExp = parseJwtToken(accessToken);
    return decodedJwtExp! * 1000 < Date.now();
  }
};

const parseJwtToken = (token: string) : number | undefined => {
  try {
    return JSON.parse(atob(token.split(".")[1])).exp;
  } catch (error) {
    console.log(error);
  }
};

export const isAutenticated = () => {
  return localStorage.getItem('accessToken') && !isTokenExpired();
};
