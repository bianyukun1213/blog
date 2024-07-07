'use strict';

class SmI18n {
    constructor(lang, defaultPostProcessor) {
        this.bindLang(lang);
        this.bindDefaultPostProcessor(defaultPostProcessor);
    }
    #lang;
    #globalPostProcessor(text, lang, context) {
        return text;
    }
    #defaultPostProcessor;
    get lang() {
        return this.#lang;
    }
    bindLang(langStr) {
        if (langStr === 'en')
            this.#lang = 'en';
        else
            this.#lang = 'zh-CN';
    }
    bindDefaultPostProcessor(defaultPostProcessor) {
        this.#defaultPostProcessor = defaultPostProcessor;
    }
    #applyPostProcessor(string, postProcessor, context) {
        if (postProcessor === false)
            return string;
        string = this.#globalPostProcessor(string, this.#lang, context);
        if (typeof postProcessor === 'function')
            string = postProcessor(string, this.#lang, context);
        else if (typeof this.#defaultPostProcessor === 'function')
            string = this.#defaultPostProcessor(string, this.#lang, context);
        return string;
    }
    #notTranslated() {
        return 'NOT_TRANSLATED';
    }
    isEn() {
        return this.#lang === 'en' ? true : false;
    }
    isZh() {
        return this.#lang === 'zh-CN' ? true : false;
    }
    langStyleClass() {
        if (this.isEn())
            return 'smui-lang-en';
        else if (this.isZh())
            return 'smui-lang-zh';
    }
    brands(brandKey, postProcessor) {
        const context = {
            callerName: this.brands.name,
            args: [brandKey],
            isHtml: false
        };
        let v;
        const brands = {
            GOOGLE: {
                default: 'Google'
            },
            AN_INDIEWEB_WEBRING: {
                default: 'An IndieWeb Webring'
            },
            GITHUB: {
                default: 'GitHub'
            },
            POSTCROSSING: {
                default: 'Postcrossing'
            },
            THEME_REDEFINE: {
                default: 'Theme Redefine'
            },
            CALCKEY: {
                default: 'Calckey'
            },
            DIASPORA: {
                default: 'Diaspora'
            },
            FEDIBIRD: {
                default: 'Fedibird'
            },
            FIREFISH: {
                default: 'Firefish'
            },
            FOUNDKEY: {
                default: 'FoundKey'
            },
            FRIENDICA: {
                default: 'Friendica'
            },
            GLITCHCAFE: {
                default: 'Glitchcafe'
            },
            GNU_SOCIAL: {
                default: 'GNU Social'
            },
            HOMETOWN: {
                default: 'Hometown'
            },
            HUBZILLA: {
                default: 'Hubzilla'
            },
            KBIN: {
                default: 'kbin'
            },
            MASTODON: {
                default: 'Mastodon'
            },
            MEISSKEY: {
                default: 'Meisskey'
            },
            MICRO_DOT_BLOG: {
                default: 'micro.blog'
            },
            MISSKEY: {
                default: 'Misskey'
            },
            BING: {
                zh: '',
                en: 'Bing'
            },
            BAIDU: {
                zh: '百度',
                en: 'Baidu'
            },
            TRAVELLINGS: {
                zh: '开往',
                en: 'Travellings'
            },
            STEAM_COMMUNITY: {
                zh: 'Steam 社区',
                en: 'Steam Community'
            }
        };
        if (this.isEn())
            v = brands[brandKey]?.en || brands[brandKey]?.default || brandKey;
        else if (this.isZh())
            v = brands[brandKey]?.zh || brands[brandKey]?.default || brandKey;
        return this.#applyPostProcessor(v, postProcessor, context);
    }
    searchInputReverseConversionPlaceholder(postProcessor) {
        const context = {
            callerName: this.searchInputReverseConversionPlaceholder.name,
            args: [],
            isHtml: false
        };
        if (this.isZh()) {
            return this.#applyPostProcessor('//用此格式转换为简体//', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormTipHtml(syndications, postProcessor) {
        const context = {
            callerName: this.webmentionPostFormTipHtml.name,
            args: [syndications],
            isHtml: true
        };
        if (this.isEn()) {
            let mainTip = '<p>If you have written a <a href="https://indieweb.org/responses" rel="noopener external nofollow noreferrer" target="_blank">response</a> to this article, you can submit your article URL here to send me a <a href="https://indieweb.org/Webmention" rel="noopener external nofollow noreferrer" target="_blank">Webmention</a>.';
            if (Array.isArray(syndications) && syndications.length !== 0) {
                let syndicationsTip = 'In addition to this, you can also try responding directly to the following <a href="https://indieweb.org/Category:syndication" rel="noopener external nofollow noreferrer" target="_blank">syndication(s)</a> and wait for the data to be pulled: ';
                const syndicationsLength = syndications.length;
                for (let syndicationIndex = 0; syndicationIndex < syndicationsLength; syndicationIndex++) {
                    const syndication = syndications[syndicationIndex];
                    const syndicationHost = syndication.split('/')[2];
                    syndicationsTip += `<a href="${syndication}" rel="noopener external nofollow noreferrer" target="_blank">${syndicationHost}</a>, `;
                }
                syndicationsTip = syndicationsTip.slice(0, -2) + '.';
                mainTip += (' ' + syndicationsTip);
            }
            return this.#applyPostProcessor(mainTip + '</p>', postProcessor, context);
        }
        else if (this.isZh()) {
            let mainTip = '<p>如果你给本文写了<a href="https://indieweb.org/responses" rel="noopener external nofollow noreferrer" target="_blank">回应</a>，可以在此提交文章 URL 以向我发送 <a href="https://indieweb.org/Webmention" rel="noopener external nofollow noreferrer" target="_blank">Webmention</a>。';
            if (Array.isArray(syndications) && syndications.length !== 0) {
                let syndicationsTip = '除此之外，你还可以尝试直接回应以下<a href="https://indieweb.org/Category:syndication" rel="noopener external nofollow noreferrer" target="_blank">副本</a>，并等待数据拉取：';
                const syndicationsLength = syndications.length;
                for (let syndicationIndex = 0; syndicationIndex < syndicationsLength; syndicationIndex++) {
                    const syndication = syndications[syndicationIndex];
                    const syndicationHost = syndication.split('/')[2];
                    syndicationsTip += `<a href="${syndication}" rel="noopener external nofollow noreferrer" target="_blank">${syndicationHost}</a>、`;
                }
                syndicationsTip = syndicationsTip.slice(0, -1) + '。';
                mainTip += syndicationsTip;
            }
            return this.#applyPostProcessor(mainTip + '</p>', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormInputArticleUrlPlaceholder(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlPlaceholder.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('https://your-website.com/some-post.html', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('https://your-website.com/some-post.html', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormInputArticleUrlReqText(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlReqText.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Please fill in the article URL correctly!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('请有效填写文章 URL！', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormButtonSubmitHtml(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmitHtml.name,
            args: [],
            isHtml: true
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Submit', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('提交', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormButtonSubmittingHtml(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmittingHtml.name,
            args: [],
            isHtml: true
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Submitting <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('提交中 <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormTipSubmissionSucceeded(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionSucceeded.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Done!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('完成！', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionPostFormTipSubmissionFailed(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionFailed.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Failed!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('失败！', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    webmentionjsStrings(key, postProcessor) {
        const context = {
            callerName: this.webmentionjsStrings.name,
            args: [key],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor(key, postProcessor, context);
        }
        else if (this.isZh()) {
            switch (key) {
                case 'replied':
                    return this.#applyPostProcessor('回复了', postProcessor, context);
                case 'liked':
                    return this.#applyPostProcessor('喜欢了', postProcessor, context);
                case 'reposted':
                    return this.#applyPostProcessor('转发了', postProcessor, context);
                case 'reacted':
                    return this.#applyPostProcessor('反应了', postProcessor, context);
                case 'bookmarked':
                    return this.#applyPostProcessor('加入了书签', postProcessor, context);
                case 'mentioned':
                    return this.#applyPostProcessor('提及了', postProcessor, context);
                case 'RSVPed':
                    return this.#applyPostProcessor('响应了事件', postProcessor, context);
                case 'followed':
                    return this.#applyPostProcessor('关注了', postProcessor, context);
                case 'Responses':
                    return this.#applyPostProcessor('回应', postProcessor, context);
                case 'mention':
                    return this.#applyPostProcessor('提及', postProcessor, context);
                case 'Reactions':
                    return this.#applyPostProcessor('反应', postProcessor, context);
            }
        }
        return this.#applyPostProcessor(key, postProcessor, context);
    }
    interactionSwitchWebmentions(postProcessor) {
        const context = {
            callerName: this.interactionSwitchWebmentions.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Webmentions', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('Webmentions', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonCloseCarousel(postProcessor) {
        const context = {
            callerName: this.timelineButtonCloseCarousel.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Close carousel', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('关闭大图', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonCarouselPrevItem(postProcessor) {
        const context = {
            callerName: this.timelineButtonCarouselPrevItem.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Previous media item', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('前一项', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonCarouselNextItem(postProcessor) {
        const context = {
            callerName: this.timelineButtonCarouselNextItem.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Next media item', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('后一项', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonShowMore(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowMore.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('SHOW MORE', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('展开', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonShowLess(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowLess.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('SHOW LESS', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('折叠', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonShowContent(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowContent.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('SHOW CONTENT', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('显示内容', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonPlayVideo(postProcessor) {
        const context = {
            callerName: this.timelineButtonPlayVideo.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('PLAY VIDEO', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('播放视频', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineLinkSeeMore(instanceHost, postProcessor) {
        const context = {
            callerName: this.timelineLinkSeeMore.name,
            args: [instanceHost],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor(`See more twoots at ${instanceHost}`, postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor(`在 ${instanceHost} 查看更多嘟文`, postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    timelineButtonRefresh(postProcessor) {
        const context = {
            callerName: this.timelineButtonRefresh.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Refresh', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('刷新', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    smSettingsMigratedAlert(postProcessor) {
        const context = {
            callerName: this.smSettingsMigratedAlert.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Data migration and validation result in changes to settings. You can open the settings pop-up to adjust the new settings.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('数据迁移与校验导致设置变更。您可在设置窗口调整新的设置。', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    referrerPopContent(referrerKey, postProcessor) {
        const context = {
            callerName: this.referrerPopContent.name,
            args: [referrerKey],
            isHtml: false
        };
        const referrerStr = this.brands(referrerKey);
        if (this.isEn())
            return this.#applyPostProcessor(`Welcome, visitor from “${referrerStr}”!`, postProcessor, context);
        else if (this.isZh())
            return this.#applyPostProcessor(`欢迎，从“${referrerStr}”过来的访客！`, postProcessor, context);
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    initPopTitle(postProcessor) {
        const context = {
            callerName: this.initPopTitle.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Notice to visitors', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('访客须知', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    initPopContentHtml(minimumSupportedBrowserVersions, referrerKey, postProcessor) {
        const context = {
            callerName: this.initPopContentHtml.name,
            args: [minimumSupportedBrowserVersions, referrerKey],
            isHtml: true
        };
        if (this.isEn()) {
            let greeting = 'Greetings';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `, visitor from “${this.brands(referrerKey)}”`;
            greeting += '! ';
            return this.#applyPostProcessor(`
            <p>${greeting}This may be your first visit to this site.</p>
            <p>Most resources on this site are hosted outside Chinese mainland and may not load properly under the network environment in Chinese mainland. If you visit this site in Chinese mainland, it is recommended to use a proxy. Some of the features used on this site require Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}, Safari ${minimumSupportedBrowserVersions.safari}, Firefox ${minimumSupportedBrowserVersions.firefox} or above. Some content such as post summaries and image captions may have been generated by AI and are for reference only.</p>
            <p>In addition, before completing the initialization, if you want to adjust settings such as data analytics and color scheme, please click the button at the bottom left corner, otherwise the site will work with the default settings. After the initialization, you can also find the Settings button in the lower right corner of the page.</p>
            <p>Click “${this.initPopButtonOk()}” to complete the initialization and permanently close this annoying pop-up.</p>
            `, postProcessor, context);
        }
        else if (this.isZh()) {
            let greeting = '您好';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `，从“${this.brands(referrerKey)}”过来的访客`;
            greeting += '！';
            return this.#applyPostProcessor(`
            <p>${greeting}这可能是您初次访问本站。</p>
            <p>本站的大部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。本站使用的部分特性需要 Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}、Safari ${minimumSupportedBrowserVersions.safari}、Firefox ${minimumSupportedBrowserVersions.firefox} 及以上版本的支持。部分内容如文章总结及图片标注可能由 AI 生成，仅供参考。</p>
            <p>此外，在完成初始化前，如果您想要调整数据分析、颜色方案、简繁转换等设置，请点击左下角按钮，否则站点将以默认设置工作。初始化完成后，您也可以在页面右下角找到设置按钮。</p>
            <p>点击“${this.initPopButtonOk()}”完成初始化并永久关闭这个恼人的弹窗。</p>
            `, postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    initPopButtonEnterSettings(postProcessor) {
        const context = {
            callerName: this.initPopButtonEnterSettings.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Settings', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('设置', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    initPopButtonOk(postProcessor) {
        const context = {
            callerName: this.initPopButtonOk.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('OK', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('了解', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    initPopConfirmTurnOffAntiadExtension(postProcessor) {
        const context = {
            callerName: this.initPopConfirmTurnOffAntiadExtension.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Hello!\nThe necessary initialization pop-up is detected as not being displayed. Are you using an ad-blocking plugin? This site is ad-free, but the Layui component used may be blocked by some imperfect ad-blocking rules. Please add this site to the allow-list, otherwise you may not be able to browse normally.\nAfter the pop-up loads and completes the initialization, you will be informed by default and no longer be detected for ad-blocking.\n\nClick “OK” to refresh the page.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('您好！\n检测到必要的初始化弹窗未显示。您是否使用了广告拦截插件？本站不含广告，但使用的 Layui 组件可能被某些不完善的广告拦截规则拦截。请将本站添加到白名单，否则可能无法正常浏览。\n待弹窗加载，完成初始化后，将默认您已知晓相关信息，不再检测广告拦截。\n\n点击“确定”刷新页面。', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopTitle(postProcessor) {
        const context = {
            callerName: this.settPopTitle.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Settings', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('设置', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopLableDataAnalytics(postProcessor) {
        const context = {
            callerName: this.settPopLableDataAnalytics.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Data analytics', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('数据分析', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopTipDataAnalyticsHtml(trackingDetails, postProcessor) {
        const context = {
            callerName: this.settPopTipDataAnalyticsHtml.name,
            args: [trackingDetails],
            isHtml: true
        };
        if (this.isEn()) {
            const tip = 'The counting script used on this site may collect and analyze data such as region, User-Agent, refer(r)er, language, screen size, etc. In addition to the disablement here, “Do Not Track” requests or incomplete initialization of the site will also result in data analytics being disabled and visits not being counted. This setting does not affect the interaction system, the few necessary region checks and potential third-party data analytics.<br>';
            const trackingResTxtPart1 = `Data analytics is currenly ${trackingDetails.available ? 'enabled. ' : 'disabled, because '}`;
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
            return this.#applyPostProcessor(tip + trackingResTxtWhole, postProcessor, context);
        }
        else if (this.isZh()) {
            const tip = '本站使用的计数脚本可能收集并分析区域、UA、来源、语言、屏幕大小等数据。除此处禁止外，浏览器请求不要跟踪或站点未完成初始化也将导致数据分析禁用，访问不被记录。此设置不影响互动系统、少数必要的区域检查及潜在的第三方数据分析。<br>';
            let trackingResTxt = `数据分析当前${trackingDetails.available ? '已启用。' : '已禁用，因为'}`;
            if (!trackingDetails.initializationPassed)
                trackingResTxt += '站点未初始化、';
            if (!trackingDetails.broswerPassed)
                trackingResTxt += '浏览器请求不要跟踪、';
            if (!trackingDetails.settingsPassed)
                trackingResTxt += '您禁止数据分析、';
            trackingResTxt = trackingResTxt.slice(0, -1) + '。';
            return this.#applyPostProcessor(tip + trackingResTxt, postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopSwitchDataAnalytics(postProcessor) {
        const context = {
            callerName: this.settPopSwitchDataAnalytics.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Allowed|Prohibited', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('已允许|已禁止', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopLableAiGeneratedSummary(postProcessor) {
        const context = {
            callerName: this.settPopLableAiGeneratedSummary.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('AI-generated summary', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('AI 生成的总结', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopTipAiGeneratedSummaryHtml(postProcessor) {
        const context = {
            callerName: this.settPopTipAiGeneratedSummaryHtml.name,
            args: [],
            isHtml: true
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('This setting does not work for posts that do not contain an AI-generated summary at all.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('有些文章本来就不包含 AI 生成的总结，此项设置对其无效。', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopSwitchAiGeneratedSummary(postProcessor) {
        const context = {
            callerName: this.settPopSwitchAiGeneratedSummary.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Shown|Hidden', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('已显示|已隐藏', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopLableColorScheme(postProcessor) {
        const context = {
            callerName: this.settPopLableColorScheme.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Color scheme', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('颜色方案', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopSelectOptionColorScheme(key, postProcessor) {
        const context = {
            callerName: this.settPopSelectOptionColorScheme.name,
            args: [key],
            isHtml: false
        };
        if (this.isEn()) {
            switch (key) {
                case 'SYSTEM':
                    return this.#applyPostProcessor('System', postProcessor, context);
                case 'LIGHT':
                    return this.#applyPostProcessor('Light', postProcessor, context);
                case 'DARK':
                    return this.#applyPostProcessor('Dark', postProcessor, context);
                default:
                    return this.#applyPostProcessor(this.#notTranslated(), false);
            }
        }
        else if (this.isZh()) {
            switch (key) {
                case 'SYSTEM':
                    return this.#applyPostProcessor('系统', postProcessor, context);
                case 'LIGHT':
                    return this.#applyPostProcessor('亮色', postProcessor, context);
                case 'DARK':
                    return this.#applyPostProcessor('暗色', postProcessor, context);
                default:
                    return this.#applyPostProcessor(this.#notTranslated(), false);
            }
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopLableChineseConversion(postProcessor) {
        const context = {
            callerName: this.settPopLableChineseConversion.name,
            args: [],
            isHtml: false
        };
        if (this.isZh()) {
            return this.#applyPostProcessor('简繁转换', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopTipChineseConversionHtml(postProcessor) {
        const context = {
            callerName: this.settPopTipChineseConversionHtml.name,
            args: [],
            isHtml: true
        };
        if (this.isZh()) {
            return this.#applyPostProcessor('试验性，对动态加载的内容可能无效。', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopSelectOptionChineseConversion(key, postProcessor) {
        const context = {
            callerName: this.settPopSelectOptionChineseConversion.name,
            args: [key],
            isHtml: false
        };
        if (this.isZh()) {
            switch (key) {
                case 'DISABLED':
                    return this.#applyPostProcessor('关闭', postProcessor, context);
                case 'HK':
                    return this.#applyPostProcessor('转换为香港繁体', postProcessor, context);
                case 'TW':
                    return this.#applyPostProcessor('转换为台湾正体', postProcessor, context);
                default:
                    return this.#applyPostProcessor(this.#notTranslated(), false);
            }
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopLableDefaultInteractionSystem(postProcessor) {
        const context = {
            callerName: this.settPopLableDefaultInteractionSystem.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Default interaction system', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('默认互动系统', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopSelectOptionDefaultInteractionSystem(key, postProcessor) {
        const context = {
            callerName: this.settPopSelectOptionDefaultInteractionSystem.name,
            args: [key],
            isHtml: false
        };
        if (this.isEn()) {
            switch (key) {
                case 'COMMENTS':
                    return this.#applyPostProcessor('Comments', postProcessor, context);
                case 'WEBMENTIONS':
                    return this.#applyPostProcessor('Webmentions', postProcessor, context);
                default:
                    return this.#applyPostProcessor(this.#notTranslated(), false);
            }
        }
        else if (this.isZh()) {
            switch (key) {
                case 'COMMENTS':
                    return this.#applyPostProcessor('评论', postProcessor, context);
                case 'WEBMENTIONS':
                    return this.#applyPostProcessor('Webmentions', postProcessor, context);
                default:
                    return this.#applyPostProcessor(this.#notTranslated(), false);
            }
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopButtonClearLocalStorage(postProcessor) {
        const context = {
            callerName: this.settPopButtonClearLocalStorage.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Clear local storage', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('清除本地存储', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopConfirmStorageClear(postProcessor) {
        const context = {
            callerName: this.settPopConfirmStorageClear.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('If you do so, all the settings will be lost and the site will reinitialize. Continue?', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('这将丢弃所有设置并重新初始化站点。是否继续？', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    settPopButtonSave(postProcessor) {
        const context = {
            callerName: this.settPopButtonSave.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Save & refresh', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('保存并刷新', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    pageContentIconTitleSwitchLang(postProcessor) {
        const context = {
            callerName: this.pageContentIconTitleSwitchLang.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Switch language', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('切换语言', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    langSwitchPopTitle(postProcessor) {
        const context = {
            callerName: this.langSwitchPopTitle.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Switch language', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('切换语言', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    langSwitchPopLableAvailableLangs(postProcessor) {
        const context = {
            callerName: this.langSwitchPopLableAvailableLangs.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Available in', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('可用语言', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    langSwitchPopSelectOptionLang(langKey, postProcessor) {
        const context = {
            callerName: this.langSwitchPopSelectOptionLang.name,
            args: [langKey],
            isHtml: false
        };
        switch (langKey) {
            case 'en':
                return this.#applyPostProcessor('English', postProcessor, context);
            case 'zh-CN':
                return this.#applyPostProcessor('简体中文', postProcessor, context);
            default:
                return this.#applyPostProcessor(langKey, false);
        }
    }
    langSwitchPopButtonSetChineseConversion(postProcessor) {
        const context = {
            callerName: this.langSwitchPopButtonSetChineseConversion.name,
            args: [],
            isHtml: false
        };
        if (this.isZh()) {
            return this.#applyPostProcessor('设置简繁转换', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    langSwitchPopButtonSwitch(postProcessor) {
        const context = {
            callerName: this.langSwitchPopButtonSwitch.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Switch', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('切换', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    pageContentIconTitleShareOnFediverse(postProcessor) {
        const context = {
            callerName: this.pageContentIconTitleShareOnFediverse.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Share on Fediverse', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('分享到联邦宇宙', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(postProcessor), false);
    }
    fediverseSharingPopTitle(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopTitle.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Share on Fediverse', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('分享到联邦宇宙', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopLableInstance(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopLableInstance.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Instance', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('实例', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopInputInstancePlaceholder(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopInputInstancePlaceholder.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('your-instance.domain', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('your-instance.domain', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopInputInstanceReqText(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopInputInstanceReqText.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Please fill in the instance correctly!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('请有效填写实例！', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopLableSoftware(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopLableSoftware.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Software', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('平台', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopButtonShare(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopButtonShare.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Share', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('分享', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopPostTitle(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostTitle.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Title: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('标题：', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopPostExcerpt(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostExcerpt.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Excerpt: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('摘要：', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopPostAiGeneratedSummary(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostAiGeneratedSummary.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('AI-generated summary: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('AI 生成的总结：', postProcessor, context)
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
    fediverseSharingPopPostUrl(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostUrl.name,
            args: [],
            isHtml: false
        };
        if (this.isEn()) {
            return this.#applyPostProcessor('Link: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this.#applyPostProcessor('链接：', postProcessor, context);
        }
        return this.#applyPostProcessor(this.#notTranslated(), false);
    }
}
