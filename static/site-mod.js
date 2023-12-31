// 这里做一些对站点的整体修改。


// const siteUrl = 'https://his2nd.life/';
const siteUrl = `${window.location.origin}/`;

const layuiThemeDarkCdn = 'https://unpkg.com/layui-theme-dark/dist/layui-theme-dark.css';

// 明晃晃写，毕竟这些措施都只能稍稍保护一下。

const geoApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJkMDA2OGM4ZDFiNTM2ZmMzMjc2NmRiNWIzOTQ4NjFkYiJ9.ahNbkKBX2KIaalcvL6eRUBJVWA9NEfIesXNIhliN5Kc';

const aesKey = '#$!2KENZ*#bLGy';

const leanCloudAppId = 'TjlywOgAHj9rcaw3nbUeV561-MdYXbMMI';
const leanCloudAppKey = 'I0J0aMw0p6O2gEv0WmeiJwsc';
// const artitalkServerUrl = 'https://artitalk.his2nd.life';

// jQuery Ajax 包装：
// 把以前做 daddys-here 的代码改吧改吧，见 https://github.com/bianyukun1213/daddys-here/blob/main/src/index.html#L739。
function smRequest(options) {
    options = options || {};
    let baseUrl = options.baseUrl || siteUrl.slice(0, -1);
    let entry = options.entry || '';
    let url = baseUrl + entry; // 新增：合并 baseUrl 和 entry。
    let method = options.method || 'GET';
    let async = typeof options.async === 'undefined' ? true : !!options.async; // 新增：默认异步请求。jQ 强烈不建议使用同步请求。
    let cache = typeof options.cache === 'undefined' ? true : !!options.cache; // 新增：默认允许使用缓存。
    let contentType = options.contentType || 'application/json';
    let data = options.data || {};
    let timeout = $.isNumeric(options.timeout) ? options.timeout : 5000; // 新增：可配置 timeout。
    let success = (result, status, xhr) => {
        smLog(`${options.method} ${url} 请求成功：`, JSON.parse(JSON.stringify(result))); // 之后任何对 result 的修改都会影响这里，所以打印的时候“复制”一份来打印原样。
        if ($.isFunction(options.success)) {
            options.success(result);
        }
    };
    let fail = (xhr, status, error) => {
        smLog(`${options.method} ${url} 请求失败：${status}, `, error);
        if ($.isFunction(options.fail)) {
            options.fail(status);
        }
    };
    let complete = (xhr, status) => {
        if ($.isFunction(options.complete)) {
            options.complete();
        }
    };
    $.ajax({
        url: url,
        type: method,
        async: async,
        cache: cache,
        contentType: contentType,
        data: data,
        timeout: timeout,
        beforeSend: () => {
            smLog(`发送 Ajax 请求：${method} ${url} ，数据：`, data); // 逗号前加个空格，不然“，数据：”就被 Chrome 控制台识别进 url 了，点击直接打开的页面就错了。
        }
    }).done(success).fail(fail).always(complete);
}
async function smRequestAsync(options) {
    options.async = true;
    return new Promise((resolve, reject) => {
        options.success = resolve;
        options.fail = reject;
        smRequest(options);
    });
}
function smGet(options) {
    options = options || {};
    options.method = 'GET';
    smRequest(options);
}
async function smGetAsync(options) {
    options = options || {};
    options.method = 'GET';
    return smRequestAsync(options);
}
function smPost(options) {
    options = options || {};
    options.method = 'POST';
    smRequest(options);
}
function smPut(options) {
    options = options || {};
    options.method = 'PUT';
    smRequest(options);
}
function smDelete(options) {
    options = options || {};
    options.method = 'DELETE';
    smRequest(options);
}
const smDataV1 = {
    templateVer: 1,
    settings: {},
    showInitialPopup: true
};
const smDataV2 = {
    templateVer: 2,
    settings: {},
    showInitialPopup: true,
    debugLog: false
};
const smDataV3 = {
    templateVer: 3,
    settings: {},
    showInitialPopup: true,
    debug: false
};
function makeSmData() {
    // return JSON.parse(JSON.stringify(smDataV1));
    // return JSON.parse(JSON.stringify(smDataV2));
    return JSON.parse(JSON.stringify(smDataV3));
}
function getSmSettings() {
    return getSmData().settings;
}
function setSmSettings(smSettings) {
    let smData = getSmData();
    smData.settings = smSettings;
    setSmData(smData);
}
function migrateSmDataFromNoneToV1(none) {
    return JSON.parse(JSON.stringify(smDataV1));
}
function migrateSmDataFromV1ToV2(v1) {
    let tmp = JSON.parse(JSON.stringify(v1));
    // v2 新增了 debugLog 字段。
    tmp.debugLog = false;
    tmp.templateVer = 2;
    return tmp;
}
function migrateSmDataFromV2ToV3(v2) {
    let tmp = JSON.parse(JSON.stringify(v2));
    // v3 将 debug 字段重命名为 debug。
    tmp.debug = tmp.debugLog;
    delete tmp.debugLog;
    tmp.templateVer = 3;
    return tmp;
}
function migrateSmData(oldSmData) {
    if (oldSmData.templateVer === null || typeof oldSmData.templateVer === 'undefined' || oldSmData.templateVer < 1)
        // 这种肯定是 localStorage 里的 smData 被修改过导致版本号连 1 都不是，就新生成一个 v1 的。
        oldSmData = migrateSmDataFromNoneToV1(oldSmData);
    if (oldSmData.templateVer < 2)
        oldSmData = migrateSmDataFromV1ToV2(oldSmData);
    if (oldSmData.templateVer < 3)
        oldSmData = migrateSmDataFromV2ToV3(oldSmData);
    return oldSmData;
}
// 按最新的数据模板校验。
function validateSmData(invalidSmData) {
    let validSmData = makeSmData(); // 以干净的模板作为基底。
    let invalidShowInitialPopup = invalidSmData.showInitialPopup;
    validSmData.showInitialPopup = invalidShowInitialPopup === false || invalidShowInitialPopup === 'false' ? false : true; // 从 local storage 读的是字符串，转成 bool。
    let invalidDebug = invalidSmData.debug;
    validSmData.debug = invalidDebug === true || invalidDebug === 'true' ? true : false; // 从 local storage 读的是字符串，转成 bool。
    let invalidSettings = invalidSmData.settings;
    // ...
    return validSmData;
}
// 返回处理过的值。
function getSmData() {
    let newSmData = makeSmData();
    let smData = newSmData;
    let rawSmData = localStorage.getItem('smData');
    if (rawSmData !== null) {
        try {
            smData = JSON.parse(rawSmData);
        } catch (error) {
            smData = newSmData;
        }
    }
    if (smData.templateVer < newSmData.templateVer)
        smData = migrateSmData(smData);
    smData = validateSmData(smData);
    return smData;
}
function setSmData(smData) {
    localStorage.setItem('smData', JSON.stringify(smData));
}
function getFixedPathname() {
    const pathname = window.location.pathname;
    let fixedPathname = pathname;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}
