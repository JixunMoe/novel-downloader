import BookInfo from "novel-lib/Interface/BookInfo";
import request from "./Request";

class UuKanShuBook extends BookInfo {
  // noinspection JSMethodCanBeStatic
  async DownloadChapter(chapter) {
    return await request.get(`${this.GetId()}/${chapterId}.html`);
  }
}

export default UuKanShuBook;
