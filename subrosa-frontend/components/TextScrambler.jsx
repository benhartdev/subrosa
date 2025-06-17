"use client";

import { useEffect, useRef } from "react";
import styles from "./TextScrambler.module.css";

const phrases = [
'NOS ARTISTES VOUS OUVRENT LEURS UNIVERS',
  'DERRIÈRE CHAQUE ŒUVRE, UNE ÂME SE DÉVOILE',
  'PLONGEZ DANS DES UNIVERS SINGULIERS ET VIBRANTS',
  'ENTRE OMBRE ET LUMIÈRE, L’ART PREND LA PAROLE',
  'LA BEAUTÉ SUBTILE DES MONDES INTÉRIEURS VOUS ATTEND',
  'L’ART NE PARLE PAS, IL RÉSONNE EN VOUS',
  'DES ÉCLATS D’ÂME FIGÉS SUR LA MATIÈRE'];

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 240);
      const end = start + Math.floor(Math.random() * 240);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class=\"dud\">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const TextScrambler = () => {
  const textRef = useRef();

  useEffect(() => {
    const fx = new TextScramble(textRef.current);
    let counter = 0;

    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 4800);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  }, []);

  return <h1 ref={textRef} className={styles.dud2RomanConverter}></h1>;
};

export default TextScrambler;
