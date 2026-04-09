import { useState, useCallback, useEffect } from 'react'
import { productApi, supplierApi, transactionApi } from '../api/index.js'

/* ============================================================
   CENTRAL DATA HOOK
   All data fetching lives here.
   Any component can use this hook to get/refresh data.
   ============================================================ */

export function useInventory() {
  const [products, setProducts]         = useState([])
  const [suppliers, setSuppliers]       = useState([])
  const [transactions, setTransactions] = useState([])
  const [lowStock, setLowStock]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [connected, setConnected]       = useState(false)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [p, s, t, l] = await Promise.all([
        productApi.getAll(),
        supplierApi.getAll(),
        transactionApi.getAll(),
        productApi.getLowStock(),
      ])
      setProducts(p)
      setSuppliers(s)
      setTransactions(t)
      setLowStock(l)
      setConnected(true)
    } catch (err) {
      console.error('API Error:', err)
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on first load
  useEffect(() => { fetchAll() }, [fetchAll])

  return {
    products,
    suppliers,
    transactions,
    lowStock,
    loading,
    connected,
    refresh: fetchAll,
  }
}
