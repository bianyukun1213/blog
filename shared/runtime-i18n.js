'use strict';

class SmI18n {
    constructor(lang, globalPostProcessor) {
        this.bindLang(lang);
        this.bindGlobalPostProcessor(globalPostProcessor);
    }
    _lang;
    _globalPostProcessor;
    get lang() {
        return this._lang;
    };
    bindLang(langStr) {
        if (langStr === 'en')
            this._lang = 'en';
        else
            this._lang = 'zh-CN';
    };
    bindGlobalPostProcessor(globalPostProcessor) {
        this._globalPostProcessor = globalPostProcessor;
    };
    _applyPostProcessor(string, postProcessor, context) {
        if (postProcessor === false)
            return string;
        if (typeof postProcessor === 'function')
            return postProcessor(string, this._lang, context);
        if (typeof this._globalPostProcessor === 'function')
            return this._globalPostProcessor(string, this._lang, context);
        return string;
    };
    _notTranslated() {
        return 'NOT_TRANSLATED';
    };
    isEn() {
        return this._lang === 'en' ? true : false;
    };
    isZh() {
        return this._lang === 'zh-CN' ? true : false;
    };
    langStyleClass() {
        if (this.isEn())
            return 'smui-lang-en';
        else if (this.isZh())
            return 'smui-lang-zh';
    };
    brands(brandKey, postProcessor) {
        const context = {
            callerName: this.brands.name,
            args: [brandKey]
        };
        switch (brandKey) {
            case 'GOOGLE':
                return this._applyPostProcessor('Google', postProcessor, context);
            case 'AN_INDIEWEB_WEBRING':
                return this._applyPostProcessor('An IndieWeb Webring', postProcessor, context);
            case 'GITHUB':
                return this._applyPostProcessor('GitHub', postProcessor, context);
            case 'POSTCROSSING':
                return this._applyPostProcessor('Postcrossing', postProcessor, context);
            case 'THEME_REDEFINE':
                return this._applyPostProcessor('Theme Redefine', postProcessor, context);
            case 'CALCKEY':
                return this._applyPostProcessor('Calckey', postProcessor, context);
            case 'DIASPORA':
                return this._applyPostProcessor('Diaspora', postProcessor, context);
            case 'FEDIBIRD':
                return this._applyPostProcessor('Fedibird', postProcessor, context);
            case 'FIREFISH':
                return this._applyPostProcessor('Firefish', postProcessor, context);
            case 'FOUNDKEY':
                return this._applyPostProcessor('FoundKey', postProcessor, context);
            case 'FRIENDICA':
                return this._applyPostProcessor('Friendica', postProcessor, context);
            case 'GLITCHCAFE':
                return this._applyPostProcessor('Glitchcafe', postProcessor, context);
            case 'GNU_SOCIAL':
                return this._applyPostProcessor('GNU Social', postProcessor, context);
            case 'HOMETOWN':
                return this._applyPostProcessor('Hometown', postProcessor, context);
            case 'HUBZILLA':
                return this._applyPostProcessor('Hubzilla', postProcessor, context);
            case 'KBIN':
                return this._applyPostProcessor('kbin', postProcessor, context);
            case 'MASTODON':
                return this._applyPostProcessor('Mastodon', postProcessor, context);
            case 'MEISSKEY':
                return this._applyPostProcessor('Meisskey', postProcessor, context);
            case 'MICRO_DOT_BLOG':
                return this._applyPostProcessor('micro.blog', postProcessor, context);
            case 'MISSKEY':
                return this._applyPostProcessor('Misskey', postProcessor, context);
        }
        if (this.isEn()) {
            switch (brandKey) {
                case 'BING':
                    return this._applyPostProcessor('Bing', postProcessor, context);
                case 'BAIDU':
                    return this._applyPostProcessor('Baidu', postProcessor, context);
                case 'TRAVELLINGS':
                    return this._applyPostProcessor('Travellings', postProcessor, context);
                case 'STEAM_COMMUNITY':
                    return this._applyPostProcessor('Steam Community', postProcessor, context);
            }
        }
        else if (this.isZh()) {
            switch (brandKey) {
                case 'BING':
                    return this._applyPostProcessor('必应', postProcessor, context);
                case 'BAIDU':
                    return this._applyPostProcessor('百度', postProcessor, context);
                case 'TRAVELLINGS':
                    return this._applyPostProcessor('开往', postProcessor, context);
                case 'STEAMCOMMUNITY':
                    return this._applyPostProcessor('Steam 社区', postProcessor, context);
            }
        }
        return this._applyPostProcessor(brandKey, postProcessor, context);
    };
    searchInputReverseConversionPlaceholder(postProcessor) {
        const context = {
            callerName: this.searchInputReverseConversionPlaceholder.name,
            args: []
        };
        if (this.isZh()) {
            return this._applyPostProcessor('//用此格式转换为简体//', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormTipHtml(syndications, postProcessor) {
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
            return this._applyPostProcessor(mainTip + '</p>', postProcessor, context);
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
            return this._applyPostProcessor(mainTip + '</p>', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormInputArticleUrlPlaceholder(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlPlaceholder.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('https://your-website.com/some-post.html', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('https://your-website.com/some-post.html', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormInputArticleUrlReqText(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormInputArticleUrlReqText.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Please fill in the article URL correctly!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('请有效填写文章 URL！', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormButtonSubmitHtml(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmitHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Submit', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('提交', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormButtonSubmittingHtml(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormButtonSubmittingHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Submitting <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('提交中 <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormTipSubmissionSucceeded(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionSucceeded.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Done!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('完成！', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionPostFormTipSubmissionFailed(postProcessor) {
        const context = {
            callerName: this.webmentionPostFormTipSubmissionFailed.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Failed!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('失败！', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    webmentionjsStrings(key, postProcessor) {
        const context = {
            callerName: this.webmentionjsStrings.name,
            args: [key]
        };
        if (this.isEn()) {
            return this._applyPostProcessor(key, postProcessor, context);
        }
        else if (this.isZh()) {
            switch (key) {
                case 'replied':
                    return this._applyPostProcessor('回复了', postProcessor, context);
                case 'liked':
                    return this._applyPostProcessor('喜欢了', postProcessor, context);
                case 'reposted':
                    return this._applyPostProcessor('转发了', postProcessor, context);
                case 'reacted':
                    return this._applyPostProcessor('反应了', postProcessor, context);
                case 'bookmarked':
                    return this._applyPostProcessor('加入了书签', postProcessor, context);
                case 'mentioned':
                    return this._applyPostProcessor('提及了', postProcessor, context);
                case 'RSVPed':
                    return this._applyPostProcessor('响应了事件', postProcessor, context);
                case 'followed':
                    return this._applyPostProcessor('关注了', postProcessor, context);
                case 'Responses':
                    return this._applyPostProcessor('回应', postProcessor, context);
                case 'mention':
                    return this._applyPostProcessor('提及', postProcessor, context);
                case 'Reactions':
                    return this._applyPostProcessor('反应', postProcessor, context);
            }
        }
        return this._applyPostProcessor(key, postProcessor, context);
    };
    interactionSwitchWebmentions(postProcessor) {
        const context = {
            callerName: this.interactionSwitchWebmentions.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Webmentions', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('Webmentions', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonCloseCarousel(postProcessor) {
        const context = {
            callerName: this.timelineButtonCloseCarousel.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Close carousel', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('关闭大图', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonCarouselPrevItem(postProcessor) {
        const context = {
            callerName: this.timelineButtonCarouselPrevItem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Previous media item', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('前一项', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonCarouselNextItem(postProcessor) {
        const context = {
            callerName: this.timelineButtonCarouselNextItem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Next media item', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('后一项', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonShowMore(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowMore.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('SHOW MORE', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('展开', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonShowLess(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowLess.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('SHOW LESS', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('折叠', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonShowContent(postProcessor) {
        const context = {
            callerName: this.timelineButtonShowContent.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('SHOW CONTENT', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('显示内容', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonPlayVideo(postProcessor) {
        const context = {
            callerName: this.timelineButtonPlayVideo.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('PLAY VIDEO', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('播放视频', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineLinkSeeMore(instanceHost, postProcessor) {
        const context = {
            callerName: this.timelineLinkSeeMore.name,
            args: [instanceHost]
        };
        if (this.isEn()) {
            return this._applyPostProcessor(`See more twoots at ${instanceHost}`, postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor(`在 ${instanceHost} 查看更多嘟文`, postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    timelineButtonRefresh(postProcessor) {
        const context = {
            callerName: this.timelineButtonRefresh.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Refresh', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('刷新', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    smSettingsMigratedAlert(postProcessor) {
        const context = {
            callerName: this.smSettingsMigratedAlert.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Data migration and validation result in changes to settings. You can open the settings pop-up to adjust the new settings.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('数据迁移与校验导致设置变更。您可在设置窗口调整新的设置。', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    referrerPopContent(referrerKey, postProcessor) {
        const context = {
            callerName: this.referrerPopContent.name,
            args: [referrerKey]
        };
        const referrerStr = this.brands(referrerKey);
        if (this.isEn())
            return this._applyPostProcessor(`Welcome, visitor from “${referrerStr}”!`, postProcessor, context);
        else if (this.isZh())
            return this._applyPostProcessor(`欢迎，从“${referrerStr}”过来的访客！`, postProcessor, context);
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    initPopTitle(postProcessor) {
        const context = {
            callerName: this.initPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Notice to visitors', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('访客须知', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    initPopContentHtml(minimumSupportedBrowserVersions, referrerKey, postProcessor) {
        const context = {
            callerName: this.initPopContentHtml.name,
            args: [minimumSupportedBrowserVersions, referrerKey]
        };
        if (this.isEn()) {
            let greeting = 'Hello';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `, visitor from “${this.brands(referrerKey)}”`;
            greeting += '! ';
            return this._applyPostProcessor(`
            <p>${greeting}This may be your first visit to this site.</p>
            <p>Some resources on this site are hosted abroad and may not load properly under the network environment in mainland China. If you visit this site in mainland China, it is recommended to use a proxy. Some of the features used on this site require Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}, Safari ${minimumSupportedBrowserVersions.safari}, Firefox ${minimumSupportedBrowserVersions.firefox} and above.</p>
            <p>In addition, before completing the initialization, if you want to adjust the settings such as data analytics, please click the button at the bottom left corner, otherwise the site will work with the default settings. After the initialization is completed, you can also find the settings in the lower right corner of the page.</p>
            <p>Click “${this.initPopButtonOk()}” to complete the initialization and permanently close this pop-up.</p>
            `, postProcessor, context);
        }
        else if (this.isZh()) {
            let greeting = '您好';
            if (typeof referrerKey !== 'undefined' && referrerKey !== '')
                greeting += `，从“${this.brands(referrerKey)}”过来的访客`;
            greeting += '！';
            return this._applyPostProcessor(`
            <p>${greeting}这可能是您初次访问本站。</p>
            <p>本站的部分资源托管在国外，在中国大陆的网络环境下可能无法正常加载。如果您在中国大陆访问本站，推荐使用代理。本站使用的部分特性需要 Chrome/Chromium ${minimumSupportedBrowserVersions.chrome}、Safari ${minimumSupportedBrowserVersions.safari}、Firefox ${minimumSupportedBrowserVersions.firefox} 及以上版本的支持。</p>
            <p>此外，在完成初始化前，如果您想要调整数据分析、简繁转换等设置，请点击左下角按钮，否则站点将以默认设置工作。初始化完成后，您也可以在页面右下角找到设置。</p>
            <p>点击“${this.initPopButtonOk()}”完成初始化并永久关闭本弹窗。</p>
            `, postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    initPopButtonEnterSettings(postProcessor) {
        const context = {
            callerName: this.initPopButtonEnterSettings.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Settings', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('设置', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    initPopButtonOk(postProcessor) {
        const context = {
            callerName: this.initPopButtonOk.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('OK', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('了解', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    initPopConfirmTurnOffAntiadExtension(postProcessor) {
        const context = {
            callerName: this.initPopConfirmTurnOffAntiadExtension.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Hello!\nThe initialization pop-up is detected as not being displayed. Are you using an ad-blocking plugin? This site is ad-free, but the Layui component used may be blocked by some imperfect ad-blocking rules. Please add a whitelist for this site, otherwise you may not be able to browse normally.\nAfter the pop-up loads and completes initialization, you will be informed by default and no longer be detected for ad-blocking.\n\nClick “OK” to refresh the page.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('您好！\n检测到初始化弹窗未显示。您是否使用了广告拦截插件？本站不含广告，但使用的 Layui 组件可能被某些不完善的广告拦截规则拦截。请您为本站添加白名单，否则可能无法正常浏览。\n待弹窗加载，完成初始化后，将默认您已知晓相关信息，不再检测广告拦截。\n\n点击“确定”刷新页面。', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopTitle(postProcessor) {
        const context = {
            callerName: this.settPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Settings', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('设置', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopLableDataAnalytics(postProcessor) {
        const context = {
            callerName: this.settPopLableDataAnalytics.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Data analytics', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('数据分析', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopTipDataAnalyticsHtml(trackingDetails, postProcessor) {
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
            return this._applyPostProcessor(tip + trackingResTxtWhole, postProcessor, context);
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
            return this._applyPostProcessor(tip + trackingResTxt, postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopSwitchDataAnalytics(postProcessor) {
        const context = {
            callerName: this.settPopSwitchDataAnalytics.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Allowed|Prohibited', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('已允许|已禁止', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopLableAiGeneratedExcerpt(postProcessor) {
        const context = {
            callerName: this.settPopLableAiGeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('AI-generated excerpt', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('AI 生成的摘要', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopTipAiGeneratedExcerptHtml(postProcessor) {
        const context = {
            callerName: this.settPopTipAiGeneratedExcerptHtml.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('This setting does not work for posts that do not contain an AI-generated excerpt at all.', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('有些文章本来就不包含 AI 生成的摘要，此项设置对其无效。', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopSwitchAiGeneratedExcerpt(postProcessor) {
        const context = {
            callerName: this.settPopSwitchAiGeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Shown|Hidden', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('已显示|已隐藏', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopLableChineseConversion(postProcessor) {
        const context = {
            callerName: this.settPopLableChineseConversion.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('Default interaction system', postProcessor, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyPostProcessor('简繁转换', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopTipChineseConversionHtml(postProcessor) {
        const context = {
            callerName: this.settPopTipChineseConversionHtml.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('This setting does not work for posts that do not contain an AI-generated excerpt at all.', postProcessor, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyPostProcessor('试验性，对动态加载的内容可能无效。', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopSelectOptionChineseConversion(key, postProcessor) {
        const context = {
            callerName: this.settPopSelectOptionChineseConversion.name,
            args: [key]
        };
        // if (this.isEn()) {
        //     switch (key) {
        //         case 'COMMENTS':
        //             return this._applyModifier('Comments', postProcessor, context);
        //         case 'WEBMENTIONS':
        //             return this._applyModifier('Webmentions', postProcessor, context);
        //         default:
        //             return this._applyModifier(this._notTranslated(), false);
        //     }
        // }
        // else 
        if (this.isZh()) {
            switch (key) {
                case 'DISABLED':
                    return this._applyPostProcessor('关闭', postProcessor, context);
                case 'HK':
                    return this._applyPostProcessor('转换为香港繁体', postProcessor, context);
                case 'TW':
                    return this._applyPostProcessor('转换为台湾正体', postProcessor, context);
                default:
                    return this._applyPostProcessor(this._notTranslated(), false);
            }
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopLableDefaultInteractionSystem(postProcessor) {
        const context = {
            callerName: this.settPopLableDefaultInteractionSystem.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Default interaction system', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('默认互动系统', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopSelectOptionDefaultInteractionSystem(key, postProcessor) {
        const context = {
            callerName: this.settPopSelectOptionDefaultInteractionSystem.name,
            args: [key]
        };
        if (this.isEn()) {
            switch (key) {
                case 'COMMENTS':
                    return this._applyPostProcessor('Comments', postProcessor, context);
                case 'WEBMENTIONS':
                    return this._applyPostProcessor('Webmentions', postProcessor, context);
                default:
                    return this._applyPostProcessor(this._notTranslated(), false);
            }
        }
        else if (this.isZh()) {
            switch (key) {
                case 'COMMENTS':
                    return this._applyPostProcessor('评论', postProcessor, context);
                case 'WEBMENTIONS':
                    return this._applyPostProcessor('Webmentions', postProcessor, context);
                default:
                    return this._applyPostProcessor(this._notTranslated(), false);
            }
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopButtonClearLocalStorage(postProcessor) {
        const context = {
            callerName: this.settPopButtonClearLocalStorage.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Clear local storage', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('清除本地存储', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopConfirmStorageClear(postProcessor) {
        const context = {
            callerName: this.settPopConfirmStorageClear.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('All settings will be lost and the site will reinitialize, do you want to continue?', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('所有设置都将丢失，站点将重新初始化，是否继续？', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    settPopButtonSave(postProcessor) {
        const context = {
            callerName: this.settPopButtonSave.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Save & refresh', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('保存并刷新', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    pageContentIconTitleSwitchLang(postProcessor) {
        const context = {
            callerName: this.pageContentIconTitleSwitchLang.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Switch language', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('切换语言', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    langSwitchPopTitle(postProcessor) {
        const context = {
            callerName: this.langSwitchPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Switch language', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('切换语言', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    langSwitchPopLableAvailableLangs(postProcessor) {
        const context = {
            callerName: this.langSwitchPopLableAvailableLangs.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Available in', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('可用语言', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    langSwitchPopSelectOptionLang(langKey, postProcessor) {
        const context = {
            callerName: this.langSwitchPopSelectOptionLang.name,
            args: [langKey]
        };
        switch (langKey) {
            case 'en':
                return this._applyPostProcessor('English', postProcessor, context);
            case 'zh-CN':
                return this._applyPostProcessor('简体中文', postProcessor, context);
            default:
                return this._applyPostProcessor(langKey, false);
        }
    };
    langSwitchPopButtonSetChineseConversion(postProcessor) {
        const context = {
            callerName: this.langSwitchPopButtonSetChineseConversion.name,
            args: []
        };
        // if (this.isEn()) {
        //     return this._applyModifier('Settings', postProcessor, context);
        // }
        // else 
        if (this.isZh()) {
            return this._applyPostProcessor('设置简繁转换', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    langSwitchPopButtonSwitch(postProcessor) {
        const context = {
            callerName: this.langSwitchPopButtonSwitch.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Switch', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('切换', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    pageContentIconTitleShareOnFediverse(postProcessor) {
        const context = {
            callerName: this.pageContentIconTitleShareOnFediverse.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Share on Fediverse', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('分享到联邦宇宙', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(postProcessor), false);
    };
    fediverseSharingPopTitle(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Share on Fediverse', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('分享到联邦宇宙', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopLableInstance(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopLableInstance.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Instance', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('实例', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopInputInstancePlaceholder(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopInputInstancePlaceholder.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('your-instance.domain', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('your-instance.domain', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopInputInstanceReqText(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopInputInstanceReqText.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Please fill in the instance correctly!', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('请有效填写实例！', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopLableSoftware(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopLableSoftware.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Software', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('平台', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopButtonShare(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopButtonShare.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Share', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('分享', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopPostTitle(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostTitle.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Title: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('标题：', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopPostExcerpt(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Excerpt: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('摘要：', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopPostAigeneratedExcerpt(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostAigeneratedExcerpt.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('AI-generated excerpt: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('AI 生成的摘要：', postProcessor)
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    };
    fediverseSharingPopPostUrl(postProcessor) {
        const context = {
            callerName: this.fediverseSharingPopPostUrl.name,
            args: []
        };
        if (this.isEn()) {
            return this._applyPostProcessor('Link: ', postProcessor, context);
        }
        else if (this.isZh()) {
            return this._applyPostProcessor('链接：', postProcessor, context);
        }
        return this._applyPostProcessor(this._notTranslated(), false);
    }
};
