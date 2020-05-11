import Axios from "axios"
import environment from "../environment";

const baseURL = environment.baseURL;

class Api {

    constructor() {
        this.api = Axios.create({
            baseURL: `${baseURL}`,
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        })
    }

    get(url) {
        return this.api.get(url)
    }

    public_post(url, payload) {
        return Axios.post(`${baseURL}${url}`, payload)
    }

    setToken(AUTH_TOKEN){
        this.api.defaults.headers.Authorization = "Bearer " + AUTH_TOKEN;
    }
}

export default new Api

