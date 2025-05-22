import styles from "./MyText.module.css";

export function MyText() {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>Meu primeiro React App</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quisquam
          modi consequatur eum, consequuntur aliquid repellendus iure quas
          exercitationem harum debitis atque, suscipit, ducimus dignissimos
          necessitatibus beatae minima dolorum quia.
        </p>
      </div>
    </div>
  );
}
