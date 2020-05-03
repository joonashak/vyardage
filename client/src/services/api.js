/**
 * Convenience functions to avoid configuring axios in every service.
 */
import axios from 'axios';
import config from './axiosConfig';


const baseUrl = process.env.REACT_APP_API_URL;
const makeUrl = (path) => `${baseUrl}/${path.replace(/^\/+/, '')}`;

const get = async (path) => axios.get(makeUrl(path), config());

const post = async (path, data) => axios.post(makeUrl(path), data, config());

const put = async (path, data) => axios.put(makeUrl(path), data, config());

export default { get, post, put };
