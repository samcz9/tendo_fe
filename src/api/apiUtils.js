import axios from 'axios';
import qs from 'qs';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

let axiosConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': '*',
    // 'X-CSRF-Token': 'csrftoken'
  },
};


class ApiUtils {
  callbacks = {};
  baseUrl = "http://localhost:8000/api/v1";
  rawDomain = "http://localhost:8000";

  selectData = (state) => {
    return state;
  }

  buildHeaders = (auth_token) => {
    let config = axiosConfig;

    config.headers['Authorization'] = 'Token ' + auth_token
    return config
  }

  get = async (url, auth_token, callback, id) => {
    let config = await this.buildHeaders(auth_token);
    return axios
      .get(url, config, id)
      .then(res => {
          this.interceptRedirect(res)
          return res.data;
        }).catch(err => {
        if (err.toString().indexOf("Request failed with status code 403") !== -1){
          return ({"status": 403, "errors": err.toString()})
        }
        return Promise.resolve({ err })
      });
  };

  getNoAuth = (url, callback) => {
    return axios
      .get(url)
      .then(res => {
        this.interceptRedirect(res)
        return res.data;
      })
      .catch(err => {
        return Promise.resolve({ err })
      });
  };

  put = (url, data, auth_token) => {
    let config = this.buildHeaders(auth_token);
    return axios
      .put(url, JSON.stringify(data), config)
      .then(res => {
        this.interceptRedirect(res)
        return res.data;
      })
      .catch(err => {
        return Promise.resolve({ err })
      });
  };

  patch = (url, data, auth_token, callback) => {
    let config = this.buildHeaders(auth_token);
    return axios
      .patch(url, qs.stringify(data), config)
      .then(res => {
        this.interceptRedirect(res)
        return res.data;
      })
      .catch(err => {
        return Promise.resolve({ err });
      });
  };

  post = (url, data, auth_token, callback) => {
    let config = this.buildHeaders(auth_token);
    return axios
      .post(url, qs.stringify(data), config)
      .then(res => {
        this.interceptRedirect(res)
        return res.data;
      })
      .catch(err => {
        return Promise.resolve({ err });
      });
  };

  delete = (url, auth_token) => {
    let config = this.buildHeaders(auth_token);
    return axios
      .delete(url, config)
      .then(res => {
        this.interceptRedirect(res)
        return res.data;
      })
      .catch(err => {
        // handleError(err);
      });
  };

  onError = callback => {
    let id = Date.now();
    this.callbacks[id] = callback;
    return id;
  };
}

let apiUtils = new ApiUtils();

export default apiUtils;
