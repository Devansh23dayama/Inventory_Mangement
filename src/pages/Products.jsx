import { useState } from 'react'
import { productApi } from '../api/index.js'
import Modal from '../components/Modal.jsx'
import { Button, Badge, StatCard, FormGroup, Input, Select, EmptyState, SectionHeader } from '../components/ui.jsx'
import styles from './Pages.module.css'

export default function Products({ products, suppliers, onRefresh, toast }) {
  const [modal, setModal]   = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', category: '', quantity: '',
    price: '', lowStockThreshold: '10', supplierId: ''
  })

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

  const totalStock = products.reduce((s, p) => s + (p.quantity || 0), 0)
  const totalValue = products.reduce((s, p) => s + (p.price * p.quantity || 0), 0)

  const handleAdd = async () => {
    if (!form.name || !form.quantity || !form.price) {
      toast('Please fill Name, Quantity and Price', 'error'); return
    }
    setLoading(true)
    try {
      await productApi.add({
        name:              form.name,
        category:          form.category,
        quantity:          parseInt(form.quantity),
        price:             parseFloat(form.price),
        lowStockThreshold: parseInt(form.lowStockThreshold) || 10,
        supplierId:        form.supplierId ? parseInt(form.supplierId) : null,
      })
      toast('Product added successfully!')
      setModal(false)
      setForm({ name: '', category: '', quantity: '', price: '', lowStockThreshold: '10', supplierId: '' })
      onRefresh()
    } catch (e) {
      toast(e.message || 'Failed to add product', 'error')
    }
    setLoading(false)
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    try {
      await productApi.delete(id)
      toast('Product deleted')
      onRefresh()
    } catch {
      toast('Failed to delete product', 'error')
    }
  }

  return (
    <div>
      {/* Stats */}
      <div className={styles.statsRow} style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <StatCard label="Total Products" value={products.length}                                     color="var(--blue)" />
        <StatCard label="Total Stock"    value={`${totalStock} units`}                               color="var(--green)" />
        <StatCard label="Inventory Value" value={`₹${totalValue.toLocaleString('en-IN')}`}           color="var(--amber)" />
      </div>

      {/* Header */}
      <SectionHeader title="Products" sub={`${filtered.length} of ${products.length} items`}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={() => setModal(true)}>+ Add Product</Button>
      </SectionHeader>

      {/* Table */}
      <div className={styles.tableWrap}>
        {filtered.length === 0 ? (
          <EmptyState icon="📦" text="No products found" />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th><th>Category</th><th>Stock</th>
                <th>Price</th><th>Supplier</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td className={styles.bold}>{p.name}</td>
                  <td><Badge variant="blue">{p.category || 'General'}</Badge></td>
                  <td className={styles.mono}>{p.quantity}</td>
                  <td className={styles.mono}>₹{p.price?.toLocaleString('en-IN')}</td>
                  <td className={styles.dim}>{p.supplier?.name || '—'}</td>
                  <td>
                    {p.quantity <= p.lowStockThreshold
                      ? <Badge variant="red">⚠ Low Stock</Badge>
                      : <Badge variant="green">✓ In Stock</Badge>
                    }
                  </td>
                  <td>
                    <Button variant="red" size="sm" onClick={() => handleDelete(p.id, p.name)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {modal && (
        <Modal
          title="📦 Add New Product"
          onClose={() => setModal(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </>
          }
        >
          <div className={styles.formGrid}>
            <FormGroup label="Product Name *" full>
              <Input placeholder="e.g. Laptop" value={form.name} onChange={e => set('name', e.target.value)} />
            </FormGroup>
            <FormGroup label="Category">
              <Input placeholder="e.g. Electronics" value={form.category} onChange={e => set('category', e.target.value)} />
            </FormGroup>
            <FormGroup label="Supplier">
              <Select value={form.supplierId} onChange={e => set('supplierId', e.target.value)}>
                <option value="">No Supplier</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
            </FormGroup>
            <FormGroup label="Quantity *">
              <Input type="number" placeholder="0" value={form.quantity} onChange={e => set('quantity', e.target.value)} />
            </FormGroup>
            <FormGroup label="Price (₹) *">
              <Input type="number" placeholder="0.00" value={form.price} onChange={e => set('price', e.target.value)} />
            </FormGroup>
            <FormGroup label="Low Stock Threshold" full>
              <Input type="number" placeholder="10" value={form.lowStockThreshold} onChange={e => set('lowStockThreshold', e.target.value)} />
            </FormGroup>
          </div>
        </Modal>
      )}
    </div>
  )
}
