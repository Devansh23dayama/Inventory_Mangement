import { useState } from 'react'
import { useInventory }  from './hooks/useInventory.js'
import { useToast }      from './hooks/useToast.js'
import Sidebar           from './components/Sidebar.jsx'
import Topbar            from './components/Topbar.jsx'
import Toast             from './components/Toast.jsx'
import { Loader }        from './components/ui.jsx'
import Dashboard         from './pages/Dashboard.jsx'
import Products          from './pages/Products.jsx'
import Suppliers         from './pages/Suppliers.jsx'
import Transactions      from './pages/Transactions.jsx'
import styles            from './App.module.css'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const { products, suppliers, transactions, lowStock, loading, connected, refresh } = useInventory()
  const { toasts, show: toast } = useToast()

  const pageProps = { products, suppliers, transactions, lowStock, onRefresh: refresh, toast }

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <Sidebar
        page={page}
        setPage={setPage}
        lowStockCount={lowStock.length}
        connected={connected}
      />

      {/* Main area */}
      <main className={styles.main}>
        <Topbar page={page} connected={connected} onRefresh={refresh} />
        <div className={styles.content}>
          {loading ? (
            <Loader text="Connecting to Spring Boot API..." />
          ) : (
            <>
              {page === 'dashboard'    && <Dashboard    {...pageProps} />}
              {page === 'products'     && <Products     {...pageProps} />}
              {page === 'suppliers'    && <Suppliers    {...pageProps} />}
              {page === 'transactions' && <Transactions {...pageProps} />}
            </>
          )}
        </div>
      </main>

      {/* Toast notifications */}
      <Toast toasts={toasts} />
    </div>
  )
}
