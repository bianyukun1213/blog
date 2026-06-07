// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

export default {
    async fetch(request, env, ctx) {
        let redirect = false;
        const parsed = new URL(request.url);
        const { pathname, search, hash } = parsed;
        if (pathname.endsWith('/index.html')) {
            parsed.pathname = pathname.slice(0, -10);
            redirect = true;
        } else if (pathname.endsWith('/')) {
            parsed.pathname = pathname + 'index.html';
        } else {
            const segments = pathname.split('/');
            const lastSegment = segments.pop() || '';
            if (lastSegment && !lastSegment.includes('.')) {
                parsed.pathname = segments.join('/') + '/' + lastSegment + '.html';
                redirect = true;
            }
        }
        if (redirect) {
            return Response.redirect(parsed.toString(), 301);
        } else if (request.method === 'GET' && (request.headers.get('cf-ipcountry') === 'RU' || request.headers.get('cf-ipcountry') === 'CN') && !request.headers.get('eo-connecting-ip')) {
            const base = "https://blog-archived.hollisdevhub.com";
            const statusCode = 302;
            const url = new URL(request.url);
            const { pathname, search } = url;
            const destinationURL = `${base}${pathname}${search}`;
            return Response.redirect(destinationURL, statusCode);
        } else {
            return await env.ASSETS.fetch(parsed.toString());
        }
    }
}
