document.documentElement.lang = currentLang;
document.documentElement.dir = content[currentLang].dir;
setColorScheme();
updateHead();
updatePageTitle();
updateMirror();
updateBucket();
if (document.referrer !== '' && !document.referrer.startsWith('https://his2nd.life')) {
    let hrefZhCn = document.getElementById('link-zh-cn').getAttribute('href');
    hrefZhCn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-zh-cn').setAttribute('href', hrefZhCn);
    let hrefEn = document.getElementById('link-en').getAttribute('href');
    hrefEn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-en').setAttribute('href', hrefEn);
}
const naj = new URLSearchParams(window.location.search).get('naj');
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
function updateHead() {
    document.querySelector('meta[name="description"]').setAttribute('content', content[currentLang].index.description);
}
function updatePageTitle() {
    if (window.location.hostname === 'blog.hollisdevhub.com') {
        document.title = content[currentLang].index.title + ' ' + content[currentLang].index.mirrorTag;
        document.getElementById('site-title').innerHTML = `${content[currentLang].index.title}<span id="mirror-tag">${content[currentLang].index.mirrorTag}<span>`;
    } else {
        document.getElementById('site-title').innerHTML = document.title = content[currentLang].index.title;
    }
}
function updateMirror() {
    document.getElementById('link-mirror').innerText = content[currentLang].index.mirror;
}
function updateTip(seconds) {
    document.getElementById('jump-tip').innerText = content[currentLang].index.funcJumpTip(seconds);
}
function updateBucket() {
    const favIcon = document.querySelector('meta[rel="icon"]');
    let favIconHref = favIcon.href;
    favIconHref = favIconHref.replace('https://bucket.hollisdevhub.com', 'https://bucket-eo.hollisdevhub.com');
    favIcon.href = favIconHref;
    const profileImg = document.querySelector('img.u-photo');
    let profileImgSrc = profileImg.src;
    profileImgSrc = favIconHref.replace('https://bucket.hollisdevhub.com', 'https://bucket-eo.hollisdevhub.com');
    profileImg.src = profileImgSrc;
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