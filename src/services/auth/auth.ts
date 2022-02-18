const isTokenExpired = () : boolean => {
  const accessToken = localStorage.getItem("accessToken");
  let isExpired = true;

  if (accessToken) {
    const decodedJwtExp = parseJwtToken(accessToken);
    isExpired =  decodedJwtExp! * 1000 < Date.now();
  }

  return isExpired;
};

const parseJwtToken = (token: string) : number | undefined => {
  try {
    return JSON.parse(atob(token.split(".")[1])).exp;
  } catch (error) {
    console.log(error);
  }
};

export const isAutenticated = (): boolean => {
  return Boolean(localStorage.getItem('accessToken')) && !isTokenExpired();
};

export const getTokenHashString = (accessToken: string | null): string => {
  const accessTokenFromStorage  = localStorage.getItem("accessToken");
  const cuttedStr = 'Bearer ';
  let cuttedToken = ''

  if (accessToken && accessTokenFromStorage && accessToken === accessTokenFromStorage && accessToken!.includes(cuttedStr)) {
    cuttedToken = accessToken!.slice(cuttedStr.length);
  }

  return cuttedToken;
}
