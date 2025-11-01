'use strict';

function getSmSettings() {
    let smSettings = {
        debug: false
    };
    const smSettingsStr = window.localStorage.getItem('sm_settings');
    if (smSettingsStr) {
        try {
            smSettings = JSON.parse(smSettingsStr);
        } catch (error) { }
    }
    return smSettings;
}

function setSmSettings(smSettings) {
    window.localStorage.setItem('sm_settings', JSON.stringify(smSettings));
}

async function generateBase64AesKeyAsync(input) {
    const enc = new TextEncoder();
    const data = enc.encode(input);
    const hash = await crypto.subtle.digest('SHA-256', data); // ArrayBuffer (32 bytes)
    const keyBytes = new Uint8Array(hash);
    return uint8ArrayToBase64(keyBytes);
}

async function importAesKeyAsync(base64Key) {
    const keyData = base64ToUint8Array(base64Key);
    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        'AES-CTR',
        false,
        ['encrypt', 'decrypt']
    );
    return key;
}

async function aesDecryptAsync(cipherText, key, counter = new Uint8Array(16)) {
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-CTR',
            counter,
            length: 64
        },
        key,
        base64ToUint8Array(cipherText)
    );
    const decrypted = new TextDecoder().decode(decryptedBuffer);
    return decrypted;
}

function base64ToUint8Array(base64) {
    const byteString = atob(base64);
    const bytes = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        bytes[i] = byteString.charCodeAt(i);
    }
    return bytes;
}

function uint8ArrayToBase64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// https://stackoverflow.com/a/20584396
function nodeScriptReplace(node) {
    if (nodeScriptIs(node) === true) {
        node.parentNode.replaceChild(nodeScriptClone(node), node);
    }
    else {
        let i = -1, children = node.childNodes;
        while (++i < children.length) {
            nodeScriptReplace(children[i]);
        }
    }
    return node;
}
function nodeScriptClone(node) {
    const script = document.createElement('script');
    script.text = node.innerHTML;
    let i = -1, attrs = node.attributes, attr;
    while (++i < attrs.length) {
        script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    return script;
}

function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}

function fixPathname(pathnameIn) {
    let fixedPathname = pathnameIn;
    if (!fixedPathname.endsWith('/') && !fixedPathname.endsWith('.html'))
        fixedPathname += '.html'; // 为结尾不带 / 或 .html 的页面添加 .html。
    if (fixedPathname.endsWith('index.html'))
        // 页面总是写在 .html 文件中，但在浏览器中访问时以 / 结尾。
        fixedPathname = fixedPathname.replace('index.html', '');
    return fixedPathname;
}

function toggleDebugMode(val) {
    let smSettings = getSmSettings();
    smSettings.debug = val;
    setSmSettings(smSettings);
}

function setDebugModeBySearchBoxInput() {
    const searchBox = document.getElementById('tide-search-box');
    searchBox.addEventListener('input', window.tideClientUtils.debounce(function () {
        if (searchBox.value.trim().toLowerCase() === 'debugon') {
            toggleDebugMode(true);
            window.location.reload();
        } else if (searchBox.value.trim().toLowerCase() === 'debugoff') {
            toggleDebugMode(false);
            window.location.reload();
        } else {
            const match = searchBox.value.match(/^\s*debugrun\s+([\s\S]*)\s+eof\s*$/i);
            if (match && typeof window.h2lDebugTools.runCommand === 'function') {
                window.h2lDebugTools.runCommand(match[1].trim(), (msg) => { searchBox.value = msg }, (msg) => { searchBox.value = msg });
            }
        }
    }));
}

function performMirrorMod() {
    if (!window.location.hostname.startsWith('blog.hollisdevhub.com')) return;
    const pageLang = getPageLang();
    switch (pageLang) {
        case 'zh-CN':
            // document.getElementById('tide-site-title').innerHTML += '<span id="mirror-tag">[镜像站]</span>';
            // document.querySelector('#tide-navigation>ul>li:nth-child(7)>a').href = 'https://blog.hollisdevhub.com/?naj';
            break;
        case 'en':
            // document.getElementById('tide-site-title').innerHTML += '<span id="mirror-tag">[Mirror]</span>';
            // document.querySelector('#tide-navigation>ul>li:nth-child(7)>a').href = 'https://blog.hollisdevhub.com/?naj';
            break;
    }
}

// 参考 https://github.com/YunYouJun/hexo-tag-common/blob/main/js/index.js
// 额外添加 tabindex 与按键监听。
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
        const tabTargetId = element.querySelector('a').dataset.target;
        // element.role = 'tab';
        element.setAttribute('aria-controls', tabTargetId);
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
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tab_role#example
    // 结构不兼容。
    // [...document.getElementsByClassName('tabs')].forEach(e => e.role = 'tablist');
    // [...document.getElementsByClassName('tab-pane')].forEach(e => e.role = 'tabpanel');
    window.dispatchEvent(new Event('tabs:register'));
}

