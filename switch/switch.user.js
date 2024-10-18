// ==UserScript==
// @name         switch
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @description  try to take over the world!
// @author       You
// @match        https://dev-new-edu.sbis.ru/*
// @match        https://dev-english.saby.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sbis.ru
// @run-at        document-end
// @grant         unsafeWindow
// @noframes
// ==/UserScript==
/* global unsafeWindow */


(({ document }) => {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = `
    .SDO-switch-block {
       position: fixed;
       right: 0px;
       top: 0px;
       font-size: 14px;
       background: rgb(228 190 245);
       padding: 0px 5px 5px 10px;
       border-radius: 0px 0px 0px 15px;
       cursor: pointer;
       z-index: 10000000000000000000000000000000000000;
       display: flex;
       flex-direction: column;
    }
    .SDO-switch-block .non-active {
       display:none;
    }
  `
    document.head.append(style);
    const TaperMonkeyGetCookie = (name) =>{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : false;
}
    let closed_sdo_block = true;

    let cookie_type = "rootmoodle";
    if (location.host !== 'dev-new-edu.sbis.ru') {
        cookie_type = "rootsabyenglish";
    }

    let cookie_user = TaperMonkeyGetCookie(cookie_type);
    if (cookie_user == false) cookie_user = 1;
    if (cookie_user !== false) {
        let switch_block = document.createElement("div");
        let users = ["Мичурина", "Назарова", "Иванова", "Еремычева"];
        switch_block.classList.add("SDO-switch-block");
        users.forEach((element, index) => {
            if (index == cookie_user - 1) {
                switch_block.innerHTML += `<span class="active">Выбрано: ${element}</span>`;
            } else {
                switch_block.innerHTML += `<span class="non-active">${element}</span>`;
            }
        });
        document.body.insertAdjacentElement("afterbegin", switch_block)
        let non_actives = document.querySelectorAll(".SDO-switch-block .non-active")
        let spans = document.querySelectorAll(".SDO-switch-block span")
        spans.forEach((element, index) => {
            element.addEventListener("click", (e)=>{
                let w = index + 1;
                if (w != cookie_user) {
                    document.cookie = `${cookie_type}=${w}; domain=.`+location.hostname+`; path=/; secure=true`
                    location.reload();
                }
            })
        })

        switch_block.addEventListener("click", (e)=>{
            if (closed_sdo_block) {
                non_actives.forEach((element, index) => {
                    element.style.display = "block";
                })
            } else {
                non_actives.forEach((element, index) => {
                    element.style.display = "";
                })
            }
            closed_sdo_block = !closed_sdo_block
        })
    }
})(
    // @ts-ignore
    unsafeWindow
)