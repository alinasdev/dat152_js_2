// import courseDocument from "./template.html";
import loadHTML from "./loaddocument.js";

class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-templateajax.css";
    #htmltemplate = 'template.html';
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });

        this.#makeDocument();
    }

    async #makeDocument() {
        try {
            const path = import.meta.url.match(/.*\//)[0];
            const courseDocument = await loadHTML(`${path}${this.#htmltemplate}`);

            // Fetching the template element
            const template = courseDocument.querySelector("template");

            // Copying the template content into a new document.
            const content = template.content.cloneNode(true);
            content.querySelector("link").href = `${path}${this.#cssfile}`;

            this.#shadow.appendChild(content);

            const bt = this.#shadow.querySelector('button[type=button]');
            bt.addEventListener('click', this.#sayHello.bind(this));
        } catch (e) { console.log(e) }
    }


    #getSlotValue(name) {
        const slotElement = this.#shadow.querySelector(`slot[name=${name}]`);
        if (slotElement == null) return null;
        return slotElement.assignedElements({ flatten: true })[0].textContent;
    }

    #sayHello() {
        const topic = this.#getSlotValue('topic');
        const course = this.#getSlotValue('course');

        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

// Create tag <course-info> for the new element
customElements.define('course-info', CourseInfo);
