const content = {
    'zh-CN': {
        langName: '简体中文',
        dir: 'ltr',
        'index': {
            description: '他的第二人生的站点选择页面。可选择中文站或英文站继续浏览。',
            keywords: '博客,日记,编程,影视评论',
            date: '2020-01-14T00:43:11+08:00',
            updated: '2025-11-29T16:00:40+08:00',
            hCardPName: '边宇琨',
            hCardPGivenName: '宇琨',
            hCardPFamilyName: '边',
            hCardPNickname: 'Hollis',
            hCardPNote: '2000 年 12 月 13 日，程序员',
            title: '他的第二人生',
            mirror: '镜像站',
            mirrorTag: '[镜像站]',
            source: '源站',
            funcJumpTip: function (seconds) {
                return `${seconds} 秒后自动跳转到中文站……`;
            }
        },
        '404': {
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
            keywords: 'Blog,Journal,Programming,Entertainment reviews',
            date: '2020-01-14T00:43:11+08:00',
            updated: '2025-11-29T16:00:40+08:00',
            hCardPName: 'Bian Yukun',
            hCardPGivenName: 'Yukun',
            hCardPFamilyName: 'Bian',
            hCardPNickname: 'Hollis',
            hCardPNote: 'December 13, 2000, programmer',
            title: 'His 2nd Life',
            mirror: 'Mirror site',
            mirrorTag: '[Mirror]',
            source: 'Source site',
            funcJumpTip: function (seconds) {
                return `Automatically jump to the English site after ${seconds}s…`;
            }
        },
        '404': {
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
function generateOpenGraph() {
    let tagTemplate = '';
    const keywordsArray = content[currentLang].index.keywords.split(',');
    for (const keyword of keywordsArray)
        tagTemplate += `<meta property="article:tag" content="${keyword}">\n`;
    let ogTemplate = `
    <meta property="og:type" content="website">
    <meta property="og:title" content="${content[currentLang].index.title}">
    <meta property="og:url" content="https://his2nd.life/">
    <meta property="og:site_name" content="${content[currentLang].index.title}">
    <meta property="og:description" content="${content[currentLang].index.description}">
    <meta property="og:locale" content="${currentLang}">
    <meta property="article:published_time" content="${content[currentLang].index.date}">
    <meta property="article:modified_time" content="${content[currentLang].index.updated}">
    <meta property="article:author" content="Hollis">
    ${tagTemplate}
    <meta name="twitter:card" content="summary">`;
    return ogTemplate;
}
function generateJsonLd() {
    let jsonLdTemplate = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@language": "${currentLang}",
        "headline": "${content[currentLang].index.title}",
        "description": "${content[currentLang].index.description}",
        "keywords": "${content[currentLang].index.keywords}",
        "datePublished": "${content[currentLang].index.date}",
        "dateModified": "${content[currentLang].index.updated}",
        "mainEntityOfPage": "https://his2nd.life/",
        "author": [{
          "@type": "Person",
          "name": "Hollis"
        }]
      }
    </script>`;
    return jsonLdTemplate;
}
function generateHCard() {
    let hCardTemplate = `
    <div class="h-card">
      <span class="p-name">${content[currentLang].index.hCardPName}</span>
      <span class="p-given-name">${content[currentLang].index.hCardPGivenName}</span>
      <span class="p-family-name">${content[currentLang].index.hCardPFamilyName}</span>
      <span class="p-nickname">${content[currentLang].index.hCardPNickname}</span>
      <img class="u-photo" src="https://bucket.hollisdevhub.com/avatars/avatar.webp" />
      <a class="u-url u-uid" href="https://yukun.bio/" target="_blank" rel="me">https://yukun.bio/</a>
      <a class="u-url u-uid" href="https://his2nd.life/" target="_blank" rel="me">https://his2nd.life/</a>
      <a class="u-url u-uid" href="https://m.cmx.im/@Hollis" target="_blank" rel="me noopener">https://m.cmx.im/@Hollis</a>
      <a class="u-url u-uid" href="https://github.com/bianyukun1213" target="_blank" rel="me noopener">https://github.com/bianyukun1213</a>
      <a class="u-email" href="mailto:bianyukun1213@outlook.com" target="_blank" rel="me noopener">bianyukun1213@outlook.com</a>
      <div class="p-note">${content[currentLang].index.hCardPNote}</div>
    </div>`;
    return hCardTemplate;
}