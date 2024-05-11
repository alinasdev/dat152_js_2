import courseDocument from "./template.html";

class CourseInfo extends HTMLElement {
    #cssfile = "courseinfo-htmlmodule.css";
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });

        // Fetching the template element
        const template = courseDocument.querySelector("template");
        // Copying the template content into a new document
        const content = template.content.cloneNode(true);

        const path = import.meta.url.match(/.*\//)[0];
        content.querySelector("link").href = path.concat(this.#cssfile);

        this.#shadow.appendChild(content);

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
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


