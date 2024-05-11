class CourseInfo extends HTMLElement {
    #shadow;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        // If open, property "shadowRoot" will be an outside entrance to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createStyle();
        this.#createHTML();

        const bt = this.#shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    #createStyle() {
        const style = `
            div {
                border: 2px solid red;
                padding: 5px;
                margin: 10px 0;
            }

            p {
                color: blue;
        }`;
        const styleElement = document.createElement('style');
        styleElement.insertAdjacentHTML('beforeend', style);
        this.#shadow.appendChild(styleElement);
        return styleElement;
    }

    #createHTML() {
        const content = `
            <p>
                The course is <slot name="course">DAT152</slot> and the topic is <slot name="topic">JavaScript</slot>.
            </p>
            <p>
                Lecturer is <slot name="lecturer">Bjarte Kileng</slot>.
            </p>

            <button type="button">Say hello</button>
        `;
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }

    #getSlotValue(name) {
        const slotElement = this.#shadow.querySelector(`slot[name=${name}]`);
        if (slotElement == null) return null;
        if (slotElement.assignedNodes().length == 0) {
            return slotElement.textContent;
        } else {
            return slotElement.assignedNodes()[0].textContent;
        }
    }

    #sayHello() {
        const topic = this.#getSlotValue('topic');
        const course = this.#getSlotValue('course');

        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

customElements.define('course-info', CourseInfo);
