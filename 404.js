function updatePageTitle() {
    const lang = document.getElementsByTagName('html')[0].lang;
    if (lang === 'zh-CN')
        document.getElementById('not-found-title').innerText = document.title = '页面不存在 :(';
    else
        document.getElementById('not-found-title').innerText = document.title = 'Page Not Found :(';
}
function updatePossibleLinkTip() {
    let excluded = [];
    // 旧浏览器不支持 URLSearchParams。
    try {
        excluded = JSON.parse(new URLSearchParams(window.location.search).get('excluded')) || [];
    } catch (error) {
        excluded = [];
    }
    // 把自身 url 排除。
    excluded.push(window.location.origin + window.location.pathname);
    const lang = document.getElementsByTagName('html')[0].lang;
    const fromWhichSite = window.location.pathname.split('/')[1];
    let possibleLinks = [];
    if (fromWhichSite === 'zh-CN') {
        const possibleLink = window.location.origin + window.location.pathname.replace(fromWhichSite, 'en');
        if (!excluded.includes(possibleLink))
            possibleLinks.push(possibleLink);
    }
    else if (fromWhichSite === 'en') {
        const possibleLink = window.location.origin + window.location.pathname.replace(fromWhichSite, 'zh-CN');
        if (!excluded.includes(possibleLink))
            possibleLinks.push(possibleLink);
    }
    // 这种情况是匹配不上页面语言，比如旧的链接 pathname 开头不是 /zh-CN 或 /en。
    else {
        const possibleLinkZhCn = `${window.location.origin}/zh-CN${window.location.pathname}`;
        const possibleLinkEn = `${window.location.origin}/en${window.location.pathname}`;
        if (!excluded.includes(possibleLinkZhCn))
            possibleLinks.push(possibleLinkZhCn);
        if (!excluded.includes(possibleLinkEn))
            possibleLinks.push(possibleLinkEn);
    }
    if (possibleLinks.length > 0) {
        if (lang === 'zh-CN')
            document.getElementById('possible-link-tip').innerText = '您还可以尝试访问以下可能的链接，或返回首页：';
        else
            document.getElementById('possible-link-tip').innerText = 'You can also try visiting the following possible link(s), or return to the index page:';
        for (const possibleLink of possibleLinks) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${possibleLink}?excluded=${encodeURIComponent(JSON.stringify(excluded))}">${possibleLink}</a>`;
            document.getElementById('possible-links').appendChild(li);
        }
        const li = document.createElement('li');
        li.innerHTML = `<a href="/">${lang === 'zh-CN' ? '返回首页' : 'Return to the index page'}</a>`;
        document.getElementById('possible-links').appendChild(li);
    }
    else {
        if (lang === 'zh-CN')
            document.getElementById('possible-link-tip').innerText = '回去选择站点：';
        else
            document.getElementById('possible-link-tip').innerText = 'Go back and select a site:';
        const li = document.createElement('li');
        li.innerHTML = `<a href="/">${lang === 'zh-CN' ? '咱们走！' : 'Let’s go!'}</a>`;
        document.getElementById('possible-links').appendChild(li);
    }
}
let lang = '';
if (navigator.language.startsWith('zh'))
    // if (true)
    lang = 'zh-CN';
else
    lang = 'en';
document.getElementsByTagName('html')[0].lang = lang;
updatePageTitle();
updatePossibleLinkTip();
