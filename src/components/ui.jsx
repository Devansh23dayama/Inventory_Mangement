/* ============================================================
   REUSABLE UI PRIMITIVES
   Button, Badge, StatCard, Table, FormGroup, EmptyState, Loader
   ============================================================ */
import styles from './ui.module.css'

export function Button({ children, variant = 'green', size = 'md', onClick, disabled, type = 'button' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Badge({ children, variant = 'green' }) {
  return <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>{children}</span>
}

export function StatCard({ label, value, icon, color, sub }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <span className={styles.statLabel}>{label}</span>
        {icon && <span className={styles.statIcon}>{icon}</span>}
      </div>
      <div className={styles.statNum} style={{ color }}>{value}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

export function FormGroup({ label, children, full }) {
  return (
    <div className={`${styles.formGroup} ${full ? styles.full : ''}`}>
      <label className={styles.formLabel}>{label}</label>
      {children}
    </div>
  )
}

export function Input({ ...props }) {
  return <input className={styles.input} {...props} />
}

export function Select({ children, ...props }) {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  )
}

export function EmptyState({ icon, text }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>{icon}</div>
      <div className={styles.emptyText}>{text}</div>
    </div>
  )
}

export function Loader({ text = 'Loading...' }) {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <div>{text}</div>
    </div>
  )
}

export function SectionHeader({ title, sub, children }) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <div className={styles.sectionTitle}>{title}</div>
        {sub && <div className={styles.sectionSub}>{sub}</div>}
      </div>
      <div className={styles.sectionActions}>{children}</div>
    </div>
  )
}
