document.documentElement.lang = currentLang;
document.documentElement.dir = content[currentLang].dir;
setColorScheme();
updateMirror();
updateHead();
updatePageTitle();
updateMirror();
if (document.referrer !== '' && !document.referrer.startsWith('https://his2nd.life') && !document.referrer.startsWith('https://blog.hollisdevhub.com')) {
    let hrefZhCn = document.getElementById('link-zh-cn').getAttribute('href');
    hrefZhCn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-zh-cn').setAttribute('href', hrefZhCn);
    let hrefEn = document.getElementById('link-en').getAttribute('href');
    hrefEn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-en').setAttribute('href', hrefEn);
}
const naj = new URLSearchParams(location.search).get('naj');
if (naj !== 'true' && naj !== '') {
    let secondsRemain = 5;
    setInterval(() => {
        if (secondsRemain <= 0) {
            if (currentLang === 'zh-CN')
                document.getElementById('link-zh-cn').click();
            else
                document.getElementById('link-en').click();
            return; // 距离跳转还有短暂的一点时间，不再更新秒数。
        }
        updateTip(secondsRemain--);
    }, 1000);
}
function updateMirror() {
    const mirrorLink = document.getElementById('link-mirror');
    mirrorLink.innerText = content[currentLang].index.mirror;
    if (location.hostname === 'blog.hollisdevhub.com') {
        mirrorLink.parentElement.style.display = 'none';
        const favIcon = document.querySelector('link[rel="icon"]');
        let favIconHref = favIcon.href;
        favIconHref = favIconHref.replace('https://bucket.hollisdevhub.com', 'https://bucket-eo.hollisdevhub.com');
        favIcon.href = favIconHref;
        // const profileImg = document.querySelector('img.u-photo');
        // let profileImgSrc = profileImg.src;
        // profileImgSrc = favIconHref.replace('https://bucket.hollisdevhub.com', 'https://bucket-eo.hollisdevhub.com');
        // profileImg.src = profileImgSrc;
    }
}
function updateHead() {
    document.querySelector('meta[name="description"]').setAttribute('content', content[currentLang].index.description);
    const keywordsEle = document.querySelector('meta[name="keywords"]');
    keywordsEle.setAttribute('content', content[currentLang].index.keywords);
    document.querySelectorAll('meta[property^="og"],meta[property^="article"],meta[name^="twitter"],script[type="application/ld+json"]').forEach(e => e.remove());
    keywordsEle.insertAdjacentHTML('afterend', generateOpenGraph() + generateJsonLd());
}
function updatePageTitle() {
    if (location.hostname === 'blog.hollisdevhub.com') {
        document.title = content[currentLang].index.title + ' ' + content[currentLang].index.mirrorTag;
        document.getElementById('site-title').innerHTML = `${content[currentLang].index.title}<span id="mirror-tag">${content[currentLang].index.mirrorTag}<span>`;
    } else {
        document.getElementById('site-title').innerHTML = document.title = content[currentLang].index.title;
    }
}
function updateTip(seconds) {
    document.getElementById('jump-tip').innerText = content[currentLang].index.funcJumpTip(seconds);
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