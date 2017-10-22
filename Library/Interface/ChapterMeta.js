import Mustache from "mustache";

class ErrorBookNotSet extends Error {
  /**
   * Construct an ErrorBookNotSet error.
   * @param method {String} method name.
   */
  constructor(method) {
    super(Mustache.render("Derived class did not override {{ method }}, and book was not set.", {
      method
    }))
  }
}

class ChapterMeta {
  /**
   * Chapter Base class - meta info only but extendable.
   * @param id {Number|String} chapter id.
   * @param name {String} Chapter title/name.
   * @param book {BookInfo} The book this chapter belongs to
   */
  constructor(id = 0, name = "", book = null) {
    this.id = id;
    this.name = name;
    this.book = book;
  }

  /**
   * Set related book instance.
   * @param book {BookInfo} Base book class.
   * @constructor
   */
  SetBook(book) {
    this.book = book;
  }

  /**
   * Get book instance related to current chapter.
   * @returns {BookInfo} Related book instance.
   * @constructor
   */
  GetBook() {
    return this.book;
  }

  /**
   * Check if given name matches the name of current chapter.
   * @param name {String} Chapter name to check.
   * @returns {boolean} `true` if it matches.
   * @constructor
   */
  HasName(name) {
    return typeof(name) === "string" && this.GetName() === name;
  }

  /**
   * Check if given id matches the name of current chapter.
   * @param id {Number|String} Chapter id to check.
   * @returns {boolean} `true` if it matches.
   * @constructor
   */
  HasId(id) {
    return this.GetId() === id;
  }

  /**
   * Get the id of current chapter.
   * @returns {Number|String} Chapter id.
   * @constructor
   */
  GetId() {
    return this.id;
  }

  /**
   * Set the id of current chapter.
   * @param id {Number|String} the new id.
   * @constructor
   */
  SetId(id) {
    this.id = id;
  }

  /**
   * Get the name of current chapter.
   * @returns {String} Chapter name.
   * @constructor
   */
  GetName() {
    return this.name;
  }

  /**
   * Set the name of current chapter.
   * @param name {String} the new name.
   * @constructor
   */
  SetName(name) {
    this.name = name;
  }

  /**
   * Get chapter content.
   * It should first try and read from cache. If the cache misses,
   * it then go online to fetch.
   *
   * @returns {Promise<String>} Chapter content.
   * @constructor
   */
  async GetChapterContent() {
    if (this.book === null) {
      throw new ErrorBookNotSet(this.GetChapterContent.name);
    }
    return this.book.GetChapterContent(this);
  }


  async DownloadChapter() {
    if (this.book === null) {
      throw new ErrorBookNotSet(this.DownloadChapter.name);
    }
    return this.book.DownloadChapter(this);
  }
}


export default ChapterMeta;
