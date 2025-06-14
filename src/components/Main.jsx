import styles from "./Main.module.css";

export function Main() {
  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.imageContainer}>
            <img src={`https://picsum.photos/200/200?random=${index}`} />
          </div>
          <div className={styles.contentContainer}>
            <h3>My Text {index}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              molestiae? Alias nisi provident, eveniet consectetur amet esse est
              consequatur. Quae ea perspiciatis officiis tempore, ipsam maiores
              fugiat beatae nisi cum!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
