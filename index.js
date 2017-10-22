import unirest from "unirest";
import cheerio from "cheerio";
import fs from "fs";

async function getUrl(url) {
  return new Promise(function (resolve, reject) {
    unirest.get(url).encoding(null).end(resp => {
      if (resp.code === 200) {
        resolve(resp.body);
      } else {
        console.error("http code %d", resp.code);
        reject(resp);
      }
    });
  });
}

async function sleep(...params) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ...params);
  });
}

async function getBookIndex(bookId = 65199) {
  return await getUrl(`http://www.uukanshu.net/b/${bookId}/`);
}

function parseBookIndex(content) {
  const $ = cheerio.load(content);
  const book = new BookIndex();
  book.id = 65199;
  let reversedChapters = [];
  $("#chapterList").find("li a").each((index, element) => {
    const $el = $(element);
    const href = $el.attr("href");
    const id = parseInt(href.match(/\/(\d+)\.html/)[1], 10);
    reversedChapters.push(new ChapterMeta(id, $el.text()));
  });
  reversedChapters.reverse().forEach(chapter => book.AddChapter(chapter));
  return book;
}

async function getChapter(bookId, chapterId) {
  return await getUrl(`http://www.uukanshu.net/b/${bookId}/${chapterId}.html`);
}

async function app() {
  const indexPage = fs.readFileSync("fixture/uukanshu-bookIndex.html", "utf-8");
  const book = parseBookIndex(indexPage);

  for (let i = 0; i < book.chapters.length; i++) {
    let chapter = book.chapters[i];

    console.info("Downloading chapter: %s", chapter.name);
    const chapterContent = await getChapter(book.id, chapter.id);
    fs.writeFileSync(`./fixture/uukanshu-chapter-${chapter.id}.html`, chapterContent);
    // await sleep(200);
  }
}

// app();
