import styles from './Topbar.module.css'

const titles = {
  dashboard:    'Dashboard',
  products:     'Products',
  suppliers:    'Suppliers',
  transactions: 'Transactions',
}

export default function Topbar({ page, connected, onRefresh }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.title}>{titles[page]}</div>
        <div className={styles.breadcrumb}>InvenTrack / {titles[page]}</div>
      </div>
      <div className={styles.right}>
        <div
          className={styles.statusDot}
          style={{
            background: connected ? 'var(--green)' : 'var(--red)',
            boxShadow: connected ? '0 0 8px var(--green)' : '0 0 8px var(--red)',
          }}
        />
        <span className={styles.statusText}>
          {connected ? 'API Connected' : 'Disconnected'} · localhost:8080
        </span>
        <button className={styles.refreshBtn} onClick={onRefresh}>
          🔄 Refresh
        </button>
      </div>
    </header>
  )
}
