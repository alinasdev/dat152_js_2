import utils from '../../js/modules/utils.js';

if (customElements.get('length-reader') === undefined) {
    class LengthReader extends HTMLElement {
        #shadow;
        #callbacks = new Map();
        #callbackId = 0;

        constructor() {
            super();

            //const language = navigator.language;
            // Hard coding the language for the DAT152 demonstration, as my browser uses nb-NO
            const language = "en-GB";
            if (language === undefined) {
                language = "en-GB";
            }

            this.#shadow = this.attachShadow({ mode: 'closed' });
            let template = document.querySelector(
                `[data-name="length-reader"][data-language="${language}"]`
            );
            if (template === null) {
                template = document.querySelector('[data-name="length-reader"]');
            }
            if (template === null) return;

            const content = template.content.cloneNode(true);
            this.#shadow.appendChild(content);
            if (this.hasAttribute('data-units')) {
                let unit = this.getAttribute('data-units').trim();
                unit = utils.unitInLanguage(unit, language);
                const elmUnits = this.#shadow.querySelector("span[data-units]");
                elmUnits.textContent = unit;
            }

            this.#shadow.querySelector("input").addEventListener(
                "input", this.#oninput.bind(this)
            );
        }

        addCallback(callback) {
            this.#callbacks.set(this.#callbackId, callback);
            const prevId = this.#callbackId;
            ++this.#callbackId;
            return prevId;
        }

        #oninput() {
            const value = this.#shadow.querySelector("input").value;
            this.#callbacks.forEach(
                callback => { callback(value) }
            );
        }

        setValue(length) {
            this.#shadow.querySelector("input").value = length;
        }
    }

    customElements.define('length-reader', LengthReader);
}
