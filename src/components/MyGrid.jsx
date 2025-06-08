import styles from "./MyGrid.module.css";

export function MyGrid() {
  return (
    <div className={styles.container}>
      <header className={styles.header1} />
      <header className={styles.header2} />
      <aside className={styles.aside1} />
      <aside className={styles.aside2} />

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>card 1</h2>
          <p>this is a card</p>
        </div>

        <div className={styles.card}>
          <h2>card 2</h2>
          <p>this is a card</p>
        </div>

        <div className={styles.card}>
          <h2>card 3</h2>
          <p>this is a card</p>
        </div>

        <div className={styles.card}>
          <h2>card 4</h2>
          <p>this is a card</p>
        </div>

        <div className={styles.card}>
          <h2>card 5</h2>
          <p>this is a card</p>
        </div>
      </div>

      <footer className={styles.footer2}></footer>
      <footer className={styles.footer1}></footer>
    </div>
  );
}
