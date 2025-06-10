// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
    async fetch(request) {
        let redirect = false;
        const parsed = new URL(request.url);
        const { pathname, search, hash } = parsed;
        if (pathname.endsWith('/')) {
            parsed.pathname = pathname + 'index.html';
        } else {
            const segments = pathname.split('/');
            const lastSegment = segments.pop() || '';
            if (lastSegment && !lastSegment.includes('.')) {
                parsed.pathname = segments.join('/') + '/' + lastSegment + '.html';
                redirect = true;
            }
        }
        if (redirect)
            return Response.redirect(parsed.toString(), 301);
        else
            return await this.env.ASSETS.fetch(parsed.toString());
    }
}
