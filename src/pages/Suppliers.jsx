import { useState } from 'react'
import { supplierApi } from '../api/index.js'
import Modal from '../components/Modal.jsx'
import { Button, EmptyState, FormGroup, Input, SectionHeader } from '../components/ui.jsx'
import styles from './Pages.module.css'

export default function Suppliers({ suppliers, onRefresh, toast }) {
  const [modal, setModal]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm]       = useState({ name: '', contact: '', email: '' })

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleAdd = async () => {
    if (!form.name) { toast('Supplier name is required', 'error'); return }
    setLoading(true)
    try {
      await supplierApi.add(form)
      toast('Supplier added!')
      setModal(false)
      setForm({ name: '', contact: '', email: '' })
      onRefresh()
    } catch (e) {
      toast(e.message || 'Failed to add supplier', 'error')
    }
    setLoading(false)
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete supplier "${name}"?`)) return
    try {
      await supplierApi.delete(id)
      toast('Supplier deleted')
      onRefresh()
    } catch {
      toast('Failed to delete supplier', 'error')
    }
  }

  return (
    <div>
      <SectionHeader title="Suppliers" sub={`${suppliers.length} total suppliers`}>
        <Button onClick={() => setModal(true)}>+ Add Supplier</Button>
      </SectionHeader>

      <div className={styles.tableWrap}>
        {suppliers.length === 0 ? (
          <EmptyState icon="🏭" text="No suppliers added yet" />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Contact</th><th>Email</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td className={`${styles.mono} ${styles.dim}`}>#{s.id}</td>
                  <td className={styles.bold}>{s.name}</td>
                  <td className={styles.mono}>{s.contact || '—'}</td>
                  <td className={styles.dim}>{s.email || '—'}</td>
                  <td>
                    <Button variant="red" size="sm" onClick={() => handleDelete(s.id, s.name)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <Modal
          title="🏭 Add Supplier"
          onClose={() => setModal(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={loading}>
                {loading ? 'Adding...' : 'Add Supplier'}
              </Button>
            </>
          }
        >
          <div className={styles.formGrid}>
            <FormGroup label="Supplier Name *" full>
              <Input placeholder="e.g. Tech Supplies Co." value={form.name} onChange={e => set('name', e.target.value)} />
            </FormGroup>
            <FormGroup label="Contact">
              <Input placeholder="Phone number" value={form.contact} onChange={e => set('contact', e.target.value)} />
            </FormGroup>
            <FormGroup label="Email">
              <Input type="email" placeholder="email@supplier.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </FormGroup>
          </div>
        </Modal>
      )}
    </div>
  )
}
