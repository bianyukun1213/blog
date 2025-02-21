// 修复移动端网易云音乐外链。
if (clientUtils.isMobileUserAgent(navigator.userAgent)) {
    [...document.getElementsByTagName('iframe')].forEach(element => {
        if (element.src.includes('music.163.com/'))
            element.src = element.src.replace('music.163.com/', 'music.163.com/m/');
    });
}