// 获取站点元数据，如果在单页模式下已有元数据，就不再获取。
async function getSiteMetaAsync(forced) {
    if (JSON.stringify(siteMetaCache) === '{}' || forced) {
        let loadingIndex = layer.load(0, { shade: [1, '#202124'], scrollbar: false });
        let getPromise = smGetAsync({
            entry: '/site-meta.json',
            cache: false, // 不要从缓存读取。
            timeout: 8000
        });
        getPromise.finally(() => {
            layer.close(loadingIndex);
        });
        let res = await getPromise;
        siteMetaCache = res;
        return res;
    } else {
        return siteMetaCache;
    }
}
function decryptPageMeta(pageMeta) {
    try {
        return JSON.parse(CryptoJS.AES.decrypt(pageMeta.encryptedData, aesKey).toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return {};
    }
}
async function getCurMetaAsync(forced) {
    const siteMeta = await getSiteMetaAsync(forced);
    const fixedPathname = getFixedPathname();
    const pageMeta = siteMeta.pages;
    const postMeta = siteMeta.posts;
    let curMeta = {};
    let curMetaFound = false;
    for (const item of pageMeta) {
        // 举例：比较 links/index.html 与 /links/，应该能够对应上。
        // 此时 fixedPathname 要么以 / 结尾，要么以 .html 结尾。
        let decrypted = item;
        // 如果数据是加密的。
        if (typeof decrypted.encryptedData !== 'undefined' && decrypted.encryptedData !== null)
            decrypted = decryptPageMeta(decrypted);
        if (decrypted.path === fixedPathname.slice(1) || decrypted.path === fixedPathname.slice(1) + 'index.html') {
            curMeta.type = 'page';
            curMeta.meta = decrypted;
            curMetaFound = true;
            break;
        }
    }
    if (!curMetaFound) {
        for (const item of postMeta) {
            let decrypted = item;
            // 如果数据是加密的。
            if (typeof decrypted.encryptedData !== 'undefined' && decrypted.encryptedData !== null)
                decrypted = decryptPageMeta(decrypted);
            if (decrypted.path === fixedPathname.slice(1)) {
                curMeta.type = 'post';
                curMeta.meta = decrypted;
                curMetaFound = true;
                break;
            }
        }
    }
    smLog('获取到当前页面/文章的元数据：', curMeta);
    return curMeta;
}
async function checkRegionBlacklistAsync(forced) {
    const curMeta = await getCurMetaAsync(forced);
    // 检查用户地区是否在黑名单内。
    if (!$.isEmptyObject(curMeta) && $.isArray(curMeta.meta.regionBlacklist) && curMeta.meta.regionBlacklist.length > 0) {
        if (userRegionTextCache === '' || forced) {
            let loadingIndex = layer.load(0, { shade: [1, '#202124'], scrollbar: false });
            let getPromise = smGetAsync({
                baseUrl: 'https://www.douyacun.com',
                entry: '/api/openapi/geo/location',
                cache: false, // 不要从缓存读取。
                // contentType: 'text/plain', 如果返回的确实是 JSON，调这里没用。
                data: {
                    token: geoApiToken
                },
                timeout: 5000
            });
            getPromise.finally(() => {
                layer.close(loadingIndex);
            });
            let res = await getPromise;
            userRegionTextCache = JSON.stringify(res);
        }
        for (const region of curMeta.meta.regionBlacklist) {
            if (userRegionTextCache.includes(region))
                return true;
        }
        return false;
    }
    else {
        return false;
    }
}
function sleep(sleepTime) {
    for (var start = new Date; new Date - start <= sleepTime;) { }
}
function getThemeColorScheme() {
    const redefineStorage = localStorage.getItem('REDEFINE-THEME-STATUS');
    if (redefineStorage !== null) {
        if (JSON.parse(redefineStorage).isDark === true)
            return 'dark';
        else
            return 'light';
    }
    else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            return 'dark';
        else
            return 'light';
    }
}
// 页面加载后再执行的操作：
function runAfterContentVisible(onSwupPageView) {
    // 监听搜索框输入事件，根据条件开启调试。需要在页面加载后监听，因为 site-mod.js 在头部注入，执行时还没有搜索框。
    $('.search-input').on('input', function () {
        if ($(this).val() === 'debugon' && !debugOn) {
            let smData = getSmData();
            smData.debug = true;
            setSmData(smData);
            window.location.reload();
        }
        else if ($(this).val() === 'debugoff' && debugOn) {
            let smData = getSmData();
            smData.debug = false;
            setSmData(smData);
            window.location.reload();
        }
    });
    // 隐藏开启 Javascript 的提示。
    $('#javascript-alert').hide();
    // 修正 pathname，以解决不带 .html 不显示评论，并且已保存了密码的文章也不能自动解密的问题。
    const pathname = window.location.pathname;
    let fixedPathname = getFixedPathname();
    if (pathname !== fixedPathname) {
        window.location.replace(window.location.origin + fixedPathname); // 跳转。
        return; // 从 replace 到实际跳转有一段时间，没必要让代码继续执行，因此 return。
    }
    // // Artitalk 跳转：如果当前是单页模式下触发的 Artitalk 页面加载，就真地重新加载一次，以避免 Lean Cloud Storage SDK 多次初始化的问题。
    // if (pathname === '/hollow/' && onSwupPageView) {
    //     window.location.reload();
    //     return;
    // }
    // 检查用户属地。
    checkRegionBlacklistAsync().then((res) => {
        if (res)
            window.location.replace(`${siteUrl}go-home/`);
    });
    // swup 会使内联 javascript 失效，导致 masonry 无法自适应。检测到 masonry 就刷新，就能正常显示。
    if (onSwupPageView && $('.image-masonry').length > 0)
        window.location.reload();
    // if (onSwupPageView) {
    //     let imgMasonries = $('.image-masonry');
    //     for (const masonry of imgMasonries) {
    //         let scriptEle = masonry.nextElementSibling;
    //         if (scriptEle.tagName === 'SCRIPT') {
    //             let script = scriptEle.innerText;
    //             scriptEle.remove();
    //             $(masonry).after(`<script>${script}</script>`);
    //         }
    //     }
    // }
    // 去除无用的图片注释。
    let captions = $('.image-caption');
    for (const cap of captions) {
        let img = cap.children[0];
        if (img.hasAttribute('title'))
            cap.children[1].innerText = img.title;
        else
            cap.children[1].remove();
    }
    // 修正开往链接，全部改为由当前页面跳转，否则算什么“开往”？！
    $('a[href="https://www.travellings.cn/go.html"]').attr('target', '_self');
    // // 修复 Redefine 单页模式下的 Artitalk。
    // if ($('#artitalk_main').length > 0) {
    //     new Artitalk({
    //         appId: leanCloudAppId,
    //         appKey: leanCloudAppKey,
    //         serverURL: artitalkServerUrl,
    //         pageSize: 50,
    //         shuoPla: '写点什么？',
    //         avatarPla: '头像 Url',
    //         color1: '#4c8dae',
    //         color2: '#db5a6b'
    //     });
    // }
    // 修复移动端网易云音乐外链。
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        let iframes = $('iframe');
        for (let frm of iframes)
            if (frm.src.includes('music.163.com/'))
                frm.src = frm.src.replace('music.163.com/', 'music.163.com/m/');
    }
    // 修复移动端下在解密文章的输入框点击回车后焦点跑到评论区，而不解密的问题。
    $('.hbe-input-field').attr('enterkeyhint', 'done');
    if (pathname === '/timeline/') {
        // mastodonTimeline 保存了 DOM 的引用，swup 换页再换回来，引用过时，buildTimeline 不好使，需要新建。
        // if (!mastodonTimeline) {
        mastodonTimeline = new MastodonApi({
            container_body_id: "mt-body",
            spinner_class: "loading-spinner",
            default_theme: themeColorScheme,
            instance_url: "https://m.cmx.im",
            timeline_type: "profile",
            user_id: "107989258291762102",
            profile_name: "@Hollis",
            hashtag_name: "",
            toots_limit: "20",
            hide_unlisted: false,
            hide_reblog: false,
            hide_replies: false,
            hide_preview_link: false,
            hide_emojos: false,
            markdown_blockquote: false,
            hide_counter_bar: false,
            text_max_lines: "0",
            link_see_more: "在 m.cmx.im 查看更多嘟文"
        });
        // } else {
        //     mastodonTimeline.buildTimeline();
        // }
    }
    // 加载 Layui 组件，用到 Layui 的都写在回调函数里，回调函数是异步执行的。
    layui.use(() => {
        let layer = layui.layer;
        let smData = getSmData();
        if (smData.showInitialPopup) {
            let alertIndex = layer.alert(
                '您好！这可能是您初次访问本站。本站的大部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。点击“确定”永久关闭本弹窗。',
                { title: '初次访问', icon: 0, maxWidth: 500, closeBtn: 0, scrollbar: false },
                () => {
                    let smData = getSmData(); // 用户阅读完才会点击确定按钮，这段时间内 smData 可能改变，获取最新值。
                    smData.showInitialPopup = false;
                    setSmData(smData);
                    layer.close(alertIndex);
                });
        }
    });
}
// 初始化 site-mod 数据。
setSmData(getSmData());
// 初始化站点元数据。
let siteMetaCache = {};
let userRegionTextCache = '';
// let themeColorScheme = getThemeColorScheme();
let themeColorScheme = ''; // 初值设为空，这样首次即能触发 newThemeColorScheme !== themeColorScheme。
let vConsole = {};
let smDebug = {};
let smLog = () => { };
const debugOn = getSmData().debug;
if (debugOn) {
    vConsole = new window.VConsole();
    smDebug = {
        decryptSiteMetaAsync: async function (forced) {
            let decryptedSiteMeta = await getSiteMetaAsync(forced);
            decryptedSiteMeta.pages = decryptedSiteMeta.pages.map((page) => {
                if (typeof page.encryptedData !== 'undefined' && page.encryptedData !== null)
                    page = decryptPageMeta(page);
                return page;
            });
            decryptedSiteMeta.posts = decryptedSiteMeta.posts.map((post) => {
                if (typeof post.encryptedData !== 'undefined' && post.encryptedData !== null)
                    post = decryptPageMeta(post);
                return post;
            });
            return decryptedSiteMeta;
        },
        getHiddenPagesAsync: async function (forced) {
            let hiddenPages = [];
            let decryptedSiteMeta = await this.decryptSiteMetaAsync(forced);
            for (const page of decryptedSiteMeta.pages) {
                if (page.hidden)
                    hiddenPages.push(page);
            }
            for (const post of decryptedSiteMeta.posts) {
                if (post.hidden)
                    hiddenPages.push(post);
            }
            return hiddenPages;
        }
    };
    smLog = (...params) => { console.log(new Date().toLocaleTimeString() + ' |', ...params); };
}
let mastodonTimeline;
// 轮询检测 local storage 变化，实现 Layui 跟随 Redefine 明暗。
// 原来用的是监听，实际上比较麻烦，见：
// https://stackoverflow.com/questions/26974084/listen-for-changes-with-localstorage-on-the-same-window
// 这种监听对 Mozilla Firefox 无效：Firefox 把 setItem 完全当作键名处理，会在 local storage 中存入名为 setItem 的数据，并且不会触发事件。
// 可以修改 Storage 的原型解决这个问题：
// https://stackoverflow.com/questions/49367897/how-to-edit-function-setitem-in-firefox
// https://stackoverflow.com/questions/13612643/is-it-possible-to-override-local-storage-and-session-storage-separately-in-html5
// 但仍有缺点：这种方式不会响应 localStorage.xxx = yyy 或 localStorage['xxx'] = yyy 的存储，需要另外的办法，我没整明白。
// https://stackoverflow.com/questions/33888685/override-dot-notation-for-localstorage
setInterval(() => {
    let newThemeColorScheme = getThemeColorScheme();
    if (newThemeColorScheme !== themeColorScheme) {
        if (newThemeColorScheme === 'dark')
            $('#layui-theme-dark').attr('href', layuiThemeDarkCdn);
        else
            $('#layui-theme-dark').removeAttr('href');
        // 切换 mastodonTimeline 主题。
        if (window.location.pathname === '/timeline/') {
            mastodonTimeline.DEFAULT_THEME = newThemeColorScheme;
            mastodonTimeline.setTheme();
        }
        if (!$.isPlainObject(vConsole))
            vConsole.setOption('theme', newThemeColorScheme);
    }
    themeColorScheme = newThemeColorScheme;
}, 1000);
// 监听页面加载完成事件。
$(document).ready(() => {
    try {
        // 由于使用了 Redefine 的单页模式，设置 swup 钩子。
        swup.hooks.on('page:view', () => runAfterContentVisible(true));
    } catch (error) {
        console.error('swup hook error: ', error);
    }
    runAfterContentVisible();
});
// 监听 hexo-blog-encrypt 插件的解密事件，自动刷新页面以使部分内容正确显示。
$(window).on('hexo-blog-decrypt', (e) => {
    if (!window.location.hash.includes('#on-decryption-reload')) {
        window.location.hash = '#on-decryption-reload';
        // 如果文章是新解密的，等待 hexo-blog-encrypt 插件写入 localStorage，这样下次再访问就能自动解密。
        setInterval(() => {
            if (localStorage.getItem(`hexo-blog-encrypt:#${window.location.pathname}`) !== null)
                window.location.reload();
        }, 1000);
    } else {
        window.location.hash = window.location.hash.replace('#on-decryption-reload', '');
    }
});
