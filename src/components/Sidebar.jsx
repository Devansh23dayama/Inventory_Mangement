import styles from './Sidebar.module.css'

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'products', icon: '📦', label: 'Products' },
  { id: 'suppliers', icon: '🏭', label: 'Suppliers' },
  { id: 'transactions', icon: '📋', label: 'Transactions' },
]

export default function Sidebar({ page, setPage, lowStockCount, connected }) {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>📦</div>
        <div>
          <div className={styles.logoText}>StockFusion</div>
          <div className={styles.logoSub}>Flashtech Solution Product</div>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.navLabel}>Main Menu</div>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`${styles.navItem} ${page === item.id ? styles.active : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navText}>{item.label}</span>
            {item.id === 'products' && lowStockCount > 0 && (
              <span className={styles.badge}>{lowStockCount}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.dot} style={{ background: connected ? '#22c55e' : '#ef4444' }} />
        {connected ? 'Connected' : 'Disconnected'}
      </div>
    </aside>
  )
}
