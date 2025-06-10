// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
    async fetch(request) {
        const parsed = new URL(request.url);
        const { pathname, search, hash } = parsed;
        if (pathname.endsWith('/')) {
            parsed.pathname = pathname + 'index.html';
            return await this.env.ASSETS.fetch(parsed.toString());
        } else {
            const segments = pathname.split('/');
            const lastSegment = segments.pop() || '';
            if (lastSegment && !lastSegment.includes('.')) {
                parsed.pathname = segments.join('/') + '/' + lastSegment + '.html';
                return Response.redirect(parsed.toString(), 301);
            }
        }
    }
}
