import Cookies from 'js-cookie';

const getCookie = (name) => {
  const val =  Cookies.get(name);
  return val
};

export default getCookie;
