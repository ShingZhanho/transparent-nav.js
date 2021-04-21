// ==UserScript==
// @name         Transparent Navigation Bar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Transform supported site's navigation bar into an acrylic nav bar.
// @author       Z.H. Shing
// @match        https://*/*
// @match        http://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    const currentDomain = window.location.hostname;
    const path = window.location.pathname;
    const fullPath = currentDomain + path;


    // commonly used styles
    const commonStyles = {
        whiteBackgroundColor: 'rgba(255, 255, 255, 0.7)',
        blackBackgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilters: 'blur(50px) saturate(180%)'
    };


    // matching
    // You should add supported sites here. All items shall be sorted alphabetically.

    // Cambridge Dictionary
    if (currentDomain.match(/dictionary\.cambridge\.org/) !== null) cambridgeDictionary();

    // Google Search
    if (fullPath.match(/www\.google\..*\/search/) !== null) googleSearch();

    // UK Royal Family
    if (currentDomain.match(/www\.royal\.uk/) !== null) ukRoyalFamily();

    // W3Schools
    if (currentDomain.match(/www\.w3schools\.com/) !== null) wThreeSchools();



    // applies styles
    // Define functions for applying styles for your sites
    function cambridgeDictionary() {
        let navBar = document.querySelector('#header');
        navBar.style.background = 'rgba(29, 42, 87, 0.7)';
        navBar.style.backdropFilter = commonStyles.backdropFilters;

        // Remove sub item style override
        let navChildren = navBar.querySelectorAll(':scope > div')
        for (let i = 0; i < navChildren.length; i++) {
            let subElement = navChildren[i];
            subElement.classList.remove('bh');
            subElement.classList.remove('bs');
        }

        // Fix navbar text colour
        let navLinks = document.querySelectorAll('li.hdib');
        for (let i = 0; i < navLinks.length - 1; i++) {
            navLinks[i].childNodes[0].style.color = 'white';
        }
    }

    function googleSearch() {
        // Finds the navigation bar
        let navBar = document.querySelector('div.sfbg'); // Google search
        if (navBar === null) navBar = document.querySelector('#kO001e'); // Google image search

        applyStyleToNavBar(navBar, true);
    }

    function ukRoyalFamily() {
        let navBar = document.querySelector('#nav-main');

        applyStyleToNavBar(navBar, true);
    }

    function wThreeSchools() {
        let navBar = document.querySelector('#topnav');
        navBar.style.background = 'rgba(95, 95, 95, 0.7)';
        navBar.style.backdropFilter = commonStyles.backdropFilters;
    }


    // commonly used functions
    function applyStyleToNavBar(navBar, applyWhiteBg = true) {
        navBar.style.background = applyWhiteBg ? commonStyles.whiteBackgroundColor : commonStyles.blackBackgroundColor;
        navBar.style.backdropFilter = commonStyles.backdropFilters;
    }
})();