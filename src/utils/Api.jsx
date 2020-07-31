import axios from 'axios';

const API_BASE_URL = (window.location.hostname === 'localhost' ? process.env.REACT_APP_API_URL : window.location.origin)
const API_TOKEN    = process.env.REACT_APP_API_TOKEN
const API_SECRET   = process.env.REACT_APP_API_SECRET

const HEADERS      = {
    Token: API_TOKEN,
    Secret: API_SECRET,
    'SESSION-GI-ACTIVE': 1,
    Accept: 'application/json',
};

const getHeaders = (isFormData = false) => {
    const headers = HEADERS;
    if (!isFormData)
        headers['Content-Type'] = 'application/json';
    return headers;
}

/**
 * @name transformGetParams
 * Transforms an object param into a key/value string
 *
 * @param {object} params
 *
 * @return {String}
 */
const transformGetParams = (params) => {
    
    let paramsString = '?';

    Object
        .keys(params)
        .map((param, index) => {
            paramsString += (index > 0) ? '&' : '';
            paramsString += `${param}=${params[param]}`;

            return param;
        });

    return paramsString;
}

/**
 * @name Api
 * Sends a request with the required headers to API
 *
 * @param {string} method           HTTP Method (GET, POST, PUT, PATCH, etc)
 * @param {string} url              endPoint attribute (required)
 * @param {object} params           Request params
 * @param {boolean} isFormData      Flag for body Form Data
 *
 * @return {string|object}          Returns the body of the request, trying to parse it as JSON first. If an error ocurrs during parsing, the raw body is returned as a string.
 */
const Api = async(method, url, params, isFormData = false) => {
    
    const headers = getHeaders(isFormData);
    
    const CONFIG  = {
        method,
        headers,
        withCredentials: true,
    };

    let URL = `${API_BASE_URL}/${url}`;

    if (params) {
        if (typeof params === 'object') {
            switch (method) {
                case 'GET':
                case 'DELETE':
                    URL += transformGetParams(params);
                    break;

                case 'POST':
                case 'PUT':
                default:
                    CONFIG.body = JSON.stringify(params);
                    if (isFormData) {
                        const formData = new FormData();
                        Object.keys(params).forEach((key) => {
                            formData.append(key, typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]);
                        });
                        CONFIG.data = formData;
                    } else {
                        CONFIG.data = JSON.stringify(params);
                    }
                    break;
            }
        }
    }

    CONFIG.url = URL;
    return await axios(CONFIG)
        .then(response => response.data)
        .catch((error) => {
            throw error;
        });
}

//Auth Routes
export const getLogin = async(email, password) => {
    return await Api(
        'POST',
        'users/login',
        {email, password},
        true
    )
}

export const getRegister = async(email, firstName, lastName) => {
    return await Api(
        'POST',
        'users/signup',
        {email, firstName, lastName},
        false
    )
}

export const getLogout = async(email, password) => {
    return await Api(
        'POST',
        'users/logout',
        false,
        false
    )
}

export const getSession = () => {
    return Api(
        'GET',
        'users/session',
        false,
        false
    )
}
