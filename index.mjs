import Crawler from "crawler";

const c = new Crawler();
let obselete = [];
const base = "https://www.semanux.com";

// Based on: https://stackoverflow.com/a/50164565
const crawlAllUrls = (url) => {
  console.log(url);
  c.queue({
    uri: url,
    callback: (_err, res, done) => {
      try {
        let $ = res.$;
        let urls = $("a");
        Object.keys(urls).forEach((item) => {
          if (urls[item].type === "tag") {
            let href = urls[item].attribs.href;
            if (href !== undefined) {
              href = href.trim();
              if(href.startsWith("/")) {
                href = `${base}${href}`;
                if(!obselete.includes(href)) {
                  obselete.push(href);
                  crawlAllUrls(href);
                }
              }
            }
          }
        });
        done();
      } catch (_e) {}
    }
  });
}

crawlAllUrls(base);