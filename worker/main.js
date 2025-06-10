// https://developers.cloudflare.com/workers/static-assets/routing/worker-script/

import { WorkerEntrypoint } from "cloudflare:workers";

function fixUrl(url) {
    // 使用 URL 对象解析输入（兼容绝对和相对 URL）
    const base = url.startsWith('http') ? undefined : 'http://fix.invalid'; // 为相对 URL 提供临时 base
    const parsed = new URL(url, base);
    
    const { pathname, search, hash } = parsed;
    
    // 处理路径规则：
    if (pathname.endsWith('/')) {
        // 以斜杠结尾 → 添加 index.html
        parsed.pathname = pathname + 'index.html';
    } else if (!pathname.includes('.') && !pathname.endsWith('.html')) {
        // 无扩展名且非目录 → 添加 .html 扩展名
        parsed.pathname = pathname + '.html';
    }
    
    // 返回修正后的完整 URL（移除临时 base 的痕迹）
    return parsed.toString().replace('http://fix.invalid', '');
}

export default class extends WorkerEntrypoint {
    async fetch(request) {
        // // You can perform checks before fetching assets
        // const user = await checkIfRequestIsAuthenticated(request);

        // if (!user) {
        //   return new Response("Unauthorized", { status: 401 });
        // }

        // if (request.url.endsWith('/'))
        //     return await this.env.ASSETS.fetch(request.url + 'index.html');
        // return await this.env.ASSETS.fetch(request);
        return await this.env.ASSETS.fetch(fixUrl(request.url));

        // // You can then just fetch the assets as normal, or you could pass in a custom Request object here if you wanted to fetch some other specific asset
        // const assetResponse = await this.env.ASSETS.fetch(request);

        // // You can return static asset response as-is, or you can transform them with something like HTMLRewriter
        // return new HTMLRewriter()
        //     .on("#user", {
        //         element(element) {
        //             element.setInnerContent(JSON.stringify({ name: user.name }));
        //         },
        //     })
        //     .transform(assetResponse);
    }
}