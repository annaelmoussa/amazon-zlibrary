// ==UserScript==
// @name         Amazon to Z-library
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add link to libgen on all ebook products
// @author       Niks
// @match        https://www.amazon.*/*
// @match        https://www.amazon.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var asin = document.getElementById("ASIN") || document.getElementsByName("ASIN.0")[0];
    if (asin) {

        var button = document.querySelector("div.a-button-stack");
        var name = document.querySelector("h1 > span#ebooksProductTitle");
        name = encodeURI(name.innerText.replace(/ *\([^)]*\) */g, ""))

        var span1 = document.createElement("span");
        span1.setAttribute("class", "a-button a-button-normal a-button-base wl-info-aa_buying_options_button");

        var span2 = document.createElement("span");
        span2.setAttribute("class", "a-button-inner")

        span1.appendChild(span2);

        var a = document.createElement("a");
        a.setAttribute("href", "https://b-ok.cc/s/?q=" + name);
        a.setAttribute("class", "a-button-text");
        a.setAttribute("target", "_blank");
        a.setAttribute("role", "button");
        a.appendChild(document.createTextNode("See on Z-library"));

        span2.appendChild(a);

        button.appendChild(span1);
    }


})();
