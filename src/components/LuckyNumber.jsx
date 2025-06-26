import styles from "./LuckyNumber.module.css";

import { useState } from "react";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [msg, setMsg] = useState("");

  function handleClick() {
    var n = Math.ceil(Math.random() * 31);
    setLuckyNumber(n);

    if (numbers.includes(n)) {
      setMsg(`The number ${n} is already picked!`);
    } else {
      setNumbers([...numbers, n]);
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? <h1>Contador = {luckyNumber}</h1> : <h1>Contador = 🎲</h1>}

      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClick}>
          I'm feeling lucky today!
        </button>

        <button
          className={styles.button}
          onClick={() => {
            setLuckyNumber(0);
            setNumbers([]);
            setMsg("");
          }}
        >
          RESET
        </button>
      </div>

      {msg && <p>{msg}</p>}

      {numbers.length > 0 && (
        <div>
          <h3>Lucky Numbers:</h3>
          <p>[{numbers.toString()}]</p>
        </div>
      )}
    </div>
  );
}
