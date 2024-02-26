'use strict';

// 这里做一些对站点的整体修改。

// const siteUrl = 'https://his2nd.life';
const siteUrl = `${window.location.origin}/${getSiteLang()}`;

const counterUrl = 'https://gc.his2nd.life/counter';

const layuiThemeDarkCdn = 'https://unpkg.com/layui-theme-dark/dist/layui-theme-dark.css';

// 明晃晃写，毕竟这些措施都只能稍稍保护一下。

const geoApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJkMDA2OGM4ZDFiNTM2ZmMzMjc2NmRiNWIzOTQ4NjFkYiJ9.ahNbkKBX2KIaalcvL6eRUBJVWA9NEfIesXNIhliN5Kc';

const aesKey = '#$!2KENZ*#bLGy';

const smI18n = {
    notTranslated: function () {
        return 'NOT_TRANSLATED';
    },
    isEn: function () {
        return getSiteLang() === 'en' ? true : false;
    },
    isZh: function () {
        return getSiteLang() === 'zh-CN' ? true : false;
    },
    langStyleClass: function () {
        if (this.isZh())
            return 'smui-lang-zh';
        if (this.isEn())
            return 'smui-lang-en';
    },
    timelineLinkViewMore: function () {
        if (this.isEn()) {
            return 'View more twoots at m.cmx.im';
        }
        if (this.isZh()) {
            return '在 m.cmx.im 查看更多嘟文';
        }
        return this.notTranslated();
    },
    smSettingsMigratedAlert: function () {
        if (this.isEn()) {
            return 'Data migration and validation result in changes to settings. You can open the Settings window to adjust the new settings.';
        }
        if (this.isZh()) {
            return '数据迁移与校验导致设置变更。您可在设置窗口调整新的设置。';
        }
        return this.notTranslated();
    },
    initPopTitle: function () {
        if (this.isEn()) {
            return 'Notice to Visitors';
        }
        if (this.isZh()) {
            return '访客须知';
        }
        return this.notTranslated();
    },
    initPopContentHtml: function () {
        if (this.isEn()) {
            return `
            <p>Hello!</p>
            <p>This may be your first visit to this site. Most of the resources on this site are hosted abroad and may not load properly under the network environment in mainland China. If you visit this site in mainland China, it is recommended to use a proxy. (International visitors, however, may experience slow image loading since images are stored in mainland China.)</p>
            <p>In addition, before completing the initialization, if you want to adjust the settings such as Data Analytics, please click the button at the bottom left corner, otherwise the site will work with the default settings. After the initialization is completed, you can also find the settings in the lower right corner of the page.</p>
            <br>
            <p>Click “OK” to complete the initialization and permanently close this pop-up.</p>
            `;
        }
        if (this.isZh()) {
            return `
            <p>您好！</p>
            <p>这可能是您初次访问本站。本站的大部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。（国际访客则可能会遇到图片加载缓慢的问题，因为图片存储在中国大陆。）</p>
            <p>此外，在完成初始化前，如果您想要调整数据分析等设置，请点击左下角按钮，否则站点将以默认设置工作。初始化完成后，您也可以在页面右下角找到设置。</p>
            <br>
            <p>点击“了解”完成初始化并永久关闭本弹窗。</p>
            `;
        }
        return this.notTranslated();
    },
    initPopButtonEnterSettings: function () {
        if (this.isEn()) {
            return 'Settings';
        }
        if (this.isZh()) {
            return '设置';
        }
        return this.notTranslated();
    },
    initPopButtonOk: function () {
        if (this.isEn()) {
            return 'OK';
        }
        if (this.isZh()) {
            return '了解';
        }
        return this.notTranslated();
    },
    initPopConfirmTurnOffAntiAdExtension: function () {
        if (this.isEn()) {
            return 'Hello!\nThe initialization pop-up is detected as not being displayed. Are you using an ad-blocking plugin? This site is ad-free, but the Layui component used may be blocked by some imperfect ad-blocking rules. Please add a whitelist for this site, otherwise you may not be able to browse normally.\nAfter the pop-up loads and completes initialization, you will be informed by default and no longer be detected for ad-blocking.\n\nClick “OK” to refresh the page.';
        }
        if (this.isZh()) {
            return '您好！\n检测到初始化弹窗未显示。您是否使用了广告拦截插件？本站不含广告，但使用的 Layui 组件可能被某些不完善的广告拦截规则拦截。请您为本站添加白名单，否则可能无法正常浏览。\n待弹窗加载，完成初始化后，将默认您已知晓相关信息，不再检测广告拦截。\n\n点击“确定”刷新页面。';
        }
        return this.notTranslated();
    },
    settPopTitle: function () {
        if (this.isEn()) {
            return 'Settings';
        }
        if (this.isZh()) {
            return '设置';
        }
        return this.notTranslated();
    },
    settPopLableDataAnalytics: function () {
        if (this.isEn()) {
            return 'Data Analytics';
        }
        if (this.isZh()) {
            return '数据分析';
        }
        return this.notTranslated();
    },
    settPopTipDataAnalyticsHtml: function (trackingDetails) {
        if (this.isEn()) {
            const tip = 'The counting script used on this site may collect and analyze data such as region, User-Agent, refer(r)er, language, screen size, etc. In addition to the disablement here, “Do Not Track” requests or incomplete initialization of the site will also result in Data Analytics being disabled and visits not being logged. This setting does not affect the comment module, the few necessary region checks and potential third-party data analytics.<br>';
            const trackingResTxtPart1 = `Data Analytics is currenly ${trackingDetails.available ? 'enabled. ' : 'disabled, because '}`;
            let trackingResTxtPart2 = '';
            if (!trackingDetails.initializationPassed)
                trackingResTxtPart2 += 'the site is not initialized, ';
            if (!trackingDetails.broswerPassed)
                trackingResTxtPart2 += `${trackingResTxtPart2.length > 0 ? 'and ' : ''}the browser sends DNT requests, `;
            if (!trackingDetails.settingsPassed) {
                trackingResTxtPart2 = trackingResTxtPart2.replace('and the browser', 'the browser');
                trackingResTxtPart2 += `${trackingResTxtPart2.length > 0 ? 'and ' : ''}you prohibited it. `;
            }
            let trackingResTxtWhole = trackingResTxtPart1 + trackingResTxtPart2;
            trackingResTxtWhole = trackingResTxtWhole.slice(0, -2) + '.';
            return tip + trackingResTxtWhole;
        }
        if (this.isZh()) {
            const tip = '本站使用的计数脚本可能收集并分析区域、UA、来源、语言、屏幕大小等数据。除此处禁止外，浏览器请求不要跟踪或站点未完成初始化也将导致数据分析禁用，访问不被记录。此设置不影响评论模块、少数必要的区域检查及潜在的第三方数据分析。<br>';
            let trackingResTxt = `数据分析当前${trackingDetails.available ? '已启用。' : '已禁用，因为'}`;
            if (!trackingDetails.initializationPassed)
                trackingResTxt += '站点未初始化、';
            if (!trackingDetails.broswerPassed)
                trackingResTxt += '浏览器请求不要跟踪、';
            if (!trackingDetails.settingsPassed)
                trackingResTxt += '您禁止数据分析、';
            trackingResTxt = trackingResTxt.slice(0, -1) + '。';
            return tip + trackingResTxt;
        }
        return this.notTranslated();
    },
    settPopSwitchDataAnalytics: function () {
        if (this.isEn()) {
            return 'Allowed|Prohibited';
        }
        if (this.isZh()) {
            return '已允许|已禁止';
        }
        return this.notTranslated();
    },
    settPopButtonClearLocalStorage: function () {
        if (this.isEn()) {
            return 'Clear local storage';
        }
        if (this.isZh()) {
            return '清除本地存储';
        }
        return this.notTranslated();
    },
    settPopConfirmStorageClear: function () {
        if (this.isEn()) {
            return 'All settings will be lost and the site will need to be reinitialized, do you want to continue?';
        }
        if (this.isZh()) {
            return '所有设置都将丢失，站点将需要重新初始化，是否继续？';
        }
        return this.notTranslated();
    },
    settPopButtonSave: function () {
        if (this.isEn()) {
            return 'Save & refresh';
        }
        if (this.isZh()) {
            return '保存并刷新';
        }
        return this.notTranslated();
    },
    pageContentIconTitleSwitchLang: function () {
        if (this.isEn()) {
            return 'Switch language';
        }
        if (this.isZh()) {
            return '切换语言';
        }
        return this.notTranslated();
    },
    langSwitchPopTitle: function () {
        if (this.isEn()) {
            return 'Switch language';
        }
        if (this.isZh()) {
            return '切换语言';
        }
        return this.notTranslated();
    },
    langSwitchPopLableAvailableLangs: function () {
        if (this.isEn()) {
            return 'Available in';
        }
        if (this.isZh()) {
            return '可用语言：';
        }
        return this.notTranslated();
    },
    langSwitchPopButtonSwitch: function () {
        if (this.isEn()) {
            return 'Switch';
        }
        if (this.isZh()) {
            return '切换';
        }
        return this.notTranslated();
    }
};

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
        // return Promise.reject(e);
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
const smDataTemplates = {
    get latest() {
        return this.v4;
    },
    get v1() {
        return {
            templateVer: 1,
            settings: {},
            showInitialPopup: true
        };
    },
    migrateFromVoidToV1: function () {
        return smDataTemplates.v1;
    },
    get v2() {
        return {
            templateVer: 2,
            settings: {},
            showInitialPopup: true,
            debugLog: false
        };
    },
    migrateFromV1ToV2: function (v1) {
        let v2 = v1;
        // v2 新增了 debugLog 字段。
        v2.debugLog = false;
        v2.templateVer = 2;
        return v2;
    },
    get v3() {
        return {
            templateVer: 3,
            settings: {},
            showInitialPopup: true,
            debug: false
        };
    },
    migrateFromV2ToV3: function (v2) {
        let v3 = v2;
        // v3 将 debug 字段重命名为 debug。
        v3.debug = v3.debugLog;
        delete v3.debugLog;
        v3.templateVer = 3;
        return v3;
    },
    get v4() {
        return {
            templateVer: 4,
            settings: {
                doNotTrack: false
            },
            initialized: false,
            debug: false,
            debugVars: {}
        };
    },
    migrateFromV3ToV4: function (v3) {
        let v4 = v3;
        // v4 新增 debugVars、settings 的 doNotTrack，showInitialPopup 改为 initialized。
        v4.debugVars = {};
        v4.initialized = !v4.showInitialPopup;
        delete v4.showInitialPopup;
        v4.templateVer = 4;
        return v4;
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
    // ...
    return validSmData;
}
// 返回处理过的值。
function getSmData() {
    let newSmData = makeSmData();
    let smData = newSmData;
    try {
        // smData = JSON.parse(localStorage.getItem(`smData@${getSiteLang()}`)) || newSmData;
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
    // localStorage.setItem(`smData@${getSiteLang()}`, JSON.stringify(smData));
    localStorage.setItem('smData', JSON.stringify(smData));
}
function genRandomStr() {
    return Math.random().toString(36).slice(-8);
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
function fixPathname(pathnameIn) {
    let fixedPathname = pathnameIn;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}
function getSiteLang() {
    return window.location.pathname.split('/')[1];
}
function removeLangPrefix(str) {
    return str.replace(`/${getSiteLang()}`, '');
}
// 获取站点元数据，如果在 sesstionStorage 下已有元数据，就不再获取。
async function getSiteMetaAsync(forced) {
    if ($.isEmptyObject(siteMetaCache) || siteMetaCache.site.language !== getSiteLang() || forced) {
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
        // sessionStorage.setItem(`siteMetaCache@${getSiteLang()}`, JSON.stringify(siteMetaCache));
        sessionStorage.setItem('siteMetaCache', JSON.stringify(siteMetaCache));
        smLogDebug('已更新站点元数据缓存：', siteMetaCache);
    }
    return siteMetaCache;
}
function decryptPageMeta(pageMeta) {
    try {
        return JSON.parse(CryptoJS.AES.decrypt(pageMeta.encryptedData, aesKey).toString(CryptoJS.enc.Utf8));
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
            // 举例：比较 links/index.html 与 /links/，应该能够对应上。
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
async function getPageAvailableLangsAsync(forced) {
    const curMeta = await getPageMetaAsync(forced);
    if ($.isEmptyObject(curMeta) || !curMeta.langs)
        return {};
    return curMeta.langs;
}
async function checkPageRegionBlockAsync(forced) {
    // 调试模式下可以跳过区域检查。其实可以不检查 debugOn，因为 smDebug 不为空就已经代表 debugOn 了。
    if (debugOn && smDebug.vars && smDebug.vars.skipRegionCheck) {
        smLogInfo('跳过区域检查。');
        return 'NOT_BLOCKED';
    }
    const curMeta = await getPageMetaAsync(forced);
    if ($.isEmptyObject(curMeta))
        return 'UNKNOWN';
    // 检查用户地区是否在黑名单内。
    if ($.isArray(curMeta.regionBlacklist) && curMeta.regionBlacklist.length > 0) {
        if (userRegionTextCache === '' || forced) {
            const loadingIndex = smUi.showLoading();
            const getPromise = smGetAsync({
                baseUrl: 'https://www.douyacun.com',
                entry: '/api/openapi/geo/location',
                cache: false, // 不要从缓存读取。
                data: {
                    token: geoApiToken
                },
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
        const curMetaRegionBlacklistLength = curMeta.regionBlacklist.length;
        for (let i = 0; i < curMetaRegionBlacklistLength; i++) {
            const region = curMeta.regionBlacklist[i];
            if (userRegionTextCache.includes(region))
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
    // 修正 pathname，以解决不带 .html 不显示评论，并且已保存了密码的文章也不能自动解密的问题。
    const pathname = window.location.pathname;
    const fixedPathname = fixPathname(pathname);
    if (pathname !== fixedPathname) {
        window.location.replace(window.location.origin + fixedPathname); // 跳转。
        return; // 从 replace 到实际跳转有一段时间，没必要让代码继续执行，因此 return。
    }
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
    /* PC 端 vConsole 默认在右下角，挡元素。 */
    $(window).resize(() => {
        adjustVConsoleSwitchPosition();
    });
    // 监听 Redefine 的 .article-content-container 大小变化动画结束事件，否则文章有 TOC 时，TOC 展开会挤压图片瀑布流，布局不正常。
    $('.article-content-container').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        $('.image-masonry-script').each(function () {
            const masonryId = this.id.replace('image-masonry-script-', '');
            window[`macyAt${masonryId}`].recalculate(true);
        });
    });
    // 自己加载 twikoo，传入语言信息。
    if ($('.twikoo-container').length > 0) {
        twikoo.init({
            envId: 'https://twikoo.his2nd.life', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
            el: '#twikoo-comment', // 容器元素
            // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
            // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
            lang: getSiteLang(), // 用于手动设定评论区语言，支持的语言列表 https://github.com/twikoojs/twikoo/blob/main/src/client/utils/i18n/index.js
        });
    }
    adjustVConsoleSwitchPosition();
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
    if (removeLangPrefix(pathname) === '/timeline/') {
        // runtime-site-mod.js 加载 Mastodon 时间线，比较方便控制主题切换。
        if (!mastodonTimeline) {
            mastodonTimeline = new MastodonApi({
                container_body_id: 'mt-body',
                spinner_class: 'loading-spinner',
                default_theme: themeColorScheme,
                instance_url: 'https://m.cmx.im',
                timeline_type: 'profile',
                user_id: '107989258291762102',
                profile_name: '@Hollis',
                hashtag_name: '',
                toots_limit: '20',
                hide_unlisted: false,
                hide_reblog: false,
                hide_replies: false,
                hide_video_preview: false,
                hide_preview_link: false,
                hide_emojos: false,
                markdown_blockquote: false,
                hide_counter_bar: false,
                text_max_lines: '0',
                link_see_more: escapeHtml(smI18n.timelineLinkViewMore()) // 确实需要转义。
            });
        } else {
            mastodonTimeline.buildTimeline();
        }
    }
}
function afterUiReady() {
    if (!getSmData().initialized)
        smUi.openInitPopup();
    // 给 Redefine 夹个私货，新增一个按钮用来打开设置页面。
    $('.hidden-tools-list').append('<li id="button-show-settings-popup" class="right-bottom-tools tool-sm-settings flex justify-center items-center"><i class="fa-solid fa-wrench"></i></li>');
    $('#button-show-settings-popup').click(() => {
        smUi.openSettingsPopup();
        return false; // 阻止默认动作。
    });
    getPageAvailableLangsAsync().then((langs) => {
        if (!$.isEmptyObject(langs)) {
            // 如果当前文章、页面另外语言可用，就添加切换图标。
            $('.article-content-container, .page-template-container').append(`<div id="icon-switch-lang" title="${escapeHtml(smI18n.pageContentIconTitleSwitchLang())}"><i class="layui-icon layui-icon-tips"></i></div>`);
            $('#icon-switch-lang').click(() => smUi.openLangSwitchPopup(langs));
        }
    });
    // 检查用户区域。
    checkPageRegionBlockAsync().then((res) => {
        if (res === 'BLOCKED')
            window.location.replace(`/${getSiteLang()}/go-back-home/`);
        else if (res === 'NOT_BLOCKED')
            $('.main-content').show();
    });
}



// 脚本开始。



let smLogDebug = () => { };
const debugOn = getSmData().debug;
smLogDebug = (...params) => { if (debugOn) console.debug(new Date().toLocaleTimeString() + ' |', ...params); };
let smLog = (...params) => { console.log(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogInfo = (...params) => { console.info(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogWarn = (...params) => { console.warn(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogError = (...params) => { console.error(new Date().toLocaleTimeString() + ' |', ...params); };
// 初始化 site-mod 数据，检测数据变更。
(() => {
    // let smDataRawStr = localStorage.getItem(`smData@${getSiteLang()}`);
    const smDataRawStr = localStorage.getItem('smData');
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
    const smSettings = getSmSettings();
    // 使用了 lodash 的 isEqual 。
    if (!smDataRawStrEmpty && !_.isEqual(smSettings, smSettingsRaw))
        // Layui 此时还未加载，弹窗不可用。等到 Layui 加载，执行 afterUiReady 时，页面可能已经历刷新，就检测不到变化了。
        alert(smI18n.smSettingsMigratedAlert());
})();
let vConsole = {};
let smDebug = {};
if (debugOn) {
    vConsole = new window.VConsole();
    smDebug = {
        get varsTemplate() {
            return {
                skipRegionCheck: false
            };
        },
        get vars() {
            return this._vars;
        },
        _vars: Symbol('vars'),
        decryptSiteMetaAsync: async function (forced) {
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
        },
        getHiddenPagesAsync: async function (forced) {
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
        },
        checkVars: function (vars) {
            if (typeof vars === 'undefined' || vars === null)
                return false;
            if (vars.skipRegionCheck === true || vars.skipRegionCheck === false)
                return true;
            else
                return false;
        },
        checkVarsInStorage: function () {
            return this.checkVars(getSmData().debugVars);
        },
        loadVars: function () {
            const vars = getSmData().debugVars;
            if (this.checkVars(vars)) {
                this._vars = vars;
            }
            else {
                smLogWarn('localStorage 中的 debugVars 无效，将重置：', vars);
                this.resetDebugVars();
            }
        },
        setDebugVars: function (vars) {
            if (this.checkVars(vars)) {
                this._vars = vars;
                const smData = getSmData();
                smData.debugVars = vars;
                setSmData(smData);
            }
            else {
                smLogError('传入的 debugVars 无效，无法设置：', vars);
            }
        },
        resetDebugVars: function () {
            // 深拷贝一份，不然 varsTemplate 在先调用 resetDebugVars 再调用 setDebugVar（setDebugVars）后会被改。
            // this.setDebugVars(JSON.parse(JSON.stringify(this.varsTemplate)));
            this.setDebugVars(this.varsTemplate);
        },
        setDebugVar: function (key, value) {
            let tmpVars = this.vars;
            tmpVars[key] = value;
            this.setDebugVars(tmpVars);
        }
    };
    smDebug.loadVars();
}
window.goatcounter = {
    no_onload: !isTrackingAvailable()
};
// 初始化站点元数据。
let siteMetaCache = {};
try {
    // siteMetaCache = JSON.parse(sessionStorage.getItem(`siteMetaCache@${getSiteLang()}`)) || {};
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
        if (removeLangPrefix(window.location.pathname) === '/timeline/') {
            mastodonTimeline.DEFAULT_THEME = newThemeColorScheme;
            mastodonTimeline.setTheme();
        }
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
            // '您好！这可能是您初次访问本站。本站的大部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。点击“确定”永久关闭本弹窗。',
            openInitPopup: () => {
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(smI18n.initPopTitle()),
                    content: `
                    <div class="smui-container smui-init-popup-container ${smI18n.langStyleClass()}">
                        <div class="smui-content">
                          ${smI18n.initPopContentHtml()}
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-left">
                            <button class="smui-button-enter-settings layui-btn layui-btn-primary layui-border-blue">${escapeHtml(smI18n.initPopButtonEnterSettings())}</button>
                          </div>
                          <div class="smui-func-right">
                            <button class="smui-button-complete-initialization layui-btn">${escapeHtml(smI18n.initPopButtonOk())}</button>
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
                                goatcounter.count();
                            layer.close(index);
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-enter-settings').click(() => {
                            smUi.openSettingsPopup();
                            return false; // 阻止默认动作。
                        });
                    }
                });
                if (!$('.smui-init-popup-container').is(':visible'))
                    if (confirm(smI18n.initPopConfirmTurnOffAntiAdExtension()))
                        window.location.reload();
                return li;
            },
            openSettingsPopup: () => {
                const nameBindings = {
                    dataAnalytics: 'sm-setting-data-analytics'
                };
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(smI18n.settPopTitle()),
                    content: `
                    <div class="smui-container smui-settings-container ${smI18n.langStyleClass()}">
                        <div class="layui-form" lay-filter="sm-settings">
                          <div class="layui-form-item">
                            <label class="label-sm-setting-data-analytics layui-form-label">${escapeHtml(smI18n.settPopLableDataAnalytics())}
                              <i class="layui-icon layui-icon-question"></i>
                            </label>
                            <div class="block-sm-setting-data-analytics layui-input-block">
                              <input type="checkbox" name="${nameBindings.dataAnalytics}" lay-skin="switch" title="${escapeHtml(smI18n.settPopSwitchDataAnalytics())}">
                            </div>
                          </div>
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-left">
                            <button class="smui-button-clear-local-storage layui-btn layui-btn-primary layui-border-red">${escapeHtml(smI18n.settPopButtonClearLocalStorage())}</button>
                          </div>
                          <div class="smui-func-right">
                            <button class="smui-button-save-sm-settings layui-btn">${escapeHtml(smI18n.settPopButtonSave())}</button>
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
                            $(`input[name="${nameBindings.dataAnalytics}"]`).attr('checked', '');
                        // 动态生成的控件需要调用 render 渲染。它实际上是根据原生组件生成了一个美化的。设置好值后再渲染。
                        form.render();
                        $(layero).find('.label-sm-setting-data-analytics').click(function (e) {
                            layer.tips(
                                smI18n.settPopTipDataAnalyticsHtml(isTrackingAvailable(true)), // 不应转义，这里写的本来就该是 html。
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
                            form.submit('sm-settings', (data) => {
                                const userOptions = data.field;
                                let settingsToWrite = getSmSettings(); // 获取实时的。
                                // doNotTrack 和“数据分析”是反的。
                                settingsToWrite.doNotTrack = userOptions[nameBindings.dataAnalytics] === 'on' ? false : true;
                                setSmSettings(settingsToWrite);
                                layer.close(index);
                                window.location.reload();
                            });
                            return false; // 阻止默认动作。
                        });
                        $(layero).find('.smui-button-clear-local-storage').click(() => {
                            if (confirm(smI18n.settPopConfirmStorageClear())) {
                                localStorage.clear();
                                window.location.reload();
                            }
                            return false; // 阻止默认动作。
                        });
                    }
                });
                return li;
            },
            openLangSwitchPopup: (langsOrForced) => {
                const nameBindings = {
                    targetLang: 'lang-switch-target-lang'
                };
                const li = layer.open({
                    type: 1,
                    title: escapeHtml(smI18n.langSwitchPopTitle()),
                    content: `
                    <div class="smui-container smui-lang-switch-container ${smI18n.langStyleClass()}">
                        <div class="layui-form" lay-filter="lang-switch">
                            <div class="layui-form-item">
                                <label class="layui-form-label">${escapeHtml(smI18n.langSwitchPopLableAvailableLangs())}</label>
                                <div class="layui-input-block">
                                    <select name="${nameBindings.targetLang}">
                                    </select>
                                </div>
                            </div>  
                        </div>
                        <div class="smui-func smui-clearfix">
                          <hr>
                          <div class="smui-func-right">
                            <button class="smui-button-switch-language layui-btn">${escapeHtml(smI18n.langSwitchPopButtonSwitch())}</button>
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
                        const availableLangs = Object.getOwnPropertyNames(langsOrForced);
                        const langsLength = availableLangs.length;
                        for (let i = 0; i < langsLength; i++) {
                            const langKey = availableLangs[i];
                            if (langKey === getSiteLang())
                                $(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${langKey}" selected>${langKey}</option>`);
                            else
                                $(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${langKey}">${langKey}</option>`);
                        }
                        if (availableLangs.length === 0) { // 如果当前页面可用语言为空，则手动添加一个“当前语言”的项。
                            $(`select[name="${nameBindings.targetLang}"]`).append(`<option value="${getSiteLang()}" selected>${getSiteLang()}</option>`);
                        }
                        form.render();
                        $(layero).find('.smui-button-switch-language').click(() => {
                            form.submit('lang-switch', (data) => {
                                const targetLangKey = data.field[nameBindings.targetLang];
                                const targetPath = langsOrForced[targetLangKey];
                                if (targetLangKey === getSiteLang()) { // 语言不变切个屁。
                                    layer.close(index);
                                    return;
                                }
                                window.location.pathname = encodeURI(`/${targetLangKey}/${targetPath}`);
                            });
                            return false; // 阻止默认动作。
                        });
                    }
                });
                return li;
            }
        };
        afterUiReady();
    });
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
