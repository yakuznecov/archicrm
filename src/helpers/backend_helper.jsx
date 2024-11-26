import { get, post } from './api_helper';
import * as url from './url_helper';

// Login Method
const postJwtLogin = (data) => post(url.POST_JWT_LOGIN, data);
const postRefreshToken = (data) => post(url.POST_REFRESH_TOKEN, data);

// Get current user
const getCurrentUser = () => get(url.GET_CURRENT_USER);

export { postJwtLogin, postRefreshToken, getCurrentUser };
