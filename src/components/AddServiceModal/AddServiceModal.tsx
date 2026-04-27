import { useState } from 'react'
import './AddServiceModal.css'

interface AddServiceModalProps {
  onClose: () => void
  onAddService: (service: { name: string; duration: number; status: 'Active' | 'Inactive' }) => void
}

function AddServiceModal({ onClose, onAddService }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 30,
    status: 'Active' as 'Active' | 'Inactive',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onAddService({
        name: formData.name,
        duration: formData.duration,
        status: formData.status,
      })
      setFormData({
        name: '',
        description: '',
        duration: 30,
        status: 'Active',
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Service</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Service Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., General Checkup"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the service"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="5"
                max="480"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddServiceModal
