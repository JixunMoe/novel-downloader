import unirest from "unirest";
import _ from "lodash";
import Response from "./Response";

function setHeaderKey(object, key, value) {
  if ("string" === typeof value) {
    object[String(key).toLowerCase()] = value;
  }
}

const defaultHeaders = {
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36",
};

/**
 * Turn an request to async.
 *
 * @param request {Object}
 * @returns {Promise<Object>}
 */
async function asyncRequestWrap(request) {
  return new Promise(function (resolve, reject) {
    request.end(function (resp) {
      if (!resp) {
        return reject(new TypeError("response is empty."));
      }

      if (resp.error) {
        return reject(error);
      }

      resolve(new Response(resp));
    });
  });
}

/**
 * Request Base class.
 *
 * This class should be inherited and singleton for each plugin,
 * because they may require special header(e.g. user-agent).
 */
class Request {
  /**
   * Setup an request
   * @param url {String} url to request.
   * @param [headers] {Object} Default header.
   */
  constructor(url, headers = {}) {
    this.url = url;
    this.headers = {};

    this.headers = _.extend({}, defaultHeaders);
    _.forIn(headers, (value, key) => {
      this.SetHeader(key, value);
    });

    this.get = this.Get;
    this.post = this.Post;
    this.head = this.Head;
  }

  /**
   * Make a request.
   * @param method {"get"|"post"|"head"|"put"|"patch"|"delete"} Request Method.
   * @param url {String} target url.
   * @param [headers] {Object} Extra header.
   * @returns {Promise<Response>}
   */
  async request(method, url, headers = {}) {
    let finalHeaders = _.extend({}, this.headers);
    _.forIn(headers, (value, key) => {
      setHeaderKey(finalHeaders, key, value);
    });

    const request = unirest(method, url, finalHeaders);
    return await asyncRequestWrap(this.processRequest(request));
  }

  /**
   * Make a GET request.
   * @param url {String} target url.
   * @param headers {Object} Extra header.
   * @returns {Promise<Response>} Response object.
   * @constructor
   */
  async Get(url, headers = {}) {
    return await this.request("get", url, headers);
  }

  /**
   * Make a POST request.
   * @param url {String} target url.
   * @param headers {Object} Extra header.
   * @returns {Promise<Response>} Response object.
   * @constructor
   */
  async Post(url, headers = {}) {
    return await this.request("post", url, headers);
  }

  /**
   * Make a HEAD request.
   * @param url {String} target url.
   * @param headers {Object} Extra header.
   * @returns {Promise<Response>} Response object.
   * @constructor
   */
  async Head(url, headers = {}) {
    return await this.request("head", url, headers);
  }

  /**
   * Set a http header.
   * @param key {String} header name
   * @param value {String} header value
   * @constructor
   */
  SetHeader(key, value) {
    setHeaderKey(this.headers, key, value);
  }

  /**
   * Get one of the header set for request.
   * @param key {String} header name
   * @param [defaultValue] {String} default value if not found.
   * @returns {String} Header value.
   * @constructor
   */
  GetHeader(key, defaultValue = "") {
    const lowKey = String(key).toLowerCase();
    if (this.headers.hasOwnProperty(lowKey)) {
      const value = this.headers[lowKey];
      if (_.isString(value)) {
        return value;
      }
    }

    return defaultValue;
  }
}

export default Request;
