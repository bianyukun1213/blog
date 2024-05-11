'use strict';

const smI18n = {
    // getSiteLang: function () {
    //     return window.location.pathname.split('/')[1];
    // },
    get lang() {
        return this._lang;
    },
    _lang: '',
    bindLang: function (langStr) {
        if (langStr === 'en')
            this._lang = 'en';
        else
            this._lang = 'zh-CN';
    },
    _notTranslated: function () {
        return 'NOT_TRANSLATED';
    },
    isEn: function () {
        return this._lang === 'en' ? true : false;
    },
    isZh: function () {
        return this._lang === 'zh-CN' ? true : false;
    },
    // get globalModifier() {
    //     return this._globalModifier;
    // },
    _globalModifier: undefined,
    bindGlobalModifier: function (globalModifier) {
        this._globalModifier = globalModifier;
    },
    _applyModifier: function (string, modifier, context) {
        if (modifier === false)
            return string;
        if (typeof modifier === 'function')
            return modifier(string, this._lang, context);
        if (typeof this._globalModifier === 'function')
            return this._globalModifier(string, this._lang, context);
        return string;
    },
    langStyleClass: function () {
        if (this.isEn())
            return 'smui-lang-en';
        else if (this.isZh())
            return 'smui-lang-zh';
    },
    brands: function (brandKey, modifier) {
        const context = {
            callerName: this.brands.name,
            args: [brandKey]
        };
        switch (brandKey) {
            case 'GOOGLE':
                return this._applyModifier('Google', modifier, context);
            case 'AN_INDIEWEB_WEBRING':
                return this._applyModifier('An IndieWeb Webring', modifier, context);
            case 'GITHUB':
                return this._applyModifier('GitHub', modifier, context);
            case 'POSTCROSSING':
                return this._applyModifier('Postcrossing', modifier, context);
            case 'THEME_REDEFINE':
                return this._applyModifier('Theme Redefine', modifier, context);
            case 'CALCKEY':
                return this._applyModifier('Calckey', modifier, context);
            case 'DIASPORA':
                return this._applyModifier('Diaspora', modifier, context);
            case 'FEDIBIRD':
                return this._applyModifier('Fedibird', modifier, context);
            case 'FIREFISH':
                return this._applyModifier('Firefish', modifier, context);
            case 'FOUNDKEY':
                return this._applyModifier('FoundKey', modifier, context);
            case 'FRIENDICA':
                return this._applyModifier('Friendica', modifier, context);
            case 'GLITCHCAFE':
                return this._applyModifier('Glitchcafe', modifier, context);
            case 'GNU_SOCIAL':
                return this._applyModifier('GNU Social', modifier, context);
            case 'HOMETOWN':
                return this._applyModifier('Hometown', modifier, context);
            case 'HUBZILLA':
                return this._applyModifier('Hubzilla', modifier, context);
            case 'KBIN':
                return this._applyModifier('kbin', modifier, context);
            case 'MASTODON':
                return this._applyModifier('Mastodon', modifier, context);
            case 'MEISSKEY':
                return this._applyModifier('Meisskey', modifier, context);
            case 'MICRO_DOT_BLOG':
                return this._applyModifier('micro.blog', modifier, context);
            case 'MISSKEY':
                return this._applyModifier('Misskey', modifier, context);
        }
        if (this.isEn()) {
            switch (brandKey) {
                case 'BING':
                    return this._applyModifier('Bing', modifier, context);
                case 'BAIDU':
                    return this._applyModifier('Baidu', modifier, context);
                case 'TRAVELLINGS':
                    return this._applyModifier('Travellings', modifier, context);
                case 'STEAM_COMMUNITY':
                    return this._applyModifier('Steam Community', modifier, context);
            }
        }
        else if (this.isZh()) {
            switch (brandKey) {
                case 'BING':
                    return this._applyModifier('必应', modifier, context);
                case 'BAIDU':
                    return this._applyModifier('百度', modifier, context);
                case 'TRAVELLINGS':
                    return this._applyModifier('开往', modifier, context);
                case 'STEAMCOMMUNITY':
                    return this._applyModifier('Steam 社区', modifier, context);
            }
        }
        return this._applyModifier(brandKey, modifier, context);
    },
    webmentionPostFormTipHtml: function (syndications, modifier) {
        const context = {
            callerName: this.webmentionPostFormTipHtml.name,
            args: [syndications]
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
            return this._applyModifier(mainTip + '</p>', modifier, context);
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
            return this._applyModifier(mainTip + '</p>', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormInputArticleUrlPlaceholder: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlPlaceholder.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('https://your-website.com/some-post.html', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('https://your-website.com/some-post.html', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormInputArticleUrlReqText: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlReqText.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Please fill in the article URL correctly!', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('请有效填写文章 URL！', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormButtonSubmitHtml: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmitHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Submit', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('提交', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormButtonSubmittingHtml: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmittingHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Submitting <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('提交中 <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormTipSubmissionSucceeded: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionSucceeded.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Done!', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('完成！', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionPostFormTipSubmissionFailed: function (modifier) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionFailed.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Failed!', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('失败！', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    webmentionjsStrings: function (key, modifier) {
        const context = {
            callerName: this.webmentionjsStrings.name,
            args: [key]
        };
        if (this.isEn()) {
            return this._applyModifier(key, modifier, context);
        }
        else if (this.isZh()) {
            switch (key) {
                case 'replied':
                    return this._applyModifier('回复了', modifier, context);
                case 'liked':
                    return this._applyModifier('喜欢了', modifier, context);
                case 'reposted':
                    return this._applyModifier('转发了', modifier, context);
                case 'reacted':
                    return this._applyModifier('反应了', modifier, context);
                case 'bookmarked':
                    return this._applyModifier('加入了书签', modifier, context);
                case 'mentioned':
                    return this._applyModifier('提及了', modifier, context);
                case 'RSVPed':
                    return this._applyModifier('响应了事件', modifier, context);
                case 'followed':
                    return this._applyModifier('关注了', modifier, context);
                case 'Responses':
                    return this._applyModifier('回应', modifier, context);
                case 'mention':
                    return this._applyModifier('提及', modifier, context);
                case 'Reactions':
                    return this._applyModifier('反应', modifier, context);
            }
        }
        return this._applyModifier(key, modifier, context);
    },
    interactionSwitchWebmentions: function (modifier) {
        const context = {
            callerName: this.interactionSwitchWebmentions.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Webmentions', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('Webmentions', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonCloseCarousel: function (modifier) {
        const context = {
            callerName: this.timelineButtonCloseCarousel.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Close carousel', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('关闭大图', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonCarouselPrevItem: function (modifier) {
        const context = {
            callerName: this.timelineButtonCarouselPrevItem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Previous media item', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('前一项', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonCarouselNextItem: function (modifier) {
        const context = {
            callerName: this.timelineButtonCarouselNextItem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Next media item', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('后一项', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonShowMore: function (modifier) {
        const context = {
            callerName: this.timelineButtonShowMore.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('SHOW MORE', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('展开', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonShowLess: function (modifier) {
        const context = {
            callerName: this.timelineButtonShowLess.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('SHOW LESS', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('折叠', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonShowContent: function (modifier) {
        const context = {
            callerName: this.timelineButtonShowContent.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('SHOW CONTENT', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('显示内容', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonPlayVideo: function (modifier) {
        const context = {
            callerName: this.timelineButtonPlayVideo.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('PLAY VIDEO', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('播放视频', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineLinkSeeMore: function (instanceHost, modifier) {
        const context = {
            callerName: this.timelineLinkSeeMore.name,
            args: [instanceHost]
        };
        if (this.isEn()) {
            return this._applyModifier(`See more twoots at ${instanceHost}`, modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier(`在 ${instanceHost} 查看更多嘟文`, modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    timelineButtonRefresh: function (modifier) {
        const context = {
            callerName: this.timelineButtonRefresh.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Refresh', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('刷新', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    smSettingsMigratedAlert: function (modifier) {
        const context = {
            callerName: this.smSettingsMigratedAlert.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Data migration and validation result in changes to settings. You can open the settings pop-up to adjust the new settings.', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('数据迁移与校验导致设置变更。您可在设置窗口调整新的设置。', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    referrerPopContent: function (referrerKey, modifier) {
        const context = {
            callerName: this.referrerPopContent.name,
            args: [referrerKey]
        };
        const referrerStr = this.brands(referrerKey);
        if (this.isEn())
            return this._applyModifier(`Welcome, visitor from “${referrerStr}”!`, modifier, context);
        else if (this.isZh())
            return this._applyModifier(`欢迎，从“${referrerStr}”过来的访客！`, modifier, context);
        return this._applyModifier(this._notTranslated(), false);
    },
    initPopTitle: function (modifier) {
        const context = {
            callerName: this.initPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Notice to visitors', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('访客须知', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    initPopContentHtml: function (minimumSupportedBrowserVersions, referrerKey, modifier) {
        const context = {
            callerName: this.initPopContentHtml.name,
            args: [minimumSupportedBrowserVersions, referrerKey]
        };
        if (this.isEn()) {
            let greeting = 'Hello';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `, visitor from “${this.brands(referrerKey)}”`;
            greeting += '! ';
            return this._applyModifier(`
            <p>${greeting}This may be your first visit to this site.</p>
            <p>Some resources on this site are hosted abroad and may not load properly under the network environment in mainland China. If you visit this site in mainland China, it is recommended to use a proxy. Some of the features used on this site require Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}, Safari ${minimumSupportedBrowserVersions.safari}, Firefox ${minimumSupportedBrowserVersions.firefox} and above.</p>
            <p>In addition, before completing the initialization, if you want to adjust the settings such as data analytics, please click the button at the bottom left corner, otherwise the site will work with the default settings. After the initialization is completed, you can also find the settings in the lower right corner of the page.</p>
            <p>Click “${this.initPopButtonOk()}” to complete the initialization and permanently close this pop-up.</p>
            `, modifier, context);
        }
        else if (this.isZh()) {
            let greeting = '您好';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `，从“${this.brands(referrerKey)}”过来的访客`;
            greeting += '！';
            return this._applyModifier(`
            <p>${greeting}这可能是您初次访问本站。</p>
            <p>本站的部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。本站使用的部分特性需要 Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}、Safari ${minimumSupportedBrowserVersions.safari}、Firefox ${minimumSupportedBrowserVersions.firefox} 及以上版本的支持。</p>
            <p>此外，在完成初始化前，如果您想要调整数据分析、简繁转换等设置，请点击左下角按钮，否则站点将以默认设置工作。初始化完成后，您也可以在页面右下角找到设置。</p>
            <p>点击“${this.initPopButtonOk()}”完成初始化并永久关闭本弹窗。</p>
            `, modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    initPopButtonEnterSettings: function (modifier) {
        const context = {
            callerName: this.initPopButtonEnterSettings.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Settings', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('设置', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    initPopButtonOk: function (modifier) {
        const context = {
            callerName: this.initPopButtonOk.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('OK', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('了解', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    initPopConfirmTurnOffAntiadExtension: function (modifier) {
        const context = {
            callerName: this.initPopConfirmTurnOffAntiadExtension.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Hello!\nThe initialization pop-up is detected as not being displayed. Are you using an ad-blocking plugin? This site is ad-free, but the Layui component used may be blocked by some imperfect ad-blocking rules. Please add a whitelist for this site, otherwise you may not be able to browse normally.\nAfter the pop-up loads and completes initialization, you will be informed by default and no longer be detected for ad-blocking.\n\nClick “OK” to refresh the page.', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('您好！\n检测到初始化弹窗未显示。您是否使用了广告拦截插件？本站不含广告，但使用的 Layui 组件可能被某些不完善的广告拦截规则拦截。请您为本站添加白名单，否则可能无法正常浏览。\n待弹窗加载，完成初始化后，将默认您已知晓相关信息，不再检测广告拦截。\n\n点击“确定”刷新页面。', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopTitle: function (modifier) {
        const context = {
            callerName: this.settPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Settings', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('设置', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopLableDataAnalytics: function (modifier) {
        const context = {
            callerName: this.settPopLableDataAnalytics.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Data analytics', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('数据分析', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopTipDataAnalyticsHtml: function (trackingDetails, modifier) {
        const context = {
            callerName: this.settPopTipDataAnalyticsHtml.name,
            args: [trackingDetails]
        };
        if (this.isEn()) {
            const tip = 'The counting script used on this site may collect and analyze data such as region, User-Agent, refer(r)er, language, screen size, etc. In addition to the disablement here, “Do Not Track” requests or incomplete initialization of the site will also result in data analytics being disabled and visits not being logged. This setting does not affect the comment module, the few necessary region checks and potential third-party data analytics.<br>';
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
            return this._applyModifier(tip + trackingResTxtWhole, modifier, context);
        }
        else if (this.isZh()) {
            const tip = '本站使用的计数脚本可能收集并分析区域、UA、来源、语言、屏幕大小等数据。除此处禁止外，浏览器请求不要跟踪或站点未完成初始化也将导致数据分析禁用，访问不被记录。此设置不影响评论模块、少数必要的区域检查及潜在的第三方数据分析。<br>';
            let trackingResTxt = `数据分析当前${trackingDetails.available ? '已启用。' : '已禁用，因为'}`;
            if (!trackingDetails.initializationPassed)
                trackingResTxt += '站点未初始化、';
            if (!trackingDetails.broswerPassed)
                trackingResTxt += '浏览器请求不要跟踪、';
            if (!trackingDetails.settingsPassed)
                trackingResTxt += '您禁止数据分析、';
            trackingResTxt = trackingResTxt.slice(0, -1) + '。';
            return this._applyModifier(tip + trackingResTxt, modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopSwitchDataAnalytics: function (modifier) {
        const context = {
            callerName: this.settPopSwitchDataAnalytics.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Allowed|Prohibited', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('已允许|已禁止', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopLableAiGeneratedExcerpt: function (modifier) {
        const context = {
            callerName: this.settPopLableAiGeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('AI-generated excerpt', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('AI 生成的摘要', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopTipAiGeneratedExcerptHtml: function (modifier) {
        const context = {
            callerName: this.settPopTipAiGeneratedExcerptHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('This setting does not work for posts that do not contain an AI-generated excerpt at all.', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('有些文章本来就不包含 AI 生成的摘要，此项设置对其无效。', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopSwitchAiGeneratedExcerpt: function (modifier) {
        const context = {
            callerName: this.settPopSwitchAiGeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Shown|Hidden', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('已显示|已隐藏', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopLableChineseConversion: function (modifier) {
        const context = {
            callerName: this.settPopLableChineseConversion.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('Default interaction system', modifier, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyModifier('简繁转换', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopTipChineseConversionHtml: function (modifier) {
        const context = {
            callerName: this.settPopTipChineseConversionHtml.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('This setting does not work for posts that do not contain an AI-generated excerpt at all.', modifier, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyModifier('试验性，对动态加载的内容可能无效。', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopSelectOptionChineseConversion: function (key, modifier) {
        const context = {
            callerName: this.settPopSelectOptionChineseConversion.name,
            args: [key]
        };
        // if (this.isEn()) {
        //     switch (key) {
        //         case 'COMMENTS':
        //             return this._applyModifier('Comments', modifier, context);
        //         case 'WEBMENTIONS':
        //             return this._applyModifier('Webmentions', modifier, context);
        //         default:
        //             return this._applyModifier(this._notTranslated(), false);
        //     }
        // }
        // else 
        if (this.isZh()) {
            switch (key) {
                case 'DISABLED':
                    return this._applyModifier('关闭', modifier, context);
                case 'HK':
                    return this._applyModifier('转换为香港繁体', modifier, context);
                case 'TW':
                    return this._applyModifier('转换为台湾正体', modifier, context);
                default:
                    return this._applyModifier(this._notTranslated(), false);
            }
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopLableDefaultInteractionSystem: function (modifier) {
        const context = {
            callerName: this.settPopLableDefaultInteractionSystem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Default interaction system', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('默认互动系统', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopSelectOptionDefaultInteractionSystem: function (key, modifier) {
        const context = {
            callerName: this.settPopSelectOptionDefaultInteractionSystem.name,
            args: [key]
        };
        if (this.isEn()) {
            switch (key) {
                case 'COMMENTS':
                    return this._applyModifier('Comments', modifier, context);
                case 'WEBMENTIONS':
                    return this._applyModifier('Webmentions', modifier, context);
                default:
                    return this._applyModifier(this._notTranslated(), false);
            }
        }
        else if (this.isZh()) {
            switch (key) {
                case 'COMMENTS':
                    return this._applyModifier('评论', modifier, context);
                case 'WEBMENTIONS':
                    return this._applyModifier('Webmentions', modifier, context);
                default:
                    return this._applyModifier(this._notTranslated(), false);
            }
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopButtonClearLocalStorage: function (modifier) {
        const context = {
            callerName: this.settPopButtonClearLocalStorage.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Clear local storage', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('清除本地存储', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopConfirmStorageClear: function (modifier) {
        const context = {
            callerName: this.settPopConfirmStorageClear.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('All settings will be lost and the site will reinitialize, do you want to continue?', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('所有设置都将丢失，站点将重新初始化，是否继续？', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    settPopButtonSave: function (modifier) {
        const context = {
            callerName: this.settPopButtonSave.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Save & refresh', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('保存并刷新', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    pageContentIconTitleSwitchLang: function (modifier) {
        const context = {
            callerName: this.pageContentIconTitleSwitchLang.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Switch language', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('切换语言', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    langSwitchPopTitle: function (modifier) {
        const context = {
            callerName: this.langSwitchPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Switch language', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('切换语言', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    langSwitchPopLableAvailableLangs: function (modifier) {
        const context = {
            callerName: this.langSwitchPopLableAvailableLangs.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Available in', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('可用语言', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    langSwitchPopSelectOptionLang: function (langKey, modifier) {
        const context = {
            callerName: this.langSwitchPopSelectOptionLang.name,
            args: [langKey]
        };
        switch (langKey) {
            case 'en':
                return this._applyModifier('English', modifier, context);
            case 'zh-CN':
                return this._applyModifier('简体中文', modifier, context);
            default:
                return this._applyModifier(langKey, false);
        }
    },
    langSwitchPopButtonSetChineseConversion: function (modifier) {
        const context = {
            callerName: this.langSwitchPopButtonSetChineseConversion.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('Settings', modifier, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyModifier('设置简繁转换', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    langSwitchPopButtonSwitch: function (modifier) {
        const context = {
            callerName: this.langSwitchPopButtonSwitch.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Switch', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('切换', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    pageContentIconTitleShareOnFediverse: function (modifier) {
        const context = {
            callerName: this.pageContentIconTitleShareOnFediverse.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Share on Fediverse', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('分享到联邦宇宙', modifier, context);
        }
        return this._applyModifier(this._notTranslated(modifier), false);
    },
    fediverseSharingPopTitle: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Share on Fediverse', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('分享到联邦宇宙', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopLableInstance: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopLableInstance.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Instance', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('实例', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopInputInstancePlaceholder: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopInputInstancePlaceholder.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('your-instance.domain', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('your-instance.domain', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopInputInstanceReqText: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopInputInstanceReqText.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Please fill in the instance correctly!', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('请有效填写实例！', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopLableSoftware: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopLableSoftware.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Software', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('平台', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopButtonShare: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopButtonShare.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Share', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('分享', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopPostTitle: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopPostTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Title: ', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('标题：', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopPostExcerpt: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopPostExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Excerpt: ', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('摘要：', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopPostAigeneratedExcerpt: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopPostAigeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('AI-generated excerpt: ', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('AI 生成的摘要：', modifier)
        }
        return this._applyModifier(this._notTranslated(), false);
    },
    fediverseSharingPopPostUrl: function (modifier) {
        const context = {
            callerName: this.fediverseSharingPopPostUrl.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyModifier('Link: ', modifier, context);
        }
        else if (this.isZh()) {
            return this._applyModifier('链接：', modifier, context);
        }
        return this._applyModifier(this._notTranslated(), false);
    }
};
