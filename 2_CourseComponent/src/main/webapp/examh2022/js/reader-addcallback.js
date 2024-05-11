import '../components/lengthreader/main.js';

class CommDemo {

    #spanElement;
    #reader;

    constructor() {
        const rootElement = document.getElementById("root");
        this.#spanElement = rootElement.querySelector('span');
        this.#reader = rootElement.querySelector('length-reader');

        this.#reader.addCallback(this.#updateSpan.bind(this));
    }

    #updateSpan(value) {
        this.#spanElement.textContent = value;
    }
}

new CommDemo;