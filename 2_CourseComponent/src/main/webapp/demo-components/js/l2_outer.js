"use strict";

function init1() {
    const allPElements = document.querySelectorAll('p');
    allPElements.forEach(element => { element.style.color = 'yellow' });
}

function init2() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => { element.style.color = 'green' });
}

function init() {
    document.querySelector("button[data-p]").addEventListener("click", init1);
    document.querySelector("button[data-all]").addEventListener("click", init2)
}

document.addEventListener('DOMContentLoaded', init);