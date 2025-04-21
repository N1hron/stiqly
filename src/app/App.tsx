import styles from './style.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <aside className={styles.sidebar}></aside>
        <main className={styles.content}></main>
      </div>
    </div>
  );
}

export default App;
