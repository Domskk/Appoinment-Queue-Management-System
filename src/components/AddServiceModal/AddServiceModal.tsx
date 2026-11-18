import { useState } from 'react'
import './AddServiceModal.css'
import { createService } from '../../api/routes'

interface AddServiceModalProps {
  onClose: () => void
  onAddService: (service: { name: string; duration: number; status: 'Active' | 'Inactive' }) => void
}


function AddServiceModal({ onClose, onAddService }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '', description: '', duration: 30, status: 'Active' as 'Active' | 'Inactive',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'duration' ? parseInt(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token') || ''
      const res = await createService({
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
      }, token)

      if (res.success) {
        onAddService({ name: formData.name, duration: formData.duration, status: formData.status })
        onClose()
      } else {
        setError(res.message || 'Failed to create service')
      }
    } catch (err) {
      setError('Cannot connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Service</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <p style={{ color: 'red', padding: '0 1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Service Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., General Checkup" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="5" max="480" required />
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create" disabled={loading}>
              {loading ? 'Creating...' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddServiceModal