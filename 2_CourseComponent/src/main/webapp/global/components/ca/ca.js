import '../inner_one/inner_one.js';

class CA extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = `
            <p>
                Component CA.
            </p>
            
            <other-component></other-component>   
        `;
        this.#shadow.innerHTML = content;
    }
}

customElements.define('my-ca', CA);
