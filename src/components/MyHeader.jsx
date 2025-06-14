import styles from './MyHeader.module.css';

export function MyHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.imageContainer}>
                <img src="src/components/assets/img/relogio.png"/>
            </div>
            <h2>Foco, Força e Fé</h2>
        </header>
    )
}