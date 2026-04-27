import { useState, useEffect } from 'react'
import '../AddServiceModal/AddServiceModal.css'

interface Service {
  id: number
  name: string
  description?: string
  duration: number
  icon?: string
  status: 'Active' | 'Inactive'
}

interface EditServiceModalProps {
  service: Service
  onClose: () => void
  onUpdateService: (service: Service) => void
}

const iconOptions = [
  'FileText',
  'Calendar',
  'Stethoscope',
  'Tooth',
  'Eye',
  'Heart',
  'Activity',
  'Clipboard',
]

function EditServiceModal({ service, onClose, onUpdateService }: EditServiceModalProps) {
  const [formData, setFormData] = useState<Service>({
    id: service.id,
    name: service.name,
    description: service.description || '',
    duration: service.duration,
    icon: service.icon || 'FileText',
    status: service.status,
  })

  useEffect(() => {
    setFormData({
      id: service.id,
      name: service.name,
      description: service.description || '',
      duration: service.duration,
      icon: service.icon || 'FileText',
      status: service.status,
    })
  }, [service])

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
      onUpdateService(formData)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Service</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-name">Name</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-duration">Duration (min)</label>
              <input
                type="number"
                id="edit-duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="5"
                max="480"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-icon">Icon</label>
              <select
                id="edit-icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditServiceModal
