document.documentElement.lang = currentLang;
document.documentElement.dir = content[currentLang].dir;
setColorScheme();
updateMirror();
updatePageTitle();
updatePossibleLinkTip();
function updateMirror() {
    if (location.hostname === 'blog.hollisdevhub.com') {
        const favIcon = document.querySelector('link[rel="icon"]');
        let favIconHref = favIcon.href;
        favIconHref = favIconHref.replace('https://bucket.hollisdevhub.com', 'https://bucket-eo.hollisdevhub.com');
        favIcon.href = favIconHref;
    }
}
function updatePageTitle() {
    document.getElementById('not-found-title').innerText = document.title = content[currentLang]['404'].title;
}
function updatePossibleLinkTip() {
    let excluded = [];
    // 旧浏览器不支持 URLSearchParams。
    try {
        excluded = JSON.parse(new URLSearchParams(location.search).get('excluded')) || [];
    } catch (error) {
        excluded = [];
    }
    // 把自身 url 排除。
    excluded.push(location.origin + location.pathname);
    const fromWhichSite = location.pathname.split('/')[1];
    let possibleLinks = [];
    if (fromWhichSite === 'zh-CN') {
        const possibleLink = location.origin + location.pathname.replace(fromWhichSite, 'en');
        if (!excluded.includes(possibleLink))
            possibleLinks.push(possibleLink);
    }
    else if (fromWhichSite === 'en') {
        const possibleLink = location.origin + location.pathname.replace(fromWhichSite, 'zh-CN');
        if (!excluded.includes(possibleLink))
            possibleLinks.push(possibleLink);
    }
    // 这种情况是匹配不上页面语言，比如旧的链接 pathname 开头不是 /zh-CN 或 /en。
    else {
        const possibleLinkZhCn = `${location.origin}/zh-CN${location.pathname}`;
        const possibleLinkEn = `${location.origin}/en${location.pathname}`;
        if (!excluded.includes(possibleLinkZhCn))
            possibleLinks.push(possibleLinkZhCn);
        if (!excluded.includes(possibleLinkEn))
            possibleLinks.push(possibleLinkEn);
    }
    if (possibleLinks.length > 0) {
        document.getElementById('possible-link-tip').innerText = content[currentLang]['404'].possibleLinkTip;
        for (const possibleLink of possibleLinks) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${possibleLink}?excluded=${encodeURIComponent(JSON.stringify(excluded))}">${possibleLink}</a>`;
            document.getElementById('possible-links').appendChild(li);
        }
        const li = document.createElement('li');
        li.innerHTML = `<a id="go-home" href="/">${content[currentLang]['404'].goHome}</a>`;
        document.getElementById('possible-links').appendChild(li);
    }
    else {
        document.getElementById('possible-link-tip').innerText = content[currentLang]['404'].possibleLinkTipNoLinkAvailable;
        const li = document.createElement('li');
        li.innerHTML = `<a id="go-home" href="/">${content[currentLang]['404'].goHomeNoLinkAvailable}</a>`;
        document.getElementById('possible-links').appendChild(li);
    }
}
function setColorScheme() {
    let tideSettings = localStorage.getItem('tide_settings') || '{}';
    try {
        tideSettings = JSON.parse(tideSettings);
    } catch (error) {
        tideSettings = {};
    }
    if (tideSettings.colorScheme === 'LIGHT')
        document.documentElement.dataset.colorScheme = 'light';
    else if (tideSettings.colorScheme === 'DARK')
        document.documentElement.dataset.colorScheme = 'dark';
}