import Crawler from "crawler";

const c = new Crawler({});
let obselete = [];

// Based on: https://stackoverflow.com/a/50164565
const crawlAllUrls = (url) => {
  console.log(url);
  c.queue({
    uri: url,
    callback: (err, res, done) => {
      let $ = res.$;
      let urls = $("a");
      Object.keys(urls).forEach((item) => {
        if (urls[item].type === "tag") {
          let href = urls[item].attribs.href;
          if (href !== undefined && !obselete.includes(href)) {
            href = href.trim();
            if(href.startsWith("/")) {
              obselete.push(href);
              href.startsWith('http') ? crawlAllUrls(href) : crawlAllUrls(`${url}${href}`);
            }
          }
        }
      });
      done();
    }
  });
}

crawlAllUrls('https://www.semanux.com');