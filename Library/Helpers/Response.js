class Response {
  /**
   * Setup the class
   * @param response {Object} The response object created by unirest.
   */
  constructor(response) {
    this.r = response;
  }

  /**
   * Get an object of cookies.
   * @returns {Object}
   */
  get cookies() {
    return this.r.cookies;
  }

  /**
   * Get response body.
   * @returns {String|Object} response body or JSON object depends on data type.
   */
  get body() {
    return this.r.body;
  }

  /**
   * Get the raw response body.
   * @returns {String} The raw response body.
   */
  get rawBody() {
    return this.r.raw_body;
  }

  /**
   * Get the raw response body. An alias to `rawBody`.
   * @returns {String} The raw response body.
   */
  get raw_body() {
    return this.r.raw_body;
  }

  /**
   * Get status code.
   * @returns {number}
   */
  get code() {
    return this.r.code;
  }

  /**
   * Get status code.
   * @returns {number}
   */
  get status() {
    return this.r.status;
  }

  /**
   * Get status type (status code / 100)
   * @returns {number}
   */
  get statusType() {
    return this.r.statusType;
  }

  /**
   * Check if response is an info (Status code 1xx)
   * @returns {Boolean}
   */
  get isInfo() {
    return this.r.info;
  }

  /**
   * Check if response is ok (status code 2xx)
   */
  get isOk() {
    return this.r.ok;
  }

  /**
   * Check if response is client error (status code 4xx)
   * @returns {Boolean}
   */
  get isClientError() {
    return this.r.clientError;
  }

  /**
   * Check if response is server error (status code 5xx)
   * @returns {Boolean}
   */
  get isServerError() {
    return this.r.serverError;
  }

  /**
   * Error (if response status code is 4xx or 5xx).
   * @returns {Error|false}
   */
  get error() {
    return this.r.error;
  }

  /**
   * Get one cookie.
   * @param name {String} cookie name
   * @returns {String} cookie value
   */
  cookie(name) {
    return this.r.cookie(name);
  }
}
