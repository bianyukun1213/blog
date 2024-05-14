'use strict';

// 这里做一些对站点的整体修改。

const siteLang = window.location.pathname.split('/')[1];
const pageLang = $('html').attr('lang');

// const siteUrl = 'https://his2nd.life';
const siteUrl = `${window.location.origin}/${siteLang}`;

const counterUrl = 'https://gc.his2nd.life/counter';

const layuiThemeDarkCdn = 'https://npm.onmicrosoft.cn/layui-theme-dark/dist/layui-theme-dark.css';

// 明晃晃写，毕竟这些措施都只能稍稍保护一下。

const aesKey = 'Uznb#gi;ZezgSV0EcaER(uwf@NV+bh+3';

const minimumSupportedBrowserVersions = {
    chrome: '105',
    safari: '15.4',
    firefox: '121'
};

// 这里仅以 hostname 判断。实际上，referrer 包含端口号，而 hostname 不含端口号，host 才有。
const knownReferrerHostnames = {
    'google.com': 'GOOGLE',
    'bing.com': 'BING',
    'baidu.com': 'BAIDU',
    'xn--sr8hvo.ws': 'AN_INDIEWEB_WEBRING',
    'travellings.cn': 'TRAVELLINGS',
    'github.com': 'GITHUB',
    'postcrossing.com': 'POSTCROSSING',
    'steamcommunity.com': 'STEAM_COMMUNITY',
    'redefine.ohevan.com': 'THEMEREDEFINE'
};

const fediverseSoftwares = [
    'CALCKEY',
    'DIASPORA',
    'FEDIBIRD',
    'FIREFISH',
    'FOUNDKEY',
    'FRIENDICA',
    'GLITCHCAFE',
    'GNU_SOCIAL',
    'HOMETOWN',
    'HUBZILLA',
    'KBIN',
    'MASTODON',
    'MEISSKEY',
    'MICRO_DOT_BLOG',
    'MISSKEY'
];

