import Request from "novel-lib/Helpers/Request";
import Response from "novel-lib/Helpers/Response";

class UuKanShuRequest extends Request {
  /**
   * Make a request.
   * @param method {"get"|"post"|"head"|"put"|"patch"|"delete"} Request Method.
   * @param path {String} path.
   * @param [headers] {Object} Extra header.
   * @returns {Promise<Response>}
   */
  async request(method, path, headers = {}) {
    return await super.request(method, `http://www.uukanshu.net/b/${path}`);
  }

}

export default new UuKanShuRequest();
