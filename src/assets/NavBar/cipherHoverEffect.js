import { useState, useRef } from "react";

function cipherHover(plain, cipher) {
    const [display, setDisplay] = useState(plain);
    const intervalRef = useRef(null);

    const SHIFT_INTERVAL = 67; // ms

    const randomChar = (originalChar) => {
        if (originalChar === " ") return " ";

        const isUpper = originalChar === originalChar.toUpperCase();

        const base = isUpper ? 65 : 97;
        return String.fromCharCode(base + Math.floor(Math.random() * 26));
    };

    const animate = (from, to) => {
        clearInterval(intervalRef.current);

        const chars = from.split("");
        const target = to.split("");

        const indices = [...Array(chars.length).keys()];

        // // shuffle order
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        let step = 0;

        intervalRef.current = setInterval(() => {
            const newChars = [...chars];

            for (let i = 0; i < chars.length; i++) {
                const idx = indices[i];

                if (i < step) {
                    newChars[idx] = target[idx];
                } else if (i === step) {
                    newChars[idx] = randomChar(chars[idx]);
                }
            }

            setDisplay(newChars.join(""));
            step++;

            if (step >= chars.length) {
                clearInterval(intervalRef.current);
                setDisplay(to);
            }
        }, SHIFT_INTERVAL);
    };

    const toCipher = () => animate(display, cipher);
    const toPlain = () => animate(display, plain);

    return { display, toCipher, toPlain };
}

export default cipherHover