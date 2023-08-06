import Cookies from 'js-cookie';

const setCookie = (name, value, options={}) => {
    Cookies.set(name, value, options);
};

export default setCookie;