function addAriaRoleToCollapseControlTag() {
    let count = 0;
    const collapseControls = [...document.querySelectorAll('div.collapse-ctrl, a.collapse-ctrl')];
    for (const control of collapseControls) {
        const collapseEle = control.nextElementSibling;
        const collapseEleId = `collapse-content-${count++}`;
        collapseEle.id = collapseEleId;
        control.role = 'button';
        control.setAttribute('aria-controls', collapseEleId);
        control.setAttribute('aria-expanded', 'false');
        control.removeAttribute('onclick');
        control.addEventListener('click', function (e) {
            e.preventDefault();
            const controlled = document.getElementById(this.getAttribute('aria-controls'));
            if (controlled.classList.contains('expanded')) {
                this.setAttribute('aria-expanded', 'false');
            } else {
                this.setAttribute('aria-expanded', 'true');
            }
            collapseToggle(this);
        });
        control.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                e.preventDefault();
                const controlled = document.getElementById(this.getAttribute('aria-controls'));
                if (controlled.classList.contains('expanded')) {
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    this.setAttribute('aria-expanded', 'true');
                }
                collapseToggle(this);
            }
        });
        if (control.tagName === 'DIV') {
            control.setAttribute('tabindex', '0');
            control.addEventListener('keydown', function (e) {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    const controlled = document.getElementById(this.getAttribute('aria-controls'));
                    if (controlled.classList.contains('expanded')) {
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        this.setAttribute('aria-expanded', 'true');
                    }
                    collapseToggle(this);
                }
            });
        }
    }
}

// 修复移动端网易云音乐外链。
function fixNetEaseMusic() {
    if (window.tideClientUtils.isMobileUserAgent(navigator.userAgent)) {
        [...document.getElementsByTagName('iframe')].forEach(element => {
            if (element.src.includes('music.163.com/'))
                element.src = element.src.replace('music.163.com/', 'music.163.com/m/');
        });
    }
}

function domContentLoadedHandler(eDomContentLoaded) {
    setDebugModeBySearchBoxInput();
    performMirrorMod();
    registerTabsTag();
    addAriaRoleToCollapseControlTag();
    fixNetEaseMusic();
}

// 弃用，由 Cloudflare Workers 脚本重写 Url。
// const pathname = window.location.pathname;
// const fixedPathname = fixPathname(pathname);
// if (pathname !== fixedPathname)
//     window.location.replace(window.location.origin + fixedPathname); // 跳转。

window.h2lDebugTools = {};
if (getSmSettings().debug) {
    window.h2lDebugTools = {
        parseArgs: function (cmd) {
            const args = [];
            const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(\S+)/g;
            let match;
            while ((match = regex.exec(cmd)) !== null) {
                // match[1] 是双引号内内容，match[2] 是单引号内内容，match[3] 是普通未引号包裹的内容
                const arg = match[1] ?? match[2] ?? match[3];
                // 去掉转义符（如果有）
                args.push(arg.replace(/\\(["'\\])/g, "$1"));
            }
            return args;
        },
        runCommand: function (cmdStr, success, fail) {
            let successFunc = () => { }, failFunc = () => { };
            if (typeof success === 'function')
                successFunc = success;
            if (typeof fail === 'function')
                failFunc = fail;
            const args = this.parseArgs(cmdStr);
            if (args.length >= 1) {
                const cmd = args[0];
                const cmdArgs = args.slice(1);
                switch (cmd.toLowerCase()) {
                    case 'decrypt-blocks':
                        this.decryptBlocks(cmdArgs, successFunc, failFunc);
                        break;
                    default:
                        failFunc('unknown command');
                        break;
                }
            } else {
                failFunc('no command provided');
            }
        },
        decryptBlocks: async function (cmdArgs, success, fail) {
            if (cmdArgs.length !== 2) {
                fail('insufficient args provided to decrypt blocks');
                return;
            }
            const targetElementStr = cmdArgs[0];
            const passwordStr = cmdArgs[1];
            let targetElements = [];
            if (targetElementStr === '*') {
                targetElements = document.querySelectorAll('[id^=h2l-encrypted-].h2l-invisible-content');
            } else if (targetElementStr.startsWith('h2l-encrypted-')) {
                const element = document.querySelector(`[id=${targetElementStr}].h2l-invisible-content`);
                if (element)
                    targetElements.push();
            }
            if (targetElements.length === 0) {
                fail('no blocks to decrypt');
                return;
            }
            try {
                const aesKeyStr = await generateBase64AesKeyAsync(passwordStr);
                const aesKey = await importAesKeyAsync(aesKeyStr);
                for (const element of targetElements) {
                    const encryptedStr = element.innerText;
                    const decryptedStr = await aesDecryptAsync(encryptedStr, aesKey);
                    element.innerHTML = decryptedStr;
                    element.classList.remove('h2l-invisible-content');
                    nodeScriptReplace(element);
                }
                success('succeeded');
            } catch (error) {
                fail('failed to decrypt blocks', error);
            }
        }
    };
}

if (document.readyState !== 'loading')
    domContentLoadedHandler();
else
    document.addEventListener('DOMContentLoaded', domContentLoadedHandler);

window.addEventListener('hexo-blog-decrypt', () => {
    fixNetEaseMusic();
});
