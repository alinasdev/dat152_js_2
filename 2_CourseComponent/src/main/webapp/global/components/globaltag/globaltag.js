export default class extends HTMLElement {
    #shadow;

    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = `
            <p>
                This is a component for test of the global nature of HTML tags.
            </p>
        `;
        this.#shadow.innerHTML = content;
    }
}
