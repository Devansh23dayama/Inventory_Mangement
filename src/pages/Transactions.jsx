import { useState } from 'react'
import { transactionApi } from '../api/index.js'
import Modal from '../components/Modal.jsx'
import { Button, Badge, StatCard, FormGroup, Input, Select, EmptyState, SectionHeader } from '../components/ui.jsx'
import styles from './Pages.module.css'

export default function Transactions({ transactions, products, onRefresh, toast }) {
  const [modal, setModal]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter]   = useState('ALL')
  const [form, setForm]       = useState({ productId: '', type: 'IN', quantity: '', note: '' })

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const filtered = transactions.filter(t => filter === 'ALL' || t.type === filter)
  const inCount  = transactions.filter(t => t.type === 'IN').length
  const outCount = transactions.filter(t => t.type === 'OUT').length

  const handleRecord = async () => {
    if (!form.productId || !form.quantity) {
      toast('Please select a product and enter quantity', 'error'); return
    }
    setLoading(true)
    try {
      await transactionApi.record({
        productId: parseInt(form.productId),
        type:      form.type,
        quantity:  parseInt(form.quantity),
        note:      form.note,
      })
      toast(`Stock ${form.type} recorded successfully!`)
      setModal(false)
      setForm({ productId: '', type: 'IN', quantity: '', note: '' })
      onRefresh()
    } catch (e) {
      const msg = e.message?.toLowerCase().includes('insufficient')
        ? '❌ Insufficient stock for this product!'
        : e.message || 'Failed to record transaction'
      toast(msg, 'error')
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Stats */}
      <div className={styles.statsRow} style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <StatCard label="Total Transactions" value={transactions.length} color="var(--blue)" />
        <StatCard label="Stock IN"           value={inCount}             color="var(--green)" sub="total IN records" />
        <StatCard label="Stock OUT"          value={outCount}            color="var(--red)"   sub="total OUT records" />
      </div>

      {/* Header */}
      <SectionHeader title="Transactions" sub={`${filtered.length} records`}>
        {/* Filter buttons */}
        <div className={styles.filterRow}>
          {['ALL', 'IN', 'OUT'].map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles[`filter_${f}`] : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'IN' ? '↑ IN' : f === 'OUT' ? '↓ OUT' : 'All'}
            </button>
          ))}
        </div>
        <Button onClick={() => setModal(true)}>+ Record Transaction</Button>
      </SectionHeader>

      {/* Table */}
      <div className={styles.tableWrap}>
        {filtered.length === 0 ? (
          <EmptyState icon="📋" text="No transactions found" />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th><th>Product</th><th>Type</th>
                <th>Quantity</th><th>Note</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[...filtered].reverse().map(t => (
                <tr key={t.id}>
                  <td className={`${styles.mono} ${styles.dim}`}>#{t.id}</td>
                  <td className={styles.bold}>{t.product?.name || '—'}</td>
                  <td>
                    <Badge variant={t.type === 'IN' ? 'green' : 'red'}>
                      {t.type === 'IN' ? '↑ Stock IN' : '↓ Stock OUT'}
                    </Badge>
                  </td>
                  <td
                    className={styles.mono}
                    style={{ color: t.type === 'IN' ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}
                  >
                    {t.type === 'IN' ? '+' : '-'}{t.quantity}
                  </td>
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

      {/* Record Modal */}
      {modal && (
        <Modal
          title="📋 Record Transaction"
          onClose={() => setModal(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
              <Button
                variant={form.type === 'IN' ? 'green' : 'red'}
                onClick={handleRecord}
                disabled={loading}
              >
                {loading ? 'Recording...' : `Record ${form.type}`}
              </Button>
            </>
          }
        >
          <div className={styles.formGrid}>
            {/* Type toggle */}
            <FormGroup label="Transaction Type *" full>
              <div className={styles.typeToggle}>
                <button
                  className={`${styles.typeBtn} ${form.type === 'IN' ? styles.typeIn : ''}`}
                  onClick={() => set('type', 'IN')}
                >
                  ↑ Stock IN
                </button>
                <button
                  className={`${styles.typeBtn} ${form.type === 'OUT' ? styles.typeOut : ''}`}
                  onClick={() => set('type', 'OUT')}
                >
                  ↓ Stock OUT
                </button>
              </div>
            </FormGroup>

            <FormGroup label="Product *" full>
              <Select value={form.productId} onChange={e => set('productId', e.target.value)}>
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.quantity})
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup label="Quantity *" full>
              <Input
                type="number"
                placeholder="Enter quantity"
                value={form.quantity}
                onChange={e => set('quantity', e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Note" full>
              <Input
                placeholder="e.g. New stock received"
                value={form.note}
                onChange={e => set('note', e.target.value)}
              />
            </FormGroup>
          </div>
        </Modal>
      )}
    </div>
  )
}
