import express from "express";

const app = express();

app.use(async (req, res, next) => {
  let redirect = false;
  const url = new URL(req.url, `http://${req.headers.host}`);

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
    return;
  }

  // 调用 EdgeOne 提供的 ASSETS
  const assetResponse = await req.context.env.ASSETS.fetch(url.toString());

  // 转发 headers 和 body
  res.status(assetResponse.status);
  for (const [k, v] of assetResponse.headers.entries()) {
    res.setHeader(k, v);
  }
  res.send(Buffer.from(await assetResponse.arrayBuffer()));
});

// 必须导出 app
export default app;
