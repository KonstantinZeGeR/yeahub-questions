import styles from './QuestionCard.module.css'

export function QuestionCard({ title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.arrow}>∨</span>
      </div>
      <p className={styles.description}>{description}</p>
    </article>
  )
}