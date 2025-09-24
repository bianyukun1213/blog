import express from "express";

const app = express();

app.use((req, res, next) => {
  let redirect = false;
  const url = new URL(req.url, `https://${req.headers.host}`);
  const { pathname } = url;

  if (pathname.endsWith('/index.html')) {
    url.pathname = pathname.slice(0, -10);
    redirect = true;
  } else if (pathname.endsWith('/')) {
    url.pathname = pathname + 'index.html';
  } else {
    const segments = pathname.split('/');
    const lastSegment = segments.pop() || '';
    if (lastSegment && !lastSegment.includes('.')) {
      url.pathname = segments.join('/') + '/' + lastSegment + '.html';
      redirect = true;
    }
  }

  if (redirect) {
    res.redirect(301, url.toString());
  } else {
    next(); // 交给 EdgeOne Pages 的静态资源层处理
  }
});

export default app;
