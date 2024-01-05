'user strict';

// 这里做一些对站点的整体修改。

// const siteUrl = 'https://his2nd.life';
const siteUrl = `${window.location.origin}`;

const counterUrl = 'https://gc.his2nd.life/counter';

const layuiThemeDarkCdn = 'https://unpkg.com/layui-theme-dark/dist/layui-theme-dark.css';

// 明晃晃写，毕竟这些措施都只能稍稍保护一下。

const geoApiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJkMDA2OGM4ZDFiNTM2ZmMzMjc2NmRiNWIzOTQ4NjFkYiJ9.ahNbkKBX2KIaalcvL6eRUBJVWA9NEfIesXNIhliN5Kc';

const aesKey = '#$!2KENZ*#bLGy';

const leanCloudAppId = 'TjlywOgAHj9rcaw3nbUeV561-MdYXbMMI';
const leanCloudAppKey = 'I0J0aMw0p6O2gEv0WmeiJwsc';

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
    get v2() {
        return {
            templateVer: 2,
            settings: {},
            showInitialPopup: true,
            debugLog: false
        };
    },
    get v3() {
        return {
            templateVer: 3,
            settings: {},
            showInitialPopup: true,
            debug: false
        };
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
    }
};
function makeSmData() {
    // return JSON.parse(JSON.stringify(smDataV1));
    // return JSON.parse(JSON.stringify(smDataV2));
    // return JSON.parse(JSON.stringify(smDataV3));
    // return JSON.parse(JSON.stringify(smDataTemplates.latest));
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
function migrateSmDataFromNoneToV1(none) {
    smLogDebug('新建 smData v1。');
    // return JSON.parse(JSON.stringify(smDataTemplates.v1));
    return smDataTemplates.v1;
}
function migrateSmDataFromV1ToV2(v1) {
    // let tmp = JSON.parse(JSON.stringify(v1));
    smLogDebug('smData 迁移至 v2。');
    let tmp = v1;
    // v2 新增了 debugLog 字段。
    tmp.debugLog = false;
    tmp.templateVer = 2;
    return tmp;
}
function migrateSmDataFromV2ToV3(v2) {
    // let tmp = JSON.parse(JSON.stringify(v2));
    smLogDebug('smData 迁移至 v3。');
    let tmp = v2;
    // v3 将 debug 字段重命名为 debug。
    tmp.debug = tmp.debugLog;
    delete tmp.debugLog;
    tmp.templateVer = 3;
    return tmp;
}
function migrateSmDataFromV3ToV4(v3) {
    // let tmp = JSON.parse(JSON.stringify(v3));
    smLogDebug('smData 迁移至 v4。');
    let tmp = v3;
    // v4 新增 debugVars、settings 的 doNotTrack，showInitialPopup 改为 initialized。
    tmp.debugVars = {};
    tmp.initialized = !tmp.showInitialPopup;
    delete tmp.showInitialPopup;
    tmp.templateVer = 4;
    return tmp;
}
function migrateSmData(oldSmData) {
    smLogDebug('开始迁移 smData：', oldSmData);
    if (oldSmData.templateVer === null || typeof oldSmData.templateVer === 'undefined' || oldSmData.templateVer < 1)
        // 这种肯定是 localStorage 里的 smData 被修改过导致版本号连 1 都不是，就新生成一个 v1 的。
        oldSmData = migrateSmDataFromNoneToV1(oldSmData);
    if (oldSmData.templateVer < 2)
        oldSmData = migrateSmDataFromV1ToV2(oldSmData);
    if (oldSmData.templateVer < 3)
        oldSmData = migrateSmDataFromV2ToV3(oldSmData);
    if (oldSmData.templateVer < 4)
        oldSmData = migrateSmDataFromV3ToV4(oldSmData);
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
    validSmData.debugVars = invalidSmData.debugVars; // 不检查 debugVars，让 smDebug 自己检查。debugVars 的内容与 templateVer 无关。
    let invalidSettings = invalidSmData.settings;
    validSmData.settings.doNotTrack = invalidSettings.doNotTrack === true || invalidSettings.doNotTrack === 'true' ? true : false;
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
function getFixedPathname(pathnameIn) {
    const pathname = pathnameIn || window.location.pathname;
    let fixedPathname = pathname;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}
// 获取站点元数据，如果在 sesstionStorage 下已有元数据，就不再获取。
async function getSiteMetaAsync(forced) {
    if ($.isPlainObject(siteMetaCache) || forced) {
        let loadingIndex = smUi.showLoadingPopup();
        let getPromise = smGetAsync({
            entry: '/site-meta.json',
            cache: false, // 不要从缓存读取。
            timeout: 8000
        });
        getPromise.finally(() => {
            smUi.closeLayer(loadingIndex);
        });
        let res = await getPromise;
        if (typeof res === 'undefined' || res === null) {
            smLogError('站点元数据为空：', res);
            return {};
        }
        siteMetaCache = res;
        sessionStorage.setItem('siteMetaCache', JSON.stringify(siteMetaCache));
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
async function getCurMetaAsync(forced, pathnameIn) {
    const targetPathname = pathnameIn || getFixedPathname();
    let curMeta = {};
    let curMetaFound = false;
    try {
        // 优先从 head 的 meta 获取。
        if (getFixedPathname(targetPathname) === getFixedPathname() && !forced) {
            const metaContent = $('meta[name=h2l-embedded-meta]')?.attr('content');
            curMeta = decryptPageMeta(JSON.parse(decodeURIComponent(metaContent)));
            curMetaFound = true;
            smLogDebug('在 head 中获取到嵌入的页面元数据：', curMeta);
            return curMeta;
        }
    } catch (error) {
        smLogWarn('获取嵌入的页面元数据失败：', error);
    }
    finally {
        if (!curMetaFound) {
            const siteMeta = await getSiteMetaAsync(forced);
            if ($.isEmptyObject(siteMeta)) {
                smLogWarn('站点元数据空白，无法获取当前页面的元数据：', siteMeta);
                return siteMeta;
            }
            const pageMeta = siteMeta.all;
            const pageMetaLength = pageMeta.length;
            for (let i = 0; i < pageMetaLength; i++) {
                const item = pageMeta[i];
                // 举例：比较 links/index.html 与 /links/，应该能够对应上。
                // 此时 targetPathname 要么以 / 结尾，要么以 .html 结尾。
                let decrypted = item;
                // 如果数据是加密的。
                if (typeof decrypted.encryptedData !== 'undefined' && decrypted.encryptedData !== null)
                    decrypted = decryptPageMeta(decrypted);
                if (decrypted.path === targetPathname.slice(1) || decrypted.path === targetPathname.slice(1) + 'index.html') {
                    curMeta.type = 'PAGE';
                    curMeta = decrypted;
                    curMetaFound = true;
                    smLogDebug('在站点元数据中获取到页面元数据：', curMeta);
                    return curMeta;
                }
            }
        }
        if (!curMetaFound) {
            smLogWarn('未找到页面元数据。');
            return curMeta; // 没找到的空值。
        }
    }
}
async function checkPageRegionBlockAsync(forced) {
    // 调试模式下可以跳过区域检查。其实可以不检查 debugOn，因为 smDebug 不为空就已经代表 debugOn 了。
    if (debugOn && smDebug.vars && smDebug.vars.skipRegionCheck) {
        smLogInfo('跳过区域检查。');
        return 'NOT_BLOCKED';
    }
    const curMeta = await getCurMetaAsync(forced);
    if ($.isEmptyObject(curMeta))
        return 'UNKNOWN';
    // 检查用户地区是否在黑名单内。
    if ($.isArray(curMeta.regionBlacklist) && curMeta.regionBlacklist.length > 0) {
        if (userRegionTextCache === '' || forced) {
            let loadingIndex = smUi.showLoadingPopup();
            let getPromise = smGetAsync({
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
            let res = await getPromise;
            if (typeof res === 'undefined' || res === null) {
                smLogError('属地为空：', res);
                return 'UNKNOWN';
            }
            userRegionTextCache = JSON.stringify(res);
            sessionStorage.setItem('userRegionTextCache', userRegionTextCache);
        }
        const curMetaMetaRegionBlacklistLength = curMeta.regionBlacklist.length;
        for (let i = 0; i < curMetaMetaRegionBlacklistLength; i++) {
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
// 页面后再执行的操作：
function afterPageReady() {
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
    const fixedPathname = getFixedPathname();
    if (pathname !== fixedPathname) {
        window.location.replace(window.location.origin + fixedPathname); // 跳转。
        return; // 从 replace 到实际跳转有一段时间，没必要让代码继续执行，因此 return。
    }
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
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        let iframes = $('iframe');
        const iframesLength = iframes.length;
        for (let i = 0; i < iframesLength; i++) {
            const frm = iframes[i];
            if (frm.src.includes('music.163.com/'))
                frm.src = frm.src.replace('music.163.com/', 'music.163.com/m/');
        }
    }
    if (pathname === '/timeline/') {
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
                hide_preview_link: false,
                hide_emojos: false,
                markdown_blockquote: false,
                hide_counter_bar: false,
                text_max_lines: '0',
                link_see_more: '在 m.cmx.im 查看更多嘟文'
            });
        } else {
            mastodonTimeline.buildTimeline();
        }
    }
}
function afterUiReady() {
    if (!getSmData().initialized)
        smUi.showInitPopup();
    // 检查用户属地。
    checkPageRegionBlockAsync().then((res) => {
        if (res === 'BLOCKED')
            window.location.replace(`${siteUrl}/go-home/`);
        else if (res === 'NOT_BLOCKED')
            $('.main-content').show();
    });
}
let smLogDebug = () => { };
const debugOn = getSmData().debug;
smLogDebug = (...params) => { if (debugOn) console.debug(new Date().toLocaleTimeString() + ' |', ...params); };
let smLog = (...params) => { console.log(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogInfo = (...params) => { console.info(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogWarn = (...params) => { console.warn(new Date().toLocaleTimeString() + ' |', ...params); };
let smLogError = (...params) => { console.error(new Date().toLocaleTimeString() + ' |', ...params); };
// 初始化 site-mod 数据。
setSmData(getSmData());
let track = true;
if (!getSmData().initialized) {
    track = false;
    smLogDebug('站点未初始化，取消跟踪。');
}
if ('doNotTrack' in navigator && navigator.doNotTrack === '1') {
    track = false;
    smLogDebug('浏览器设置了不跟踪，取消跟踪。');
}
if (getSmSettings().doNotTrack) {
    track = false;
    smLogDebug('用户设置了不跟踪，取消跟踪。');
}
// 这么写不好使。
// window.goatcounter = {
//     no_onload: track
// };
if (!track) {
    // Redefine 的计数脚本（被我改成了 GoatCounter）在 body 里，本脚本在 head_end，先于它执行，因此可以取消追踪。
    window.goatcounter = {
        no_onload: false
    };
}
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
let vConsole = {};
let smDebug = {};
if (getSmData().debug) {
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
            decryptedSiteMeta.all = decryptedSiteMeta.all.map((page) => {
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
            const decryptedSiteMetaPostsLength = decryptedSiteMeta.posts.length;
            for (let i = 0; i < decryptedSiteMetaPostsLength; i++) {
                const post = decryptedSiteMeta.posts[i];
                if (post.hidden)
                    hiddenPages.push(post);
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
            let vars = getSmData().debugVars;
            if (this.checkVars(vars)) {
                this._vars = vars;
            }
            else {
                smLogWarn('localStorage 中的 debugVars 无效，将重置：', vars);
                this.resetVars();
            }
        },
        setVars: function (vars) {
            if (this.checkVars(vars)) {
                this._vars = vars;
                let smData = getSmData();
                smData.debugVars = vars;
                setSmData(smData);
            }
            else {
                smLogError('传入的 debugVars 无效，无法设置：', vars);
            }
        },
        resetVars: function () {
            // 深拷贝一份，不然 varsTemplate 在先调用 resetVars 再调用 setVar（setVars）后会被改。
            // this.setVars(JSON.parse(JSON.stringify(this.varsTemplate)));
            this.setVars(this.varsTemplate);
        },
        setVar: function (key, value) {
            let tmpVars = this.vars;
            tmpVars[key] = value;
            this.setVars(tmpVars);
        }
    };
    smDebug.loadVars();
    // smLogDebug = (...params) => { console.debug(new Date().toLocaleTimeString() + ' |', ...params); };
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
    afterPageReady();
    layui.use(() => {
        const layer = layui.layer;
        window.smUi = {};
        window.smUi.closeLayer = (layerIndex) => {
            layer.close(layerIndex);
        };
        window.smUi.showLoadingPopup = () => {
            return layer.load(0, { shade: [1, '#202124'], scrollbar: false });
        };
        window.smUi.showInitPopup = () => {
            const li = layer.alert(
                '您好！这可能是您初次访问本站。本站的大部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。点击“确定”永久关闭本弹窗。',
                { title: '初次访问', icon: 0, maxWidth: 500, closeBtn: 0, scrollbar: false },
                (index, layero, that) => {
                    let smData = getSmData(); // 用户阅读完才会点击确定按钮，这段时间内 smData 可能改变，获取最新值。
                    smData.initialized = true;
                    setSmData(smData);
                    layer.close(index);
                });
            if (!$('#layui-layer1').is(':visible'))
                if (confirm('您好！检测到初始化弹窗未显示。您是否使用了广告拦截插件？本站不含广告，但使用的 Layui 组件可能被某些不完善的广告拦截规则拦截。请您为本站添加白名单，否则可能无法正常浏览。待弹窗加载，完成设置及初始化后，将默认您已知晓相关信息，不再检测广告拦截。\n\n点击“确定”刷新页面。'))
                    window.location.reload();
            return li;
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
