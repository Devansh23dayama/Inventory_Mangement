import { StatCard, Badge, EmptyState, SectionHeader } from '../components/ui.jsx'
import styles from './Pages.module.css'

export default function Dashboard({ products, suppliers, transactions, lowStock }) {
  const totalValue = products.reduce((s, p) => s + (p.price * p.quantity || 0), 0)
  const inCount    = transactions.filter(t => t.type === 'IN').length
  const outCount   = transactions.filter(t => t.type === 'OUT').length

  return (
    <div>
      {/* Stats */}
      <div className={styles.statsRow}>
        <StatCard label="Total Products"   value={products.length}     icon="📦" color="var(--blue)"   sub="items in inventory" />
        <StatCard label="Total Suppliers"  value={suppliers.length}    icon="🏭" color="var(--purple)" sub="active suppliers" />
        <StatCard label="Low Stock Alerts" value={lowStock.length}     icon="⚠️" color="var(--amber)"  sub="need restocking" />
        <StatCard label="Inventory Value"  value={`₹${totalValue.toLocaleString('en-IN')}`} icon="💰" color="var(--green)" sub={`${inCount} IN · ${outCount} OUT`} />
      </div>

      {/* Low stock table */}
      {lowStock.length > 0 && (
        <div className={styles.section}>
          <SectionHeader title="⚠️ Low Stock Alerts" sub={`${lowStock.length} products need restocking`} />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map(p => (
                  <tr key={p.id}>
                    <td className={styles.bold}>{p.name}</td>
                    <td className={styles.dim}>{p.category || '—'}</td>
                    <td><Badge variant="red">{p.quantity} units</Badge></td>
                    <td className={styles.mono}>{p.lowStockThreshold}</td>
                    <td><Badge variant="amber">⚠ Restock needed</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent transactions */}
      <div className={styles.section}>
        <SectionHeader title="Recent Transactions" sub={`Last ${Math.min(5, transactions.length)} records`} />
        <div className={styles.tableWrap}>
          {transactions.length === 0 ? (
            <EmptyState icon="📋" text="No transactions yet" />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th><th>Product</th><th>Type</th>
                  <th>Qty</th><th>Note</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions].reverse().slice(0, 5).map(t => (
                  <tr key={t.id}>
                    <td className={`${styles.mono} ${styles.dim}`}>#{t.id}</td>
                    <td className={styles.bold}>{t.product?.name || '—'}</td>
                    <td>
                      <Badge variant={t.type === 'IN' ? 'green' : 'red'}>
                        {t.type === 'IN' ? '↑ IN' : '↓ OUT'}
                      </Badge>
                    </td>
                    <td className={styles.mono}>{t.quantity}</td>
                    <td className={styles.dim}>{t.note || '—'}</td>
                    <td className={`${styles.mono} ${styles.dim}`}>
                      {t.date ? new Date(t.date).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
