export default async function onRequest(context) {
    const { request, env } = context;
    let redirect = false;

    const url = new URL(request.url);
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
        return Response.redirect(url.toString(), 301);
    }

    // 拉取静态资源
    return env.ASSETS.fetch(url.toString());
}
