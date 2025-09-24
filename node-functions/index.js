export default async function (req, res, context) {
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
    // 301 重定向
    res.writeHead(301, { Location: url.toString() });
    res.end();
    return;
  }

  // 调用静态资源（Pages 的 Assets）
  const assetResponse = await context.env.ASSETS.fetch(url.toString());

  // 转发 headers 和 body
  res.writeHead(assetResponse.status, Object.fromEntries(assetResponse.headers.entries()));
  const buffer = Buffer.from(await assetResponse.arrayBuffer());
  res.end(buffer);
}
