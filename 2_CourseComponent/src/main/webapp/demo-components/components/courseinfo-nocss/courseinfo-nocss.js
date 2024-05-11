class CourseInfo extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(this.#content);

        const bt = shadow.querySelector('button[type=button]');
        bt.addEventListener('click', this.#sayHello.bind(this));
    }

    get #content() {
        const root = document.createElement('div');
        const course = this.getAttribute('data-course');
        const topic = this.getAttribute('data-topic');
        const lecturer = this.getAttribute('data-lecturer');

        const content = `
            <p>
                The course is ${course} and the topic is ${topic}.
            </p>
            <p>
                Lecturer is ${lecturer}.
            </p>

            <button type="button">Say hello</button>
        `;

        root.insertAdjacentHTML('beforeend', content);
        return root;
    }

    #sayHello() {
        const topic = this.getAttribute('data-topic');
        const course = this.getAttribute('data-course');
        alert(`Welcome to the ${topic} topic of ${course}`);
    }
}

// Create tag <course-info data-course='...' data-topic='...' data-lecturer='...'> for the new element
customElements.define('course-info', CourseInfo);

