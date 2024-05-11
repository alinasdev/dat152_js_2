class InnerOne extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = `
            <p>
                Component inner-two.
            </p>            
        `;
        this.#shadow.innerHTML = content;
    }
}

customElements.define('other-component', InnerOne);
