'use strict';

const smI18n = {
    getSiteLang: function () {
        return window.location.pathname.split('/')[1];
    },
    notTranslated: function () {
        return 'NOT_TRANSLATED';
    },
    isEn: function () {
        return this.getSiteLang() === 'en' ? true : false;
    },
    isZh: function () {
        return this.getSiteLang() === 'zh-CN' ? true : false;
    },
    langStyleClass: function () {
        if (this.isEn())
            return 'smui-lang-en';
        if (this.isZh())
            return 'smui-lang-zh';
    },
    webmentionPostFormTipHtml: function () {
        if (this.isEn()) {
            return '<p>If you have written a Response to this article, you can submit the article URL here to send me a Webmention.</p>';
        }
        if (this.isZh()) {
            return '<p>如果你给本文写了回应，可以在此提交文章 URL 以向我发送 Webmention。</p>';
        }
        return this.notTranslated();
    },
    webmentionPostFormInputArticleUrlPlaceholder: function () {
        if (this.isEn()) {
            return 'https://your-website.com/some-post.html';
        }
        if (this.isZh()) {
            return 'https://your-website.com/some-post.html';
        }
        return this.notTranslated();
    },
    webmentionPostFormInputArticleUrlReqText: function () {
        if (this.isEn()) {
            return 'Please fill in the article URL!';
        }
        if (this.isZh()) {
            return '请填写文章 URL！';
        }
        return this.notTranslated();
    },
    webmentionPostFormButtonSubmit: function () {
        if (this.isEn()) {
            return 'Submit';
        }
        if (this.isZh()) {
            return '提交';
        }
        return this.notTranslated();
    },
    webmentionjsStrings: function (key) {
        if (this.isEn()) {
            return key;
        }
        if (this.isZh()) {
            switch (key) {
                case 'replied':
                    return '回复了';
                case 'liked':
                    return '喜欢了';
                case 'reposted':
                    return '转发了';
                case 'reacted':
                    return '反应了';
                case 'bookmarked':
                    return '加入了书签';
                case 'mentioned':
                    return '提及了';
                case 'RSVPed':
                    return '响应了事件';
                case 'followed':
                    return '关注了';
                case 'Responses':
                    return '回应';
                case 'mention':
                    return '提及';
                case 'Reactions':
                    return '反应';
                default:
                    return key;
            }
        }
        return key;
    },
    interactionSwitchWebmentions: function () {
        if (this.isEn()) {
            return 'Webmentions';
        }
        if (this.isZh()) {
            return 'Webmentions';
        }
        return this.notTranslated();
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
    settPopLableAiGeneratedExcerpt: function () {
        if (this.isEn()) {
            return 'AI-generated Excerpt';
        }
        if (this.isZh()) {
            return 'AI 生成的摘要';
        }
        return this.notTranslated();
    },
    settPopTipAiGeneratedExcerptHtml: function () {
        if (this.isEn()) {
            return 'This setting does not work for posts that do not contain an AI-generated excerpt at all.';
        }
        if (this.isZh()) {
            return '有些文章本来就不包含 AI 生成的摘要，此项设置对其无效。';
        }
        return this.notTranslated();
    },
    settPopSwitchAiGeneratedExcerpt: function () {
        if (this.isEn()) {
            return 'Shown|Hidden';
        }
        if (this.isZh()) {
            return '已显示|已隐藏';
        }
        return this.notTranslated();
    },
    settPopLableDefaultInteractionSystem: function () {
        if (this.isEn()) {
            return 'Default Interaction System';
        }
        if (this.isZh()) {
            return '默认互动系统';
        }
        return this.notTranslated();
    },
    settPopSelectOptionDefaultInteractionSystem: function (key) {
        if (this.isEn()) {
            switch (key) {
                case 'COMMENTS':
                    return 'Comments';
                case 'WEBMENTIONS':
                    return 'Webmentions';
                default:
                    return this.notTranslated();
            }
        }
        if (this.isZh()) {
            switch (key) {
                case 'COMMENTS':
                    return '评论';
                case 'WEBMENTIONS':
                    return 'Webmentions';
                default:
                    return this.notTranslated();
            }
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
            return '可用语言';
        }
        return this.notTranslated();
    },
    langSwitchPopSelectOptionLang: function (langKey) {
        switch (langKey) {
            case 'en':
                return 'English';
            case 'zh-CN':
                return '简体中文';
            default:
                return langKey;
        }
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
