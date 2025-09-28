const content = {
    'zh-CN': {
        langName: '简体中文',
        dir: 'ltr',
        'index': {
            description: '他的第二人生的站点选择页面。可选择中文站或英文站继续浏览。',
            title: '他的第二人生',
            mirrorTag: '[镜像站]',
            funcJumpTip: function (seconds) {
                return `${seconds} 秒后自动跳转到中文站……`;
            }
        },
        '404': {
            description: '他的第二人生的 404 页面。你看到此页面是因为你请求的页面不存在。',
            title: '页面不存在 :(',
            possibleLinkTip: '您还可以尝试访问以下可能的链接，或返回首页：',
            possibleLinkTipNoLinkAvailable: '回去选择站点：',
            goHome: '返回首页',
            goHomeNoLinkAvailable: '咱们走！'
        }
    },
    'en': {
        langName: 'English',
        dir: 'ltr',
        'index': {
            description: 'This is the site-selection page of His 2nd Life. You can continue browsing by selecting either the Chinese site or the English site.',
            title: 'His 2nd Life',
            mirrorTag: '[Mirror]',
            funcJumpTip: function (seconds) {
                return `Automatically jump to the English site after ${seconds}s…`;
            }
        },
        '404': {
            description: 'This is the 404 page of His 2nd Life. You are seeing this because the page you requested cannot be found.',
            title: 'Page Not Found :(',
            possibleLinkTip: 'You can also try visiting the following possible link(s), or return to the index page:',
            possibleLinkTipNoLinkAvailable: 'Go back and select a site:',
            goHome: 'Return to the index page',
            goHomeNoLinkAvailable: 'Let’s go!'
        }
    }
};
let currentLang;
const langs = navigator.languages;
for (const lang of langs) {
    if (lang in content) {
        currentLang = lang;
        break;
    } else if (lang.startsWith('zh')) {
        currentLang = 'zh-CN';
        break;
    }
}
if (!currentLang) currentLang = 'en';