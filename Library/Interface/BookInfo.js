class BookInfo {
  /**
   * Book base class.
   * @param [id] {Number|String} Book ID.
   * @param [name] {String} the name.
   * @param [chapters] {Array<ChapterMeta>} chapters to include.
   */
  constructor(id = 0, name = "", chapters = []) {
    this.id = id;
    this.name = name;
    this.chapters = chapters;
  }

  GetId() {
    return this.id;
  }

  /**
   * Set book name.
   * @param name {string} Name of the book.
   * @constructor
   */
  SetName(name) {
    this.name = name;
  }

  /**
   * Get the name of current book.
   * @returns {String} name of the book.
   * @constructor
   */
  GetName() {
    return this.name;
  }

  /**
   * Add a new chapter to current book.
   * @param chapter {ChapterMeta} chapter instance
   * @constructor
   */
  AddChapter(chapter) {
    chapter.SetBook(this);
    this.chapters.push(chapter);
  }

  /**
   * Find a chapter by Id.
   * @param id {number|string} id of the chapter.
   * @returns {ChapterMeta|null} `null` if nothing found; otherwise return found chapter.
   * @constructor
   */
  GetChapterById(id) {
    if (id === undefined || id === null) {
      throw new TypeError("Invalid id.");
    }

    return this.GetChapterByLambda(chapter => chapter.HasId(id));
  }

  /**
   * Find a chapter by name
   * @param name {String} name of the chapter.
   * @returns {ChapterMeta|null}
   * @constructor
   */
  GetChapterByName(name) {
    if ("string" !== typeof name) {
      throw new TypeError("Invalid name.");
    }

    return this.GetChapterByLambda(chapter => chapter.HasName(name));
  }

  /**
   * Get chapter by given lambda
   * @param fn {BookInfo~ChapterCriteriaCallback} Lambda expression or function callback to find a chapter.
   * @returns {ChapterMeta|null} Found chapter.
   * @constructor
   */
  GetChapterByLambda(fn) {
    const chapters = this.chapters;
    for (let i = chapters.length - 1; i >= 0; i--) {
      let chapter = chapters[i];
      if (fn(chapter)) {
        return chapter;
      }
    }

    return null;
  }

  // noinspection JSMethodCanBeStatic
  async GetChapterContent(chapter) {
    throw new Error("GetChapterContent not implemented.");
  }

  // noinspection JSMethodCanBeStatic
  async DownloadChapter(chapter) {
    throw new Error("DownloadChapter not implemented.");
  }
}

/**
 * This callback check if given chapter matches your criteria.
 * @callback BookInfo~ChapterCriteriaCallback
 * @param chapter {ChapterMeta} chapter to check.
 * @returns {Boolean} `true` if that chapter matches your criteria, `false` otherwise.
 */

export default BookInfo;
