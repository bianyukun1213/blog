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
                e.preventDefault();
                collapseToggle(this);
            }
        });
    }
}

// 参考 https://github.com/YunYouJun/hexo-tag-common/blob/main/js/index.js
// 额外添加 tabindex、role 与按键监听。
function registerTabsTag() {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach((element) => {
        const tabClick = () => {
            // Prevent selected tab to select again.
            if (element.classList.contains("active")) return;
            // Add & Remove active class on `nav-tabs` & `tab-content`.
            [...element.parentNode.children].forEach((target) => {
                target.classList.toggle("active", target === element);
            });
            // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
            const tActive = document.getElementById(
                element.querySelector("a").dataset.target
            );
            [...tActive.parentNode.children].forEach((target) => {
                target.classList.toggle("active", target === tActive);
            });
            // Trigger event
            tActive.dispatchEvent(
                new Event("tabs:click", {
                    bubbles: true,
                })
            );
        };
        element.role = 'button';
        element.setAttribute('tabindex', '0');
        element.addEventListener("click", function (e) {
            e.preventDefault();
            tabClick(e);
        });
        element.addEventListener("keydown", function (e) {
            if (e.code === "Enter" || e.code === "Space") {
                e.preventDefault();
                tabClick(e);
            }
        });
    });
    window.dispatchEvent(new Event("tabs:register"));
}

function domContentLoadedHandler(eDomContentLoaded) {
    fixNetEaseMusic();
    addAriaRoleToCollapseControlTag();
    registerTabsTag();
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
