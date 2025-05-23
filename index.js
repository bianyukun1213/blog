document.documentElement.lang = currentLang;
document.documentElement.dir = content[currentLang].dir;
setColorScheme();
updatePageTitle();
updateHead();
if (document.referrer !== '') {
    let hrefZhCn = document.getElementById('link-zh-cn').getAttribute('href');
    hrefZhCn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-zh-cn').setAttribute('href', hrefZhCn);
    let hrefEn = document.getElementById('link-en').getAttribute('href');
    hrefEn += '?referrer=' + encodeURIComponent(document.referrer);
    document.getElementById('link-en').setAttribute('href', hrefEn);
}
if (new URLSearchParams(window.location.search).get('noAutoJump') !== 'true') {
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
function updateHead() {
    document.querySelector('meta[name="description"]').setAttribute('content', content[currentLang].index.description);
}
function updatePageTitle() {
    document.getElementById('site-title').innerText = document.title = content[currentLang].index.title;
}
function updateTip(seconds) {
    document.getElementById('jump-tip').innerText = content[currentLang].index.funcJumpTip(seconds);
}