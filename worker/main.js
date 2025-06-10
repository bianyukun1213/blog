// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
    async fetch(request) {
        let fetch = false;
        const parsed = new URL(request.url);
        const { pathname, search, hash } = parsed;
        if (pathname.endsWith('/index.html')) {
            parsed.pathname = pathname.slice(0, -10);
        } else if (pathname.endsWith('/')) {
            parsed.pathname = pathname + 'index.html';
            fetch = true;
        } else {
            const segments = pathname.split('/');
            const lastSegment = segments.pop() || '';
            if (lastSegment && !lastSegment.includes('.'))
                parsed.pathname = segments.join('/') + '/' + lastSegment + '.html';
        }
        if (fetch)
            return await this.env.ASSETS.fetch(parsed.toString());
        else
            return Response.redirect(parsed.toString(), 301);
    }
}
