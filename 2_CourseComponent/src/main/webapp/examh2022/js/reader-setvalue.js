import '../components/lengthreader/main.js';

class CommDemo {

    #reader;

    constructor() {
        const rootElement = document.getElementById("root");
        this.#reader = rootElement.querySelector("length-reader");
        const button = rootElement.querySelector("button");
        button.addEventListener("click", this.#getRandomValue.bind(this));
    }

    #getRandomValue() {
        const value = Math.random() * 1000;
        this.#reader.setValue(value);
    }
}

new CommDemo;