// jQuery Ajax 包装：
// 把以前做 daddys-here 的代码改吧改吧，见 https://github.com/bianyukun1213/daddys-here/blob/main/src/index.html#L739。
function smRequest(options, async) {
    options = options || {};
    const baseUrl = options.baseUrl || siteUrl;
    const entry = options.entry || '';
    const url = baseUrl + entry; // 新增：合并 baseUrl 和 entry。
    const data = options.data || {};
    const timeout = $.isNumeric(options.timeout) ? options.timeout : 5000; // 新增：可配置 timeout。
    const success = (data, textStatus, jqXhr) => {
        smLogDebug(`${options.method} ${url} 请求成功：`, JSON.parse(JSON.stringify(data))); // 之后任何对 data 的修改都会影响这里，所以打印的时候“复制”一份来打印原样。
        if ($.isFunction(options.success))
            options.success(data, textStatus, jqXhr);
    };
    const fail = (jqXhr, textStatus, errorThrown) => {
        smLogError(`${options.method} ${url} 请求失败：`, jqXhr, textStatus, errorThrown);
        if ($.isFunction(options.fail))
            options.fail(jqXhr, textStatus, errorThrown);
    };
    const complete = (dataOrJqXhr, textStatus, jqXhrOrErrorThrown) => {
        if ($.isFunction(options.complete))
            options.complete(dataOrJqXhr, textStatus, jqXhrOrErrorThrown);
    };
    $.ajax({
        url: url,
        type: options.method, // 用默认的。
        async: !!async, // 我想默认用同步。jQ 默认是异步，undefined 应该就变成异步了。
        cache: options.cache, // 用默认的。
        contentType: options.contentType, // 用默认的。
        dataType: options.dataType, // 用默认的。
        data: data,
        timeout: timeout,
        beforeSend: () => {
            smLogDebug(`发送 Ajax 请求：${options.method} ${url} ，数据：`, data); // 逗号前加个空格，不然“，数据：”就被 Chrome 控制台识别进 url 了，点击直接打开的页面就错了。
        }
    }).done(success).fail(fail).always(complete);
}
async function smRequestAsync(options) {
    options.async = true;
    return new Promise((resolve, reject) => {
        options.success = resolve;
        options.fail = reject;
        smRequest(options, true);
    }).catch((error) => {
        smLogError('异步请求出错：', error);
        return Promise.reject(error);
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
async function smPostAsync(options) {
    options = options || {};
    options.method = 'POST';
    return smRequestAsync(options);
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
class smDataTemplates {
    static get latest() {
        return this.v8;
    }
    static get v1() {
        return {
            templateVer: 1,
            settings: {},
            showInitialPopup: true
        };
    }
    static migrateFromVoidToV1() {
        return smDataTemplates.v1;
    }
    static get v2() {
        return {
            templateVer: 2,
            settings: {},
            showInitialPopup: true,
            debugLog: false
        };
    }
    static migrateFromV1ToV2(v1) {
        let v2 = v1;
        // v2 新增了 debugLog 字段。
        v2.debugLog = false;
        v2.templateVer = 2;
        return v2;
    }
    static get v3() {
        return {
            templateVer: 3,
            settings: {},
            showInitialPopup: true,
            debug: false
        };
    }
    static migrateFromV2ToV3(v2) {
        let v3 = v2;
        // v3 将 debugLog 字段重命名为 debug。
        v3.debug = v3.debugLog;
        delete v3.debugLog;
        v3.templateVer = 3;
        return v3;
    }
    static get v4() {
        return {
            templateVer: 4,
            settings: {
                doNotTrack: false
            },
            initialized: false,
            debug: false,
            debugVars: {}
        };
    }
    static migrateFromV3ToV4(v3) {
        let v4 = v3;
        // v4 新增 debugVars、settings 的 doNotTrack，showInitialPopup 改为 initialized。
        v4.debugVars = {};
        v4.settings.doNotTrack = false;
        v4.initialized = !v4.showInitialPopup;
        delete v4.showInitialPopup;
        v4.templateVer = 4;
        return v4;
    }
    static get v5() {
        return {
            templateVer: 5,
            settings: {
                doNotTrack: false,
                showAiGeneratedExcerpt: true
            },
            initialized: false,
            debug: false,
            debugVars: {}
        };
    }
    static migrateFromV4ToV5(v4) {
        let v5 = v4;
        // v5 新增 settings 的 showAiGeneratedExcerpt。
        v5.settings.showAiGeneratedExcerpt = true;
        v5.templateVer = 5;
        return v5;
    }
    static get v6() {
        return {
            templateVer: 6,
            settings: {
                doNotTrack: false,
                showAiGeneratedExcerpt: true,
                defaultInteractionSystem: 'COMMENTS'
            },
            initialized: false,
            debug: false,
            debugVars: {}
        };
    }
    static migrateFromV5ToV6(v5) {
        let v6 = v5;
        // v6 新增 settings 的 defaultInteractionSystem。
        v6.settings.defaultInteractionSystem = 'COMMENTS';
        v6.templateVer = 6;
        return v6;
    }
    static get v7() {
        return {
            templateVer: 7,
            settings: {
                doNotTrack: false,
                showAiGeneratedExcerpt: true,
                defaultInteractionSystem: 'COMMENTS'
            },
            initialized: false,
            debug: false,
            debugVars: {},
            fediverseSharingPreferences: {
                software: 'MASTODON',
                instance: ''
            }
        };
    }
    static migrateFromV6ToV7(v6) {
        let v7 = v6;
        // v7 新增 fediverseSharingPreferences
        v7.fediverseSharingPreferences = {
            software: 'MASTODON',
            instance: ''
        };
        v7.templateVer = 7;
        return v7;
    }
    static get v8() {
        return {
            templateVer: 8,
            settings: {
                doNotTrack: false,
                showAiGeneratedExcerpt: true,
                chineseConversion: 'DISABLED',
                defaultInteractionSystem: 'COMMENTS'
            },
            initialized: false,
            debug: false,
            debugVars: {},
            fediverseSharingPreferences: {
                software: '',
                instance: ''
            }
        };
    }
    static migrateFromV7ToV8(v7) {
        let v8 = v7;
        // v8 新增 settings 的 chineseConversion。
        v8.settings.chineseConversion = 'DISABLED';
        v8.templateVer = 8;
        return v8;
    }
};
function makeSmData() {
    return smDataTemplates.latest;
}
function getSmSettings() {
    return getSmData().settings;
}
function setSmSettings(smSettings) {
    let smData = getSmData();
    smData.settings = smSettings;
    setSmData(smData);
}
function migrateSmData(oldSmData) {
    smLogDebug('开始迁移 smData：', oldSmData);
    if (typeof oldSmData.templateVer === 'undefined' || oldSmData.templateVer === null || oldSmData.templateVer < 1)
        // 这种肯定是 localStorage 里的 smData 被修改过导致版本号连 1 都不是，就新生成一个 v1 的。
        oldSmData = smDataTemplates.migrateFromVoidToV1(oldSmData);
    if (oldSmData.templateVer < 2)
        oldSmData = smDataTemplates.migrateFromV1ToV2(oldSmData);
    if (oldSmData.templateVer < 3)
        oldSmData = smDataTemplates.migrateFromV2ToV3(oldSmData);
    if (oldSmData.templateVer < 4)
        oldSmData = smDataTemplates.migrateFromV3ToV4(oldSmData);
    if (oldSmData.templateVer < 5)
        oldSmData = smDataTemplates.migrateFromV4ToV5(oldSmData);
    if (oldSmData.templateVer < 6)
        oldSmData = smDataTemplates.migrateFromV5ToV6(oldSmData);
    if (oldSmData.templateVer < 7)
        oldSmData = smDataTemplates.migrateFromV6ToV7(oldSmData);
    if (oldSmData.templateVer < 8)
        oldSmData = smDataTemplates.migrateFromV7ToV8(oldSmData);
    return oldSmData;
}
// 按最新的数据模板校验。
function validateSmData(invalidSmData) {
    smLogDebug('开始校验 smData：', invalidSmData);
    let validSmData = makeSmData(); // 以干净的模板作为基底。
    let invalidInitialized = invalidSmData.initialized;
    validSmData.initialized = invalidInitialized === true || invalidInitialized === 'true' ? true : false; // 如果从 local storage 读的是字符串，（被人改过）转成 bool。
    let invalidDebug = invalidSmData.debug;
    validSmData.debug = invalidDebug === true || invalidDebug === 'true' ? true : false; // 如果从 local storage 读的是字符串，（被人改过）转成 bool。
    // let invalidDebugVars = invalidSmData.debugVars;
    validSmData.debugVars = invalidSmData.debugVars || {}; // 不检查 debugVars，让 smDebug 自己检查。debugVars 的内容与 templateVer 无关。
    let invalidSettings = invalidSmData.settings || {};
    validSmData.settings.doNotTrack = invalidSettings.doNotTrack === true || invalidSettings.doNotTrack === 'true' ? true : false;
    validSmData.settings.showAiGeneratedExcerpt = invalidSettings.showAiGeneratedExcerpt === false || invalidSettings.showAiGeneratedExcerpt === 'false' ? false : true;
    if (invalidSettings.chineseConversion === 'DISABLED' || invalidSettings.chineseConversion === 'HK' || invalidSettings.chineseConversion === 'TW')
        validSmData.settings.chineseConversion = invalidSettings.chineseConversion;
    if (invalidSettings.defaultInteractionSystem === 'COMMENTS' || invalidSettings.defaultInteractionSystem === 'WEBMENTIONS')
        validSmData.settings.defaultInteractionSystem = invalidSettings.defaultInteractionSystem;
    let invalidFediverseSharingPreferences = invalidSmData.fediverseSharingPreferences || {};
    if (fediverseSoftwares.includes(invalidFediverseSharingPreferences.software))
        validSmData.fediverseSharingPreferences.software = invalidFediverseSharingPreferences.software;
    validSmData.fediverseSharingPreferences.instance = typeof invalidFediverseSharingPreferences.instance === 'string' ? invalidFediverseSharingPreferences.instance : '';
    // ...
    return validSmData;
}
// 返回处理过的值。
function getSmData() {
    let newSmData = makeSmData();
    let smData = newSmData;
    try {
        smData = JSON.parse(localStorage.getItem('smData')) || newSmData;
    } catch (error) {
        smData = newSmData;
    }
    if (smData.templateVer < newSmData.templateVer)
        smData = migrateSmData(smData);
    smData = validateSmData(smData);
    return smData;
}
function setSmData(smData) {
    localStorage.setItem('smData', JSON.stringify(smData));
}
function genRandomStr() {
    return Math.random().toString(36).slice(-8);
}
function escapeHtml(str) {
    let s = '';
    if (str.length == 0) return '';
    s = str.replace(/&/g, '&amp;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/\'/g, '&apos;');
    s = s.replace(/\"/g, '&quot;');
    return s;
}
function isTextUrl(text) {
    return /^https?:\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+@]*)*(\?[;&a-z\d%_.~+=-@]*)?(\#[-a-z\d_@]*)?$/i.test(text);
}
function isMobile() {
    return !!navigator.userAgent.match(
        /(phone|pad|pod|Mobile|iPhone|iPad|iPod|ios|Android|Windows Phone|Symbian|BlackBerry|WebOS|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG)/i
    );
}
function isTrackingAvailable(detailed) {
    let details = {
        available: true,
        initializationPassed: true,
        broswerPassed: true,
        settingsPassed: true
    }
    if (!getSmData().initialized) {
        details.available = false;
        details.initializationPassed = false;
    }
    if ('doNotTrack' in navigator && navigator.doNotTrack === '1') {
        details.available = false;
        details.broswerPassed = false;
    }
    if (getSmSettings().doNotTrack) {
        details.available = false;
        details.settingsPassed = false;
    }
    if (detailed)
        return details;
    else
        return details.available;
}
function fixReferrer() {
    if (removeLangPrefix(fixPathname(window.location.pathname)) !== '/')
        return document.referrer;
    // 旧浏览器不支持 URLSearchParams。
    try {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        let documentReferrer = document.referrer;
        let fixedReferrer = documentReferrer;
        let referrerUrl;
        if (documentReferrer !== '') {
            referrerUrl = new URL(documentReferrer);
            const referrerParam = params.get('referrer');
            if (referrerParam !== null) {
                // 从首页跳转过来，获取首页传过来的 referrer。
                if ((referrerUrl.hostname === 'his2nd.life' || referrerUrl.hostname === 'cs.nas.yinhe.dev' || referrerUrl.hostname === '8000.cs.nas.yinhe.dev') && fixPathname(referrerUrl.pathname) === '/' /* 不用 removeLangPrefix，因为首页本来就没有它。 */)
                    referrerUrl = new URL(referrerParam);
                fixedReferrer = referrerUrl.href;
                params.set('referrer', fixedReferrer);
                url.search = params.toString();
                history.replaceState(null, '', url.href);
            }
        } else {
            params.delete('referrer');
            url.search = params.toString();
            history.replaceState(null, '', url.href);
        }
        return fixedReferrer;
    } catch (error) {
        return document.referrer;
    }
}
function fixPathname(pathnameIn) {
    let fixedPathname = pathnameIn;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}
// function getSiteLang() {
//     return window.location.pathname.split('/')[1];
// }
function removeLangPrefix(str) {
    return str.replace(`/${siteLang}`, '');
}
// function getPageLang(forced) {
//     // const curMeta = await getPageMetaAsync(forced);
//     // if ($.isEmptyObject(curMeta) || !curMeta.lang)
//     //     return {};
//     // return curMeta.lang;
//     return $('html').attr('lang');
// }
async function getPageAvailableLangsAsync(forced) {
    const curMeta = await getPageMetaAsync(forced);
    if ($.isEmptyObject(curMeta) || !curMeta.langs)
        return {};
    return curMeta.langs;
}
function extractPostContent() {
    // https://github.com/lukeaus/html-to-formatted-text/blob/master/src/index.js
    const wantedTagNames = [
        'P',
        'DIV',
        'BR',
        'HR',
        'TITLE',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'OL',
        'UL',
        'LI',
        'PRE',
        'TABLE',
        'TH',
        'TD',
        'BLOCKQUOTE',
        'HEADER',
        'FOOTER',
        'NAV',
        'SECTION',
        'SUMMARY',
        'ASIDE',
        'ARTICLE',
        'ADDRESS'
    ];
    let postContent = '';
    const eles = $('.article-content').children();
    let ps = []
    let moreFound = false;
    const elesLength = eles.length;
    for (let eleIndex = 0; eleIndex < elesLength; eleIndex++) {
        const ele = eles[eleIndex];
        if (ele.id === 'more') {
            moreFound = true;
            continue;
        }
        else if (wantedTagNames.includes(ele.tagName) && $(ele).is(':visible') && moreFound) {
            ps.push(ele);
        }
    }
    for (const p of ps)
        postContent += (p.innerText.trim() + '\n'); // 用原生的 innerText 而不是 jQuery 的 text()，后者会去除中间的 \n。
    postContent = postContent.replace(/\n{2,}/g, '\n'); // 移除多个 \n。
    postContent = postContent.replace(/\n+$/, ''); // 移除首 \n。
    postContent = postContent.replace(/^\n+/, ''); // 移除尾 \n。
    return postContent;
}
// 获取站点元数据，如果在 sesstionStorage 下已有元数据，就不再获取。
async function getSiteMetaAsync(forced) {
    if ($.isEmptyObject(siteMetaCache) || siteMetaCache.site.language !== siteLang || forced) {
        const loadingIndex = smUi.showLoading();
        const getPromise = smGetAsync({
            entry: '/site-meta.json',
            cache: false, // 不要从缓存读取。
            timeout: 8000
        });
        getPromise.finally(() => {
            smUi.closeLayer(loadingIndex);
        });
        const res = await getPromise;
        if (typeof res === 'undefined' || res === null) {
            smLogError('站点元数据为空：', res);
            return {};
        }
        siteMetaCache = res;
        sessionStorage.setItem('siteMetaCache', JSON.stringify(siteMetaCache));
        smLogDebug('已更新站点元数据缓存：', siteMetaCache);
    }
    return siteMetaCache;
}
function decryptPageMeta(pageMeta) {
    try {
        return JSON.parse(CryptoJS.AES.decrypt(pageMeta.encryptedData, CryptoJS.enc.Utf8.parse(aesKey), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return {};
    }
}
async function getPageMetaAsync(forced, pathnameIn) {
    const targetPathname = pathnameIn || window.location.pathname;
    let pageMeta = {};
    let pageMetaFound = false;
    try {
        // 优先从 head 的 meta 获取。
        if (targetPathname === window.location.pathname && !forced) {
            const metaContent = $('meta[name=h2l-embedded-meta]')?.attr('content');
            pageMeta = JSON.parse(decodeURIComponent(metaContent));
            if (typeof pageMeta.encryptedData !== 'undefined' && pageMeta.encryptedData !== null)
                pageMeta = decryptPageMeta(pageMeta);
            pageMetaFound = true;
            smLogDebug('在 head 中获取到嵌入的页面元数据：', pageMeta);
            return pageMeta;
        }
    } catch (error) {
        smLogWarn('获取嵌入的页面元数据失败：', error);
    }
    if (!pageMetaFound) {
        const siteMeta = await getSiteMetaAsync(forced);
        if ($.isEmptyObject(siteMeta)) {
            smLogWarn('站点元数据空白，无法获取页面元数据：', siteMeta);
            return siteMeta;
        }
        const pagesMeta = siteMeta.pages;
        const allMetaLength = pagesMeta.length;
        for (let i = 0; i < allMetaLength; i++) {
            let item = pagesMeta[i];
            // 举例：比较 neighbors/index.html 与 /neighbors/，应该能够对应上。
            // 此时 targetPathname 要么以 / 结尾，要么以 .html 结尾。
            // 如果数据是加密的。
            if (typeof item.encryptedData !== 'undefined' && item.encryptedData !== null)
                item = decryptPageMeta(item);
            const decodedPathname = decodeURI(targetPathname);
            if (item.path === removeLangPrefix(decodedPathname).slice(1) || item.path === removeLangPrefix(decodedPathname).slice(1) + 'index.html') {
                pageMeta = item;
                pageMetaFound = true;
                smLogDebug('在站点元数据中获取到页面元数据：', pageMeta);
                return pageMeta;
            }
        }
    }
    if (!pageMetaFound) {
        smLogWarn('未找到页面元数据。');
        return pageMeta; // 没找到的空值。
    }
}
async function checkPageRegionBlockAsync(forced) {
    // 调试模式下可以跳过区域检查。其实可以不检查 debugOn，因为 smDebug 不为空就已经代表 debugOn 了。
    if (debugOn && SmDebug.vars && SmDebug.vars.skipRegionCheck) {
        smLogInfo('跳过区域检查。');
        return 'NOT_BLOCKED';
    }
    const curMeta = await getPageMetaAsync(forced);
    if ($.isEmptyObject(curMeta))
        return 'UNKNOWN';
    // 检查用户地区是否在黑名单内。
    if ($.isArray(curMeta.regionBlacklist) && curMeta.regionBlacklist.length > 0) {
        // API 更换为 Cloudflare Workers 实现。有时可能无法拿到 city。
        // 没有“ip”的话是 worker 挂了。
        if (userRegionTextCache === '' || !userRegionTextCache.toLowerCase().includes('"ip"') || forced) {
            const loadingIndex = smUi.showLoading();
            const getPromise = smGetAsync({
                baseUrl: 'https://ip.yinhe.dev',
                entry: '/',
                cache: false, // 不要从缓存读取。
                timeout: 5000
            });
            getPromise.finally(() => {
                smUi.closeLayer(loadingIndex);
            });
            const res = await getPromise;
            if (typeof res === 'undefined' || res === null) {
                smLogError('区域为空：', res);
                return 'UNKNOWN';
            }
            userRegionTextCache = JSON.stringify(res);
            sessionStorage.setItem('userRegionTextCache', userRegionTextCache);
        }
        if (!userRegionTextCache.toLowerCase().includes('"ip"'))
            return 'UNKNOWN';
        const curMetaRegionBlacklistLength = curMeta.regionBlacklist.length;
        for (let i = 0; i < curMetaRegionBlacklistLength; i++) {
            const region = curMeta.regionBlacklist[i];
            if (userRegionTextCache.toLowerCase().includes(region.toLowerCase()))
                return 'BLOCKED';
        }
        return 'NOT_BLOCKED';
    }
    else {
        return 'NOT_BLOCKED';
    }
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
function adjustVConsoleSwitchPosition(reset) {
    if ($.isEmptyObject(vConsole))
        return;
    const switchWidth = 93;
    const switchHeight = 31;
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const switchX = Number(localStorage.getItem('vConsole_switch_x'));
    const switchY = Number(localStorage.getItem('vConsole_switch_y'));
    // 桌面端定钉死在左下角，移动端判断超出屏幕就移回左下角。
    if ((switchX === 0 && switchY === 20) || (switchWidth + switchX > windowWidth) || (switchHeight + switchY > windowHeight) || !isMobile() || reset)
        vConsole.setSwitchPosition(windowWidth - (switchWidth + 20), 20);
}
// 页面加载后再执行的操作：
function afterPageReady() {
    // logo-title
    if (window.location.hostname !== 'his2nd.life')
        $('.logo-title').text('她的备胎') // 非线上版本标识。
    if (typeof converter !== 'undefined') {
        // 将所有 zh-CN 标签转为 zh-HK/TW 标签。
        const HTMLConvertHandler = OpenCC.HTMLConverter(converter, document.documentElement, 'zh-CN', `zh-${getSmSettings().chineseConversion}`);
        HTMLConvertHandler.convert();
    }
    // 为繁体中文下输入框添加转换提示。
    if (typeof converter !== 'undefined')
        $('.search-input').attr('placeholder', globalSmI18n.searchInputReverseConversionPlaceholder());
    // 监听搜索框输入事件，根据条件开启调试。需要在页面加载后监听，因为 site-mod.js 在头部注入，执行时还没有搜索框。
    $('.search-input').on('input', function () {
        const val = $(this).val();
        if (val === 'debugon' && !debugOn) {
            let smData = getSmData();
            smData.debug = true;
            setSmData(smData);
            window.location.reload();
        }
        else if (val === 'debugoff' && debugOn) {
            let smData = getSmData();
            smData.debug = false;
            setSmData(smData);
            window.location.reload();
        } else if (typeof reverseConverter !== 'undefined' && /^\/{2}.+\/{2}$/.test(val)) {
            $(this).val(reverseConverter(val.slice(2, -2)));
            const event = new Event('input');
            this.dispatchEvent(event);
        }
    });
    /* PC 端 vConsole 默认在右下角，挡元素。 */
    $(window).resize(() => {
        adjustVConsoleSwitchPosition();
    });
    adjustVConsoleSwitchPosition();
    // 监听 Redefine 的 .article-content-container 大小变化动画结束事件，否则文章有 TOC 时，TOC 展开会挤压图片瀑布流，布局不正常。
    $('.article-content-container').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        $('.image-masonry-script').each(function () {
            const masonryId = this.id.replace('image-masonry-script-', '');
            window[`macy${masonryId}`].recalculate(true);
        });
    });
    // 自己加载 twikoo，传入语言信息。
    if ($('.twikoo-container').length > 0) {
        let lang = siteLang;
        if (lang === 'zh-CN') {
            const chineseConversion = getSmSettings().chineseConversion;
            if (chineseConversion === 'HK')
                lang = 'zh-HK';
            else if (chineseConversion == 'TW')
                lang = 'zh-TW';
        }
        twikoo.init({
            envId: 'https://twikoo.his2nd.life', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
            el: '#twikoo-comment', // 容器元素
            // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
            // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
            lang: lang // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
        });
    }
    // 读取设置，决定是否隐藏 AI 生成的摘要。
    if (!getSmSettings().showAiGeneratedExcerpt)
        $('.ai-generated-excerpt').hide();
    // 获取全站访问计数。
    smGetAsync({
        baseUrl: counterUrl,
        entry: '/TOTAL.json',
        cache: false, // 不要从缓存读取。
        timeout: 8000
    }).then((res) => {
        $('#busuanzi_value_site_pv').text(res.count);
    }).catch((error) => {
        smLogError('获取全站访问计数出错：', error);
        $('#busuanzi_value_site_pv').text('-');
    });
    let pvPathname = window.location.pathname;
    if (pvPathname.endsWith('/') && pvPathname !== '/')
        pvPathname = pvPathname.slice(0, -1); // GoatCounter 服务端计数时会自动去除末尾的 /，所以查询时也要去除。
    // 获取当前页面访问计数。
    smGetAsync({
        baseUrl: counterUrl,
        entry: `/${encodeURIComponent(pvPathname)}.json`,
        cache: false, // 不要从缓存读取。
        timeout: 8000
    }).then((res) => {
        $('#busuanzi_value_page_pv').text(res.count);
    }).catch((error) => {
        smLogError('获取当前页面访问计数出错：', error);
        $('#busuanzi_value_page_pv').text('-');
    });
    // 修复移动端网易云音乐外链。
    if (isMobile()) {
        let iframes = $('iframe');
        const iframesLength = iframes.length;
        for (let i = 0; i < iframesLength; i++) {
            let frm = iframes[i];
            if (frm.src.includes('music.163.com/'))
                frm.src = frm.src.replace('music.163.com/', 'music.163.com/m/');
        }
    }
    if (removeLangPrefix(window.location.pathname) === '/fediverse/') {
        if (typeof mastodonTimeline === 'undefined') {
            const instanceUrl = 'https://m.cmx.im';
            let locale = siteLang;
            if (locale === 'en')
                locale = 'en-US';
            mastodonTimeline = new MastodonTimeline.Init({
                mtContainerId: 'mt-container',
                instanceUrl: instanceUrl,
                timelineType: 'profile',
                userId: '107989258291762102',
                profileName: '@Hollis',
                hashtagName: '',
                spinnerClass: 'mt-loading-spinner',
                defaultTheme: getThemeColorScheme(),
                maxNbPostFetch: '20',
                maxNbPostShow: '20',
                dateLocale: locale,
                dateOptions: {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                },
                hideUnlisted: false,
                hideReblog: false,
                hideReplies: false,
                hidePinnedPosts: false,
                hideUserAccount: false,
                txtMaxLines: '',
                btnShowMore: escapeHtml(globalSmI18n.timelineButtonShowMore()),
                btnShowLess: escapeHtml(globalSmI18n.timelineButtonShowLess()),
                markdownBlockquote: false,
                hideEmojos: false,
                btnShowContent: escapeHtml(globalSmI18n.timelineButtonShowContent()),
                hideVideoPreview: false,
                btnPlayVideoTxt: escapeHtml(globalSmI18n.timelineButtonPlayVideo()),
                hidePreviewLink: false,
                previewMaxLines: '',
                hideCounterBar: false,
                disableCarousel: false,
                carouselCloseTxt: escapeHtml(globalSmI18n.timelineButtonCloseCarousel()),
                carouselPrevTxt: escapeHtml(globalSmI18n.timelineButtonCarouselPrevItem()),
                carouselNextTxt: escapeHtml(globalSmI18n.timelineButtonCarouselNextItem()),
                btnSeeMore: escapeHtml(globalSmI18n.timelineLinkSeeMore(instanceUrl.split('/')[2])),
                btnReload: escapeHtml(globalSmI18n.timelineButtonRefresh()),
                insistSearchContainer: false,
                insistSearchContainerTime: '3000'
            });
        } else {
            mastodonTimeline.mtUpdate();
        }
    }
}
function afterUiReady() {
    let referrerKey = '';
    if (fixedReferrer !== '') {
        const referrerUrl = new URL(fixedReferrer);
        if (!referrerUrl.hostname.includes('his2nd.life') && !referrerUrl.hostname.includes('cs.nas.yinhe.dev'))
            referrerKey = referrerUrl.hostname;
        const hostnames = Object.keys(knownReferrerHostnames);
        const hostnamesLength = hostnames.length;
        for (let i = 0; i < hostnamesLength; i++) {
            const referrerHostname = hostnames[i];
            if (referrerUrl.hostname.includes(referrerHostname)) {
                referrerKey = knownReferrerHostnames[referrerHostname];
                break;
            }
        }
    }
    if (!getSmData().initialized)
        smUi.openInitPopup(referrerKey);
    else if (referrerKey !== '')
        smUi.openReferrerPopup(referrerKey);
    // 给 Redefine 夹个私货，新增一个按钮用来打开设置页面。
    $('.hidden-tools-list').append('<li id="button-show-settings-popup" class="right-bottom-tools tool-sm-settings flex justify-center items-center"><i class="fa-solid fa-wrench"></i></li>');
    $('#button-show-settings-popup').click(() => {
        smUi.openSettingsPopup();
        return false; // 阻止默认动作。
    });
    getPageAvailableLangsAsync().then((langs) => {
        if (!$.isEmptyObject(langs)) {
            // 如果当前文章、页面另外语言可用，就添加切换按钮。
            $('.toggle-tools-list').after('<li id="button-switch-lang" class="right-bottom-tools tool-switch-lang flex justify-center items-center"><i class="fa-solid fa-language"></i></li>');
            $('#button-switch-lang').click(() => {
                smUi.openLangSwitchPopup(langs);
                return false; // 阻止默认动作。
            });
        }
    });
    getPageMetaAsync().then((meta) => {
        if (meta.layout !== 'post')
            return;
        // 添加分享按钮。
        $('.toggle-tools-list').after('<li id="button-share-on-fediverse" class="right-bottom-tools tool-share-on-fediverse flex justify-center items-center"><i class="fa-solid fa-share-nodes"></i></li>');
        $('#button-share-on-fediverse').click(() => {
            smUi.openFediverseSharingPopup();
            return false; // 阻止默认动作。
        });
        let commentTitle = $('.comment-area-title');
        if (commentTitle.length !== 0) {
            let commentTitleText = commentTitle.text();
            const switchInteractionSystem = () => {
                if (commentTitle.hasClass('on-webmentions')) {
                    commentTitle.contents()[0].nodeValue = commentTitleText;
                    $('#interaction-system-switch').text(globalSmI18n.interactionSwitchWebmentions());
                    $('.twikoo-container').show();
                    $('#smui-form-webmention-post').hide();
                    $('#webmentions').hide();
                    commentTitle.removeClass('on-webmentions');
                } else {
                    commentTitle.contents()[0].nodeValue = globalSmI18n.interactionSwitchWebmentions();
                    $('#interaction-system-switch').text(commentTitleText);
                    $('.twikoo-container').hide();
                    $('#smui-form-webmention-post').show();
                    $('#webmentions').show();
                    commentTitle.addClass('on-webmentions');
                }
            };
            commentTitle.append(`<a id="interaction-system-switch">${globalSmI18n.interactionSwitchWebmentions()}</a>`);
            $('#interaction-system-switch').click(() => {
                switchInteractionSystem();
                return false; // 阻止默认动作。
            });
            smUi.createWebmentionPostFormAsync($('#webmentions')).then(() => {
                // 静态页面中是评论，Webmentions 是动态添加的。如果设置了默认互动系统为 Webmentions，就直接切换。
                if (getSmSettings().defaultInteractionSystem === 'WEBMENTIONS')
                    switchInteractionSystem();
            });
        }
    });
    // 检查用户区域。
    checkPageRegionBlockAsync().then((res) => {
        if (res === 'BLOCKED')
            window.location.replace(`/${siteLang}/go-back-home/`);
        else if (res === 'NOT_BLOCKED')
            $('.main-content').show();
    });
}



// 脚本开始。


// 修正 pathname，以解决不带 .html 不显示评论，并且已保存了密码的文章也不能自动解密的问题。
const pathname = window.location.pathname;
const fixedPathname = fixPathname(pathname);
if (pathname !== fixedPathname)
    window.location.replace(window.location.origin + fixedPathname); // 跳转。
let smLogDebug = () => { };
const debugOn = getSmData().debug;
smLogDebug = (...params) => { if (debugOn) console.debug(new Date().toLocaleTimeString() + ' |', ...params); };
const smLog = (...params) => { console.log(new Date().toLocaleTimeString() + ' |', ...params); };
const smLogInfo = (...params) => { console.info(new Date().toLocaleTimeString() + ' |', ...params); };
const smLogWarn = (...params) => { console.warn(new Date().toLocaleTimeString() + ' |', ...params); };
const smLogError = (...params) => { console.error(new Date().toLocaleTimeString() + ' |', ...params); };
const fixedReferrer = fixReferrer();
// 未初始化时保存无效……
// const navigatorLang = navigator.language;
// if (!getSmData().initialized) {
//     let smSettings = getSmSettings();
//     if (navigatorLang === 'zh-HK' || navigatorLang === 'zh-TW')
//         smSettings.chineseConversion = navigatorLang.replace('zh-', '');
//     else
//         smSettings.chineseConversion = 'DISABLED';
//     setSmSettings(smSettings);
// }
let converter;
let reverseConverter;
if (siteLang === 'zh-CN') {
    let to = '';
    const chineseConversion = getSmSettings().chineseConversion;
    if (chineseConversion === 'HK')
        to = 'hk'
    else if (chineseConversion === 'TW')
        to = 'twp';
    if (to !== '') {
        const customDict = [
            ['“', '「'],
            ['”', '」'],
            ['‘', '『'],
            ['’', '』'],
        ];
        converter = OpenCC.ConverterFactory(
            OpenCC.Locale.from.cn,
            OpenCC.Locale.to[to].concat([customDict])
        );
        const reverseCustomDict = [
            ['「', '“'],
            ['」', '”'],
            ['『', '‘'],
            ['』', '’'],
        ];
        reverseConverter = OpenCC.ConverterFactory(
            OpenCC.Locale.from[to],
            OpenCC.Locale.to.cn.concat([reverseCustomDict])
        );
    }
}
const globalSmI18n = new SmI18n(siteLang, (string, i18nLang, context) => {
    if (typeof converter !== 'undefined')
        string = converter(string);
    return string;
});
// globalSmI18n.bindLang(siteLang);
// globalSmI18n.bindGlobalModifier((string, i18nLang, context) => {
//     if (typeof converter !== 'undefined')
//         string = converter(string);
//     return string;
// });
// 初始化 site-mod 数据，检测数据变更。
let smDataRawStr = localStorage.getItem('smData');
let smDataRawStrEmpty = true;
let smSettingsRaw = {};
if (smDataRawStr) {
    smDataRawStrEmpty = false;
    try {
        smSettingsRaw = JSON.parse(smDataRawStr).settings || {};
    } catch (error) {
        smSettingsRaw = {};
    }
}
setSmData(getSmData());
let smSettingsTmp = getSmSettings();
// 使用了 lodash 的 isEqual 。
if (!smDataRawStrEmpty && !_.isEqual(smSettingsTmp, smSettingsRaw))
    // Layui 此时还未加载，弹窗不可用。等到 Layui 加载，执行 afterUiReady 时，页面可能已经历刷新，就检测不到变化了。
    alert(globalSmI18n.smSettingsMigratedAlert());
smDataRawStr = null; // 防止误用，并且回收。
smDataRawStrEmpty = null;
smSettingsRaw = null;
smSettingsTmp = null;
let vConsole = {};
let SmDebug;
if (debugOn) {
    vConsole = new window.VConsole();
    SmDebug = class {
        static get varsTemplate() {
            return {
                skipRegionCheck: false
            };
        }
        static _vars = this.varsTemplate;
        static get vars() {
            return this._vars;
        }
        static async decryptSiteMetaAsync(forced) {
            let decryptedSiteMeta = await getSiteMetaAsync(forced);
            if ($.isEmptyObject(decryptedSiteMeta)) {
                smLogWarn('站点元数据空白，无法解密：', decryptedSiteMeta);
                return decryptedSiteMeta;
            }
            decryptedSiteMeta.pages = decryptedSiteMeta.pages.map((page) => {
                if (typeof page.encryptedData !== 'undefined' && page.encryptedData !== null)
                    page = decryptPageMeta(page);
                return page;
            });
            return decryptedSiteMeta;
        }
        static async getHiddenPagesAsync(forced) {
            let hiddenPages = [];
            let decryptedSiteMeta = await this.decryptSiteMetaAsync(forced);
            if ($.isEmptyObject(decryptedSiteMeta)) {
                smLogWarn('解密后的站点元数据空白，无法获取隐藏页面：', decryptedSiteMeta);
                return [];
            }
            const decryptedSiteMetaPagesLength = decryptedSiteMeta.pages.length;
            for (let i = 0; i < decryptedSiteMetaPagesLength; i++) {
                const page = decryptedSiteMeta.pages[i];
                if (page.hidden)
                    hiddenPages.push(page);
            }
            return hiddenPages;
        }
        static checkVars(vars) {
            if (typeof vars === 'undefined' || vars === null)
                return false;
            if (vars.skipRegionCheck === true || vars.skipRegionCheck === false)
                return true;
            else
                return false;
        }
        static checkVarsInStorage() {
            return this.checkVars(getSmData().debugVars);
        }
        static loadVars() {
            let vars = getSmData().debugVars;
            if (!this.checkVars(vars)) {
                smLogWarn('localStorage 中的 debugVars 无效，将重置：', vars);
                this.resetDebugVars();
                // vars = getSmData().debugVars; 不需要。
                return;
            }
            this._vars = vars;
        }
        static setDebugVars(vars) {
            if (this.checkVars(vars)) {
                this._vars = vars;
                const smData = getSmData();
                smData.debugVars = vars;
                setSmData(smData);
            }
            else {
                smLogError('传入的 debugVars 无效，无法设置：', vars);
            }
        }
        static resetDebugVars() {
            // 深拷贝一份，不然 varsTemplate 在先调用 resetDebugVars 再调用 setDebugVar（setDebugVars）后会被改。
            // this.setDebugVars(JSON.parse(JSON.stringify(this.varsTemplate)));
            this.setDebugVars(this.varsTemplate);
        }
        static setDebugVar(key, value) {
            // let tmpVars = this.vars;
            let tmpVars = JSON.parse(JSON.stringify(this.vars));
            tmpVars[key] = value;
            this.setDebugVars(tmpVars);
        }
    };
    SmDebug.loadVars();
}
window.goatcounter = {
    no_onload: !isTrackingAvailable(),
    referrer: fixedReferrer
};
// 初始化站点元数据。
let siteMetaCache = {};
try {
    siteMetaCache = JSON.parse(sessionStorage.getItem('siteMetaCache')) || {};
} catch (error) {
    siteMetaCache = {};
}
let userRegionTextCache = sessionStorage.getItem('userRegionTextCache') || '';
// let themeColorScheme = getThemeColorScheme();
let themeColorScheme = ''; // 初值设为空，这样首次即能触发 newThemeColorScheme !== themeColorScheme。
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
        if (removeLangPrefix(window.location.pathname) === '/fediverse/' && typeof mastodonTimeline !== 'undefined')
            mastodonTimeline.mtColorTheme(newThemeColorScheme);
        if (!$.isEmptyObject(vConsole))
            vConsole.setOption('theme', newThemeColorScheme);
    }
    themeColorScheme = newThemeColorScheme;
}, 1000);
// 监听页面加载完成事件。
$(document).ready(() => {
    afterPageReady();
    layui.use(() => {
        const layer = layui.layer;
        const form = layui.form;
        window.smUi = {
            closeLayer: (layerIndex) => {
                layer.close(layerIndex);
            },
            closeLastLayer: () => {
                layer.closeLast();
            },
            closeAllLayers: () => {
                layer.closeAll();
            },
            showLoading: () => {
                return layer.load(0, { shade: [1, '#202124'], scrollbar: false });
            },
            openReferrerPopup: (referrerKey) => {
                layer.msg(globalSmI18n.referrerPopContent(referrerKey), { icon: 6 });
            },
            openInitPopup: (referrerKey) => {
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(globalSmI18n.initPopTitle()),
                    content: `
                    <div class="${globalSmI18n.langStyleClass()} smui-container smui-container-init-popup">
                        <div class="smui-content">
                          ${globalSmI18n.initPopContentHtml(minimumSupportedBrowserVersions, referrerKey)}
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-left">
                            <button class="smui-button-enter-settings layui-btn layui-btn-primary layui-border-blue">${escapeHtml(globalSmI18n.initPopButtonEnterSettings())}</button>
                          </div>
                          <div class="smui-func-right">
                            <button class="smui-button-complete-initialization layui-btn">${escapeHtml(globalSmI18n.initPopButtonOk())}</button>
                          </div>
                        </div>
                    </div>
                    `,
                    area: ['350px', 'auto'],
                    closeBtn: 0,
                    shadeClose: false,
                    resize: false,
                    scrollbar: false,
                    moveEnd: () => {
                        layer.closeAll('tips'); // 移动此弹窗时应该关闭所有 tips。
                    },
                    success: (layero, index, that) => {
                        // 得考虑有多个同样的弹窗弹出的情况，按钮写 id 不合适。
                        $(layero).find('.smui-button-complete-initialization').click(() => {
                            let smData = getSmData(); // 获取实时的。
                            smData.initialized = true;
                            setSmData(smData);
                            // 标记初始化完成后，如果跟踪可用，立即计数一次。
                            if (isTrackingAvailable())
                                window.goatcounter.count();
                            layer.close(index);
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-enter-settings').click(() => {
                            smUi.openSettingsPopup();
                            return false; // 阻止默认动作。
                        });
                    }
                });
                if (!$('.smui-container-init-popup').is(':visible'))
                    if (confirm(globalSmI18n.initPopConfirmTurnOffAntiadExtension()))
                        window.location.reload();
                return li;
            },
            openSettingsPopup: () => {
                const nameBindings = {
                    layFilter: 'sm-settings',
                    dataAnalytics: 'sm-setting-data-analytics',
                    aiGeneratedExcerpt: 'sm-setting-ai-generated-excerpt',
                    chineseConversion: 'sm-setting-chinese-conversion',
                    defaultInteractionSystem: 'sm-setting-default-interaction-system'
                };
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(globalSmI18n.settPopTitle()),
                    content: `
                    <div class="${globalSmI18n.langStyleClass()} smui-container smui-container-settings">
                        <div class="layui-form" lay-filter="${nameBindings.layFilter}">
                          <div class="layui-form-item">
                            <label class="smui-form-label-${nameBindings.dataAnalytics} layui-form-label">${escapeHtml(globalSmI18n.settPopLableDataAnalytics())}
                              <i class="layui-icon layui-icon-question"></i>
                            </label>
                            <div class="smui-input-block-${nameBindings.dataAnalytics} layui-input-block">
                              <input type="checkbox" name="${nameBindings.dataAnalytics}" lay-skin="switch" title="${escapeHtml(globalSmI18n.settPopSwitchDataAnalytics())}">
                            </div>
                          </div>
                          <div class="layui-form-item">
                            <label class="smui-form-label-${nameBindings.aiGeneratedExcerpt} layui-form-label">${escapeHtml(globalSmI18n.settPopLableAiGeneratedExcerpt())}
                              <i class="layui-icon layui-icon-question"></i>
                            </label>
                            <div class="smui-input-block-${nameBindings.aiGeneratedExcerpt} layui-input-block">
                              <input type="checkbox" name="${nameBindings.aiGeneratedExcerpt}" lay-skin="switch" title="${escapeHtml(globalSmI18n.settPopSwitchAiGeneratedExcerpt())}">
                            </div>
                          </div>
                          <div class="layui-form-item smui-form-item-${nameBindings.chineseConversion}">
                            <label class="smui-form-label-${nameBindings.chineseConversion} layui-form-label">${escapeHtml(globalSmI18n.settPopLableChineseConversion())}
                              <i class="layui-icon layui-icon-question"></i>
                            </label>
                            <div class="smui-input-block-${nameBindings.chineseConversion} layui-input-block">
                                <select name="${nameBindings.chineseConversion}">
                                    <option value="DISABLED">${escapeHtml(globalSmI18n.settPopSelectOptionChineseConversion('DISABLED'))}</option>
                                    <option value="HK">${escapeHtml(globalSmI18n.settPopSelectOptionChineseConversion('HK'))}</option>
                                    <option value="TW">${escapeHtml(globalSmI18n.settPopSelectOptionChineseConversion('TW'))}</option>
                                </select>
                            </div>
                          </div>
                          <div class="layui-form-item">
                            <label class="smui-form-label-${nameBindings.defaultInteractionSystem} layui-form-label">${escapeHtml(globalSmI18n.settPopLableDefaultInteractionSystem())}</label>
                            <div class="smui-input-block-${nameBindings.defaultInteractionSystem} layui-input-block">
                                <select name="${nameBindings.defaultInteractionSystem}">
                                    <option value="COMMENTS">${escapeHtml(globalSmI18n.settPopSelectOptionDefaultInteractionSystem('COMMENTS'))}</option>
                                    <option value="WEBMENTIONS">${escapeHtml(globalSmI18n.settPopSelectOptionDefaultInteractionSystem('WEBMENTIONS'))}</option>
                                </select>
                            </div>
                          </div>
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-left">
                            <button class="smui-button-clear-local-storage layui-btn layui-btn-primary layui-border-red">${escapeHtml(globalSmI18n.settPopButtonClearLocalStorage())}</button>
                          </div>
                          <div class="smui-func-right">
                            <button class="smui-button-save-sm-settings layui-btn">${escapeHtml(globalSmI18n.settPopButtonSave())}</button>
                          </div>
                        </div>
                    </div>
                    `,
                    area: ['350px', 'auto'],
                    closeBtn: 1,
                    shadeClose: true,
                    resize: false,
                    scrollbar: false,
                    moveEnd: () => {
                        layer.closeAll('tips'); // 移动此弹窗时应该关闭所有 tips。
                    },
                    success: (layero, index, that) => {
                        const settingsRead = getSmSettings();
                        // doNotTrack 和“数据分析”是反的。
                        if (!settingsRead.doNotTrack)
                            $(layero).find(`input[name="${nameBindings.dataAnalytics}"]`).attr('checked', '');
                        if (settingsRead.showAiGeneratedExcerpt)
                            $(layero).find(`input[name="${nameBindings.aiGeneratedExcerpt}"]`).attr('checked', '');
                        $(layero).find(`select[name="${nameBindings.chineseConversion}"] option[value="${settingsRead.chineseConversion}"]`).attr('selected', '');
                        $(layero).find(`select[name="${nameBindings.defaultInteractionSystem}"] option[value="${settingsRead.defaultInteractionSystem}"]`).attr('selected', '');
                        // 动态生成的控件需要调用 render 渲染。它实际上是根据原生组件生成了一个美化的。设置好值后再渲染。
                        $(layero).find(`.smui-form-label-${nameBindings.dataAnalytics}`).click(function (e) {
                            layer.tips(
                                globalSmI18n.settPopTipDataAnalyticsHtml(isTrackingAvailable(true)), // 不应转义，这里写的本来就该是 html。
                                // e.target,
                                this,
                                {
                                    tips: 1, // 向上弹。
                                    time: 0, // 文字很长，取消计时关闭。
                                    shade: 0.3, // 必须大于 0 才能点击遮罩关闭。
                                    shadeClose: true
                                }
                            );
                            return false; // 阻止默认动作。
                        });
                        $(layero).find(`.smui-form-label-${nameBindings.aiGeneratedExcerpt}`).click(function (e) {
                            layer.tips(
                                globalSmI18n.settPopTipAiGeneratedExcerptHtml(), // 不应转义，这里写的本来就该是 html。
                                // e.target,
                                this,
                                {
                                    tips: 1, // 向上弹。
                                    time: 0, // 文字很长，取消计时关闭。
                                    shade: 0.3, // 必须大于 0 才能点击遮罩关闭。
                                    shadeClose: true
                                }
                            );
                            return false; // 阻止默认动作。
                        });
                        $(layero).find(`.smui-form-label-${nameBindings.chineseConversion}`).click(function (e) {
                            layer.tips(
                                globalSmI18n.settPopTipChineseConversionHtml(), // 不应转义，这里写的本来就该是 html。
                                // e.target,
                                this,
                                {
                                    tips: 1, // 向上弹。
                                    time: 0, // 文字很长，取消计时关闭。
                                    shade: 0.3, // 必须大于 0 才能点击遮罩关闭。
                                    shadeClose: true
                                }
                            );
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-save-sm-settings').click(() => {
                            form.submit(nameBindings.layFilter, (data) => {
                                const userOptions = data.field;
                                let settingsToWrite = getSmSettings(); // 获取实时的。
                                // doNotTrack 和“数据分析”是反的。
                                settingsToWrite.doNotTrack = userOptions[nameBindings.dataAnalytics] === 'on' ? false : true;
                                settingsToWrite.showAiGeneratedExcerpt = userOptions[nameBindings.aiGeneratedExcerpt] === 'on' ? true : false;
                                settingsToWrite.chineseConversion = userOptions[nameBindings.chineseConversion];
                                settingsToWrite.defaultInteractionSystem = userOptions[nameBindings.defaultInteractionSystem];
                                setSmSettings(settingsToWrite);
                                layer.close(index);
                                window.location.reload();
                            });
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-clear-local-storage').click(() => {
                            if (confirm(globalSmI18n.settPopConfirmStorageClear())) {
                                localStorage.clear();
                                window.location.reload();
                            }
                            return false; // 阻止默认动作。
                        });
                        form.render();
                    }
                });
                return li;
            },
            openLangSwitchPopup: (langsOrForced) => {
                const nameBindings = {
                    layFilter: 'lang-switch',
                    targetLang: 'lang-switch-target-lang'
                };
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(globalSmI18n.langSwitchPopTitle()),
                    content: `
                    <div class="${globalSmI18n.langStyleClass()} smui-container smui-container-lang-switch">
                        <div class="layui-form" lay-filter="${nameBindings.layFilter}">
                            <div class="layui-form-item">
                                <label class="layui-form-label">${escapeHtml(globalSmI18n.langSwitchPopLableAvailableLangs())}</label>
                                <div class="smui-input-block-${nameBindings.targetLang} layui-input-block">
                                    <select name="${nameBindings.targetLang}">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-left">
                            <button class="smui-button-set-chinese-conversion layui-btn layui-btn-primary layui-border-blue">${escapeHtml(globalSmI18n.langSwitchPopButtonSetChineseConversion())}</button>
                          </div>
                          <div class="smui-func-right">
                            <button class="smui-button-switch-language layui-btn">${escapeHtml(globalSmI18n.langSwitchPopButtonSwitch())}</button>
                          </div>
                        </div>
                    </div>
                    `,
                    area: ['350px', 'auto'],
                    closeBtn: 1,
                    shadeClose: true,
                    resize: false,
                    scrollbar: false,
                    moveEnd: () => {
                        layer.closeAll('tips'); // 移动此弹窗时应该关闭所有 tips。
                    },
                    success: async (layero, index, that) => {
                        // langsOrForced 是 object 并且不为空，就用；否则现场获取可用语言，是否 forced 取决于 langsOrForced 的值是否是布尔 true。
                        langsOrForced = $.isPlainObject(langsOrForced) && !$.isEmptyObject(langsOrForced) ? langsOrForced : await getPageAvailableLangsAsync(langsOrForced === true ? true : false);
                        const availableLangs = Object.keys(langsOrForced);
                        const langsLength = availableLangs.length;
                        for (let i = 0; i < langsLength; i++) {
                            const langKey = availableLangs[i];
                            if (langKey === pageLang)
                                $(layero).find(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${langKey}" selected>${escapeHtml(globalSmI18n.langSwitchPopSelectOptionLang(langKey) + ' (' + langKey + ')')}</option>`);
                            else
                                $(layero).find(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${langKey}">${escapeHtml(globalSmI18n.langSwitchPopSelectOptionLang(langKey) + ' (' + langKey + ')')}</option>`);
                        }
                        if (availableLangs.length === 0) // 如果当前页面可用语言为空，则手动添加一个“当前语言”的项。
                            $(layero).find(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${pageLang}" selected>${escapeHtml(globalSmI18n.langSwitchPopSelectOptionLang(pageLang) + ' (' + pageLang + ')')}</option>`);
                        $(layero).find('.smui-button-switch-language').click(() => {
                            form.submit(nameBindings.layFilter, (data) => {
                                const targetLangKey = data.field[nameBindings.targetLang];
                                const targetPath = langsOrForced[targetLangKey];
                                if (targetLangKey === pageLang) { // 语言不变切个屁。
                                    layer.close(index);
                                    return;
                                }
                                window.location.pathname = encodeURI(targetPath);
                            });
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-set-chinese-conversion').click(() => {
                            smUi.openSettingsPopup();
                            return false; // 阻止默认动作。
                        });
                        form.render();
                    }
                });
                return li;
            },
            openFediverseSharingPopup: () => {
                const nameBindings = {
                    layFilter: 'fediverse-sharing',
                    software: 'fediverse-sharing-software',
                    instance: 'fediverse-sharing-instance'
                };
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(globalSmI18n.fediverseSharingPopTitle()),
                    content: `
                    <div class="${globalSmI18n.langStyleClass()} smui-container smui-container-fediverse-sharing">
                        <div class="layui-form" lay-filter="${nameBindings.layFilter}">
                            <div class="layui-form-item">
                                <label class="layui-form-label">${escapeHtml(globalSmI18n.fediverseSharingPopLableSoftware())}</label>
                                <div class="smui-input-block-${nameBindings.software} layui-input-block">
                                    <select name="${nameBindings.software}">
                                    </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">${escapeHtml(globalSmI18n.fediverseSharingPopLableInstance())}</label>
                                <div class="smui-input-block-${nameBindings.instance} layui-input-block">
                                    <input class="layui-input" type="text" name="${nameBindings.instance}" autocomplete="off" placeholder="${escapeHtml(globalSmI18n.fediverseSharingPopInputInstancePlaceholder())}" lay-verify="required|instance-domain" lay-reqtext="${escapeHtml(globalSmI18n.fediverseSharingPopInputInstanceReqText())}">
                                 </div>
                            </div>
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-right">
                            <button class="smui-button-share-on-fediverse layui-btn">${escapeHtml(globalSmI18n.fediverseSharingPopButtonShare())}</button>
                          </div>
                        </div>
                    </div>
                    `,
                    area: ['350px', 'auto'],
                    closeBtn: 1,
                    shadeClose: true,
                    resize: false,
                    scrollbar: false,
                    success: async (layero, index, that) => {
                        const pageMeta = await getPageMetaAsync();
                        const postTitle = pageMeta.title;
                        const postExcerpt = pageMeta.excerpt;
                        const postAigeneratedExcerpt = pageMeta.aigeneratedExcerpt;
                        const postUrl = pageMeta.permalink;
                        const postContent = extractPostContent();
                        let sharingText = `${globalSmI18n.fediverseSharingPopPostTitle()}${postTitle}\n\n${globalSmI18n.fediverseSharingPopPostExcerpt()}${postExcerpt}\n\n`;
                        if (postAigeneratedExcerpt)
                            sharingText += `${globalSmI18n.fediverseSharingPopPostAigeneratedExcerpt()}${postAigeneratedExcerpt}\n\n`;
                        if (postContent.trim() !== '')
                            sharingText += (postContent + '\n\n');
                        const limit = 75;
                        if (sharingText.length > limit) // 字数多了的话，m.cmx.im 会 502。
                            sharingText = sharingText.substring(0, limit - 1).trim() + '…\n\n';
                        sharingText += `${globalSmI18n.fediverseSharingPopPostUrl()}${postUrl}`;
                        const encodedPostTitle = encodeURIComponent(postTitle);
                        const encodedPostExcerpt = encodeURIComponent(postExcerpt);
                        const encodedPostUrl = encodeURIComponent(postUrl);
                        const encodedSharingText = encodeURIComponent(sharingText);
                        const getEndpoint = (software) => {
                            switch (software) {
                                case 'CALCKEY':
                                    return `share?text=${encodedSharingText}`;
                                case 'DIASPORA':
                                    return `bookmarklet?title=${encodedPostTitle}&notes=${encodedPostExcerpt}&url=${encodedPostUrl}`;
                                case 'FEDIBIRD':
                                    return `share?text=${encodedSharingText}`;
                                case 'FIREFISH':
                                    return `share?text=${encodedSharingText}`;
                                case 'FOUNDKEY':
                                    return `share?text=${encodedSharingText}`;
                                case 'FRIENDICA':
                                    return `compose?title=${encodedPostTitle}&body=${encodedPostExcerpt}%0A${encodedPostUrl}`;
                                case 'GLITCHCAFE':
                                    return `share?text=${encodedSharingText}`;
                                case 'GNU_SOCIAL':
                                    return `notice/new?status_textarea=${encodedSharingText}`;
                                case 'HOMETOWN':
                                    return `share?text=${encodedSharingText}`;
                                case 'HUBZILLA':
                                    return `rpost?title=${encodedPostTitle}&body=${encodedPostExcerpt}%0A${encodedPostUrl}`;
                                case 'KBIN':
                                    return `new/link?url=${encodedPostUrl}`;
                                case 'MASTODON':
                                    return `share?text=${encodedSharingText}`;
                                case 'MEISSKEY':
                                    return `share?text=${encodedSharingText}`;
                                case 'MICRO_DOT_BLOG':
                                    return `post?text=[${encodedPostTitle}](${encodedPostUrl})%0A%0A${encodedPostExcerpt}`;
                                case 'MISSKEY':
                                    return `share?text=${encodedSharingText}`;
                                default:
                                    return '';
                            }
                        };
                        let fediverseSharingPreferences = getSmData().fediverseSharingPreferences;
                        let preferredSoftware = fediverseSoftwares.includes(fediverseSharingPreferences.software) ? fediverseSharingPreferences.software : 'MASTODON';
                        const softwaresLength = fediverseSoftwares.length;
                        for (let i = 0; i < softwaresLength; i++) {
                            let selected = fediverseSoftwares[i] === preferredSoftware ? ' selected' : '';
                            $(layero).find(`select[name="${nameBindings.software}"]`).append(`<option value="${fediverseSoftwares[i]}"${selected}>${escapeHtml(globalSmI18n.brands(fediverseSoftwares[i]))}</option>`);
                        }
                        $(layero).find(`input[name="${nameBindings.instance}"]`).val(fediverseSharingPreferences.instance);
                        // 输入框响应 enter。
                        $(layero).find(`input[name="${nameBindings.instance}"]`).on('keydown', (e) => {
                            if (e.originalEvent.keyCode === 13)
                                $(layero).find('.smui-button-share-on-fediverse').click();
                        });
                        $(layero).find('.smui-button-share-on-fediverse').click(() => {
                            form.submit(nameBindings.layFilter, (data) => {
                                if (form.validate(`input[name="${nameBindings.instance}"]`)) {
                                    const software = data.field[nameBindings.software];
                                    let instance = data.field[nameBindings.instance];
                                    fediverseSharingPreferences.software = software;
                                    fediverseSharingPreferences.instance = instance;
                                    let smDataTmp = getSmData();
                                    smDataTmp.fediverseSharingPreferences = fediverseSharingPreferences;
                                    setSmData(smDataTmp);
                                    if (!instance.startsWith('https://') && !instance.startsWith('http://'))
                                        instance = 'https://' + instance;
                                    if (!instance.endsWith('/'))
                                        instance += '/';
                                    window.open(`${instance}${getEndpoint(software)}`, '_blank');
                                    // layer.close(index);
                                }
                            });
                            return false; // 阻止默认动作。
                        });
                        form.verify({
                            // Layui 有 URL 验证。创建这个完全是为了提示的 i18n。
                            'instance-domain': (value, elem) => {
                                let instance = value
                                if (!instance.startsWith('https://') && !instance.startsWith('http://'))
                                    instance = 'https://' + instance;
                                if (!instance.endsWith('/'))
                                    instance += '/';
                                // 自定义规则和自定义提示方式。
                                if (!isTextUrl(instance)) {
                                    layer.msg(globalSmI18n.fediverseSharingPopInputInstanceReqText(), { icon: 5, anim: 6 }); // 默认风格基本就是这个样式。
                                    return true; // 返回 true 即可阻止 form 默认的提示风格。
                                }
                            }
                        });
                        form.render();
                    }
                });
                return li;
            },
            createWebmentionPostFormAsync: async (elementAfter) => {
                if ($('#smui-form-webmention-post').length !== 0)
                    return;
                const nameBindings = {
                    layFilter: 'webmention-post',
                    webmentionPostArticleUrl: 'webmention-post-article-url'
                };
                const syndications = (await getPageMetaAsync()).syndications;
                let validatedSyndications = [];
                if (Array.isArray(syndications)) {
                    const syndicationsLength = syndications.length;
                    for (let syndicationIndex = 0; syndicationIndex < syndicationsLength; syndicationIndex++) {
                        const syndication = syndications[syndicationIndex].trim();
                        if (isTextUrl(syndication))
                            validatedSyndications.push(syndication);
                    }
                }
                $(elementAfter).before(
                    `
                    <div id="smui-form-webmention-post" class="${globalSmI18n.langStyleClass()} layui-form" lay-filter="${nameBindings.layFilter}">
                        <div class="smui-content">${globalSmI18n.webmentionPostFormTipHtml(validatedSyndications)}</div>
                        <div class="smui-wrapper-webmention-post">
                            <div class="smui-form-item-webmention-post layui-form-item">
                                <input class="smui-input-${nameBindings.webmentionPostArticleUrl} layui-input" name="${nameBindings.webmentionPostArticleUrl}" autocomplete="off" placeholder="${escapeHtml(globalSmI18n.webmentionPostFormInputArticleUrlPlaceholder())}" lay-verify="required|article-url" lay-reqtext="${escapeHtml(globalSmI18n.webmentionPostFormInputArticleUrlReqText())}">
                            </div>
                            <button type="button" class="smui-button-webmention-post-submit layui-btn" lay-filter="${nameBindings.layFilter}" lay-submit>${escapeHtml(globalSmI18n.webmentionPostFormButtonSubmitHtml())}</button>
                        </div>
                    </div>
                    `
                );
                $('#smui-form-webmention-post').hide();
                // 输入框响应 enter。
                $(`input[name="${nameBindings.webmentionPostArticleUrl}"]`).on('keydown', (e) => {
                    if (e.originalEvent.keyCode === 13)
                        $('.smui-button-webmention-post-submit').click();
                });
                form.verify({
                    // Layui 有 URL 验证。创建这个完全是为了提示的 i18n。
                    'article-url': (value, elem) => {
                        // 自定义规则和自定义提示方式。
                        if (!isTextUrl(value)) {
                            layer.msg(globalSmI18n.webmentionPostFormInputArticleUrlReqText(), { icon: 5, anim: 6 }); // 默认风格基本就是这个样式。
                            return true; // 返回 true 即可阻止 form 默认的提示风格。
                        }
                    }
                });
                form.on(`submit(${nameBindings.layFilter})`, (data) => {
                    const field = data.field;
                    $(`.smui-input-${nameBindings.webmentionPostArticleUrl}`).attr('disabled', '');
                    $('.smui-button-webmention-post-submit').attr('disabled', '');
                    $('.smui-button-webmention-post-submit').addClass('layui-btn-disabled');
                    $('.smui-button-webmention-post-submit').html(globalSmI18n.webmentionPostFormButtonSubmittingHtml());
                    smPostAsync({
                        baseUrl: 'https://webmention.io',
                        entry: '/his2nd.life/webmention',
                        timeout: 8000,
                        data: {
                            source: field[nameBindings.webmentionPostArticleUrl.trim()],
                            target: window.location.href.replace(window.location.hash, '')
                        }
                    }).then(() => {
                        layer.tips(globalSmI18n.webmentionPostFormTipSubmissionSucceeded(), $('.smui-button-webmention-post-submit'), { tips: 1 });
                    }).catch((error) => {
                        smLogError('发送 Webmention 失败：', error);
                        layer.tips(globalSmI18n.webmentionPostFormTipSubmissionFailed(), $('.smui-button-webmention-post-submit'), { tips: 1 });
                    }).finally(() => {
                        $('.smui-button-webmention-post-submit').html(globalSmI18n.webmentionPostFormButtonSubmitHtml());
                        $('.smui-button-webmention-post-submit').removeClass('layui-btn-disabled');
                        $('.smui-button-webmention-post-submit').removeAttr('disabled');
                        $(`.smui-input-${nameBindings.webmentionPostArticleUrl}`).removeAttr('disabled');
                    });
                    return false;
                });
                form.render();
            }
        };
        afterUiReady();
    });
});
// 监听 hexo-blog-encrypt 插件的解密事件，自动刷新页面以使部分内容正确显示。
// 某次调整脚本加载顺序（此脚本放在 body_end）后，监听不再时刻有效。手动解密的可以监听，自动解密的无法监听，因为此时此脚本还未加载。
// 然后我又把此脚本及其依赖提前了，放在 body_begin。
// 现在需要确保此脚本不会提前操作 body 里的元素。操作 body 里的元素的放在 afterPageReady 里。
$(window).on('hexo-blog-decrypt', (e) => {
    if (!window.location.hash.includes('on-decryption-reload')) {
        window.location.hash = 'on-decryption-reload';
        // 如果文章是新解密的，等待 hexo-blog-encrypt 插件写入 localStorage，这样下次再访问就能自动解密。
        setInterval(() => {
            if (localStorage.getItem(`hexo-blog-encrypt:#${window.location.pathname}`) !== null)
                window.location.reload();
        }, 1000);
    } else {
        window.location.hash = window.location.hash.replace('on-decryption-reload', '');
    }
});
