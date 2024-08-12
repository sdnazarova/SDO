// ==UserScript==
// @name         switch
// @namespace    http://tampermonkey.net/
// @version      2024-08-12
// @description  try to take over the world!
// @author       You
// @match        https://dev-new-edu.sbis.ru*
// @match        https://dev-english.saby.ru*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sbis.ru
// @run-at        document-end
// @grant         unsafeWindow
// @noframes
// ==/UserScript==
/* global unsafeWindow */


(({ document }) => {
    const TaperMonkeyGetCookie = (name) =>{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : false;
}

    let cookie_user = TaperMonkeyGetCookie("rootmoodle");
    if (location.host !== 'dev-new-edu.sbis.ru') {
        cookie_user = TaperMonkeyGetCookie("rootsabyenglish");
    }
    if (cookie_user == false) cookie_user = 1;
    if (cookie_user !== false) {
        let switch_block = document.createElement("span");
        let users = ["Мичурина", "Назарова", "Иванова", "Еремычева"];
        switch_block.innerText = `Режим: ${users[cookie_user - 1]}`;
        switch_block.style = `
            position: fixed;
            right: 0px;
            top: 0px;
            font-size: 14px;
            background: rgb(228 190 245);
            padding: 0px 5px 5px 10px;
            border-radius: 0px 0px 0px 15px;
            cursor: pointer;
            z-index: 10000000000000000000000000000000000000;
        `;
        switch_block.addEventListener("click", (e)=>{
            if (location.host == 'dev-new-edu.sbis.ru') location.href="/tensor/switch/"
            else  location.href="/switch/"
        })
        document.body.insertAdjacentElement("afterbegin", switch_block)
    }
})(
    // @ts-ignore
    unsafeWindow
)