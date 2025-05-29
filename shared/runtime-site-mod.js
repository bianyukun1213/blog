function fixPathname(pathnameIn) {
    let fixedPathname = pathnameIn;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}

// 修复移动端网易云音乐外链。
function fixNetEaseMusic() {
    if (clientUtils.isMobileUserAgent(navigator.userAgent)) {
        [...document.getElementsByTagName('iframe')].forEach(element => {
            if (element.src.includes('music.163.com/'))
                element.src = element.src.replace('music.163.com/', 'music.163.com/m/');
        });
    }
}

function addAriaRoleToCollapseControlTag() {
    const collapseControls = [...document.querySelectorAll('div.collapse-ctrl, a.collapse-ctrl')];
    for (const control of collapseControls) {
        control.role = 'button';
        control.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                e.preventDefault;
                collapseToggle(this);
            }
        });
    }
}

function domContentLoadedHandler(eDomContentLoaded) {
    fixNetEaseMusic();
    addAriaRoleToCollapseControlTag();
}

const pathname = window.location.pathname;
const fixedPathname = fixPathname(pathname);
if (pathname !== fixedPathname)
    window.location.replace(window.location.origin + fixedPathname); // 跳转。

if (document.readyState !== 'loading')
    domContentLoadedHandler();
else
    document.addEventListener('DOMContentLoaded', domContentLoadedHandler);

window.addEventListener('hexo-blog-decrypt', () => {
    fixNetEaseMusic();
});
