import styles from './Toast.module.css'

export default function Toast({ toasts }) {
  return (
    <div className={styles.wrap}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span>{t.type === 'success' ? '✅' : '❌'}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
