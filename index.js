function updatePageTitle() {
    const lang = document.getElementsByTagName('html')[0].lang;
    if (lang === 'zh-CN')
        document.getElementById("site-title").innerText = document.title = '他的第二人生';
    else
        document.getElementById("site-title").innerText = document.title = 'His 2nd Life';
}
function updateTip(seconds) {
    const lang = document.getElementsByTagName('html')[0].lang;
    if (lang === 'zh-CN')
        document.getElementById('jump-tip').innerText = `${seconds} 秒后自动跳转到中文站……`;
    else
        document.getElementById('jump-tip').innerText = `Automatically jump to English site after ${seconds}s…`;
}
let lang = '';
if (navigator.language.startsWith('zh'))
    // if (true)
    lang = 'zh-CN';
else
    lang = 'en';
document.getElementsByTagName('html')[0].lang = lang;
updatePageTitle();
let secondsRemain = 5;
setInterval(() => {
    if (secondsRemain <= 0) {
        window.location.pathname = `/${lang}`;
        return; // 距离跳转还有短暂的一点时间，不再更新秒数。
    }
    updateTip(secondsRemain--);
}, 1000);
