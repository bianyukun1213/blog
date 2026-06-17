document.documentElement.lang = currentLang;
document.documentElement.dir = content[currentLang].dir;
setColorScheme();
updateMirror();
updateHead();
updatePageTitle();
updateHCard();
if (document.referrer !== '' && !document.referrer.startsWith('https://archived.his2nd.life') && !document.referrer.startsWith('https://h2l-archived.hollisdevhub.com')) {
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
function updateHead() {
    document.querySelector('meta[name="description"]').setAttribute('content', content[currentLang].index.description);
    const keywordsEle = document.querySelector('meta[name="keywords"]');
    keywordsEle.setAttribute('content', content[currentLang].index.keywords);
    document.querySelectorAll('meta[property^="og"],meta[property^="article"],meta[name^="twitter"],script[type="application/ld+json"]').forEach(e => e.remove());
    keywordsEle.insertAdjacentHTML('afterend', generateOpenGraph() + generateJsonLd());
}
function updatePageTitle() {
    document.getElementById('site-title').innerHTML = document.title = content[currentLang].index.title;
}
function updateHCard() {
    document.querySelector('.h-card').remove();
    document.getElementById('content-container').insertAdjacentHTML('afterbegin', generateHCard());
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