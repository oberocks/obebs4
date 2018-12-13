/*!
 * OBE Toggle Text Vanilla JavaScript Mini-Plugin v1.0.0 (https://library.mattmct.com)
 * Copyright 2018 by Matt McT Designs
 * Licensed under: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
 * (https://creativecommons.org/licenses/by-nc-sa/4.0/)
 */

// Utility function
// Source: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
var obeEscapeHtml = function(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};

// Utility function
// Source: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
var obeUnescapeHtml = function(text) {
    return text.replace(/&amp;/g, '&').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
};

// collect all the toggles
var obeTextToggles = document.querySelectorAll('[data-obe-text-toggle]');

// loop through each toggle and add click functionality
for (var i = 0; i < obeTextToggles.length; i++) {
    var el = obeTextToggles[i];
    el.addEventListener('click', function(e) {
        e.preventDefault();
        var visibleText = obeEscapeHtml(this.textContent);
        var hiddenText = obeEscapeHtml(this.dataset.obeTextToggle);
        this.innerText = obeUnescapeHtml(hiddenText);
        this.dataset.obeTextToggle = obeUnescapeHtml(visibleText);
    });
    el.addEventListener('mouseover', function(){
        this.style.cursor='pointer';
    });
    el.addEventListener('mouseout', function(){
        this.style.cursor='default';
    });
}