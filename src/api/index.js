/* ============================================================
   API SERVICE — All backend calls in one place
   Base URL: /api (proxied to http://localhost:8080)
   To add new endpoints: just add a new function here
   ============================================================ */

const BASE = '/api'

// Generic fetch helper
async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE}${path}`, options)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }

  // Some endpoints return plain text (like delete)
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  return res.text()
}

/* ---- PRODUCTS ---- */
export const productApi = {
  getAll:      ()           => request('GET',    '/products'),
  getById:     (id)         => request('GET',    `/products/${id}`),
  getLowStock: ()           => request('GET',    '/products/low-stock'),
  add:         (dto)        => request('POST',   '/products', dto),
  update:      (id, dto)    => request('PUT',    `/products/${id}`, dto),
  delete:      (id)         => request('DELETE', `/products/${id}`),
}

/* ---- SUPPLIERS ---- */
export const supplierApi = {
  getAll:  ()        => request('GET',    '/suppliers'),
  getById: (id)      => request('GET',    `/suppliers/${id}`),
  add:     (data)    => request('POST',   '/suppliers', data),
  delete:  (id)      => request('DELETE', `/suppliers/${id}`),
}

/* ---- TRANSACTIONS ---- */
export const transactionApi = {
  getAll:      ()     => request('GET',  '/transactions'),
  getByProduct:(id)   => request('GET',  `/transactions/product/${id}`),
  record:      (dto)  => request('POST', '/transactions', dto),
}
