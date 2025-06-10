// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

import { WorkerEntrypoint } from "cloudflare:workers";

function fixUrl(url) {
    const parsed = new URL(url);
    const { pathname, search, hash } = parsed;
    if (pathname.endsWith('/')) {
        parsed.pathname = pathname + 'index.html';
    }
    else {
        const segments = pathname.split('/');
        const lastSegment = segments.pop() || '';
        if (lastSegment && !lastSegment.includes('.'))
            parsed.pathname = segments.join('/') + '/' + lastSegment + '.html';
    }
    return parsed.toString();
}

export default class extends WorkerEntrypoint {
    async fetch(request) {
        return await this.env.ASSETS.fetch(fixUrl(request.url));
    }
}
