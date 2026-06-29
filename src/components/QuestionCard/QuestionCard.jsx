import styles from './QuestionCard.module.css'
import { Link } from 'react-router-dom'

export function QuestionCard({ title, description, id }) {
  return (
    <Link to={`/questions/${id}`}>
      <article className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.arrow}>∨</span>
        </div>
        <p className={styles.description}>{description}</p>
      </article>
    </Link>
  )
}