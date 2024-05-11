import '../inner_two/inner_two.js';

class CB extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = `
            <p>
                Component CB.
            </p>
            <other-component></other-component>   
        `;
        this.#shadow.innerHTML = content;
    }
}

customElements.define('my-cb', CB);
