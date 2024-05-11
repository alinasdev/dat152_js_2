import '../lengthreader/main.js';

import utils from '../../js/modules/utils.js';

if (customElements.get('length-converter') === undefined) {
    class LengthConverter extends HTMLElement {
        #shadow;
        #metricElement;
        #imperialElement;

        constructor() {
            super();

            this.#shadow = this.attachShadow({ mode: 'closed' });
            const template = document.querySelector('[data-name="converter"]');
            if (template === null) return;

            const content = template.content.cloneNode(true);
            this.#shadow.appendChild(content);

            this.#metricElement = this.#shadow.querySelector(
                'length-reader[data-units="meter"]'
            );
            this.#imperialElement = this.#shadow.querySelector(
                'length-reader[data-units="foot"]'
            );

            this.#metricElement.addCallback(this.#metricinput.bind(this));
            this.#imperialElement.addCallback(this.#imperialinput.bind(this));
        }

        #metricinput(input) {
            const value = input.trim();

            if (value === "") {
                this.#imperialElement.value = "";
            } else {
                const meters = parseFloat(value);
                let feet = utils.metrestofeet(meters);

                /* Workaround for Firefox, something is weird with the number
                   input element for string value 0.000 */
                if (feet == 0) {
                    this.#imperialElement.setValue("0");
                } else {
                    this.#imperialElement.setValue(feet.toPrecision(4));
                }
            }
        }

        #imperialinput(input) {
            const value = input.trim();

            if (value === "") {
                this.#metricElement.value = "";
            } else {
                const floatvalue = parseFloat(value);
                let meters = utils.feettometres(floatvalue);

                /* Workaround for Firefox, something is weird with the number
                   input element for string value 0.000 */
                if (meters == 0) {
                    this.#metricElement.setValue("0");
                } else {
                    this.#metricElement.setValue(meters.toPrecision(4));
                }
            }
        }
    }

    customElements.define('length-converter', LengthConverter);
}
