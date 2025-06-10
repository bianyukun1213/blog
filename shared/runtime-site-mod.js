function fixPathname(pathnameIn) {
    let fixedPathname = pathnameIn;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}

// 参考 https://github.com/YunYouJun/hexo-tag-common/blob/main/js/index.js
// 额外添加 tabindex、role 与按键监听。
function registerTabsTag() {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs ul.nav-tabs .tab').forEach((element) => {
        const tabClick = (event) => {
            // Prevent selected tab to select again.
            if (element.classList.contains('active')) return;
            event.preventDefault();
            // Add & Remove active class on `nav-tabs` & `tab-content`.
            [...element.parentNode.children].forEach((target) => {
                target.classList.toggle('active', target === element);
                if (target.classList.contains('active'))
                    target.removeAttribute('tabindex');
                else
                    target.setAttribute('tabindex', '0');
            });
            // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
            const tActive = document.getElementById(
                element.querySelector('a').dataset.target
            );
            [...tActive.parentNode.children].forEach((target) => {
                target.classList.toggle('active', target === tActive);
                if (target.classList.contains('active'))
                    target.removeAttribute('tabindex');
                else
                    target.setAttribute('tabindex', '0');
            });
            // Trigger event
            tActive.dispatchEvent(
                new Event('tabs:click', {
                    bubbles: true,
                })
            );
        };
        element.role = 'button';
        if (element.classList.contains('active'))
            element.removeAttribute('tabindex');
        else
            element.setAttribute('tabindex', '0');
        element.addEventListener('click', (e) => {
            tabClick(e);
        });
        element.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' || e.code === 'Space')
                tabClick(e);
        });
    });
    window.dispatchEvent(new Event('tabs:register'));
}

function addAriaRoleToCollapseControlTag() {
    const collapseControls = [...document.querySelectorAll('div.collapse-ctrl, a.collapse-ctrl')];
    for (const control of collapseControls) {
        control.role = 'button';
        control.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                e.preventDefault();
                collapseToggle(this);
            }
        });
        if (control.tagName === 'DIV') {
            control.setAttribute('tabindex', '0');
            control.addEventListener('keydown', function (e) {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    collapseToggle(this);
                }
            });
        }
    }
}

// https://github.com/unnamed42/hexo-spoiler
// bug 无法变回模糊状态。模糊状态点击链接仍然有效。
// function addAriaRoleToSpoilerTag() {
//     const collapseControls = [...document.querySelectorAll('p.spoiler, span.spoiler')];
//     for (const control of collapseControls) {
//         const setup = function (element, toggle = false) {
//             if (toggle)
//                 element.classList.toggle('spoiler');
//             if (element.classList.contains('spoiler')) {
//                 element.firstElementChild.setAttribute('aria-hidden', 'true');
//                 element.firstElementChild.childNodes.forEach((e) => {
//                     if (e.tagName === 'A')
//                         e.setAttribute('tabindex', '-1');
//                 });
//                 element.style.userSelect = 'none';
//                 element.setAttribute('tabindex', '0');
//                 element.removeAttribute('onclick');
//             } else {
//                 element.firstElementChild.removeAttribute('aria-hidden');
//                 element.firstElementChild.childNodes.forEach((e) => {
//                     if (e.tagName === 'A')
//                         e.removeAttribute('tabindex');
//                 });
//                 element.style.userSelect = 'auto';
//                 // element.removeAttribute('tabindex');
//             }
//         }
//         control.addEventListener('click', function (e) {
//             if (e.target !== this) {
//                 e.stopPropagation();
//                 return;
//             }
//             e.preventDefault();
//             setup(this, true);
//         });
//         control.addEventListener('keydown', function (e) {
//             console.log(111, e.target)
//             console.log(222, e.target)
//             console.log(333, this)
//             if (e.code === 'Enter' || e.code === 'Space') {
//                 if (e.target !== this) {
//                     e.stopPropagation();
//                     return;
//                 }
//                 e.preventDefault();
//                 setup(this, true);
//             }
//         });
//         setup(control);
//     }
// }

// 修复移动端网易云音乐外链。
function fixNetEaseMusic() {
    if (clientUtils.isMobileUserAgent(navigator.userAgent)) {
        [...document.getElementsByTagName('iframe')].forEach(element => {
            if (element.src.includes('music.163.com/'))
                element.src = element.src.replace('music.163.com/', 'music.163.com/m/');
        });
    }
}

function domContentLoadedHandler(eDomContentLoaded) {
    registerTabsTag();
    addAriaRoleToCollapseControlTag();
    fixNetEaseMusic();
}

// 弃用，由 Cloudflare Workers 脚本重写 Url。
// const pathname = window.location.pathname;
// const fixedPathname = fixPathname(pathname);
// if (pathname !== fixedPathname)
//     window.location.replace(window.location.origin + fixedPathname); // 跳转。

if (document.readyState !== 'loading')
    domContentLoadedHandler();
else
    document.addEventListener('DOMContentLoaded', domContentLoadedHandler);

window.addEventListener('hexo-blog-decrypt', () => {
    fixNetEaseMusic();
});
