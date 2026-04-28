import { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import AddServiceModal from '../AddServiceModal/AddServiceModal'
import EditServiceModal from '../EditServiceModal/EditServiceModal'
import './ManageServices.css'
import { useServices, Service } from '../../contexts/ServicesContext'

function ManageServices() {
  const { services, addService, updateService, deleteService, toggleServiceStatus } = useServices()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleAddService = (newService: Omit<Service, 'id'>) => {
    addService(newService)
    setIsModalOpen(false)
  }

  const handleDeleteService = (id: number) => {
    deleteService(id)
  }

  const handleToggleStatus = (id: number) => {
    toggleServiceStatus(id)
  }

  const handleEditService = (service: Service) => {
    updateService(service)
    setIsEditModalOpen(false)
    setSelectedService(null)
  }

  const openEditModal = (service: Service) => {
    setSelectedService(service)
    setIsEditModalOpen(true)
  }

  return (
    <div className="manage-services">
      <div className="manage-services-header">
        <h2>All Services</h2>
        <button className="btn-add-service" onClick={() => setIsModalOpen(true)}>
          + Add Service
        </button>
      </div>

      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Duration (min)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>
                  <button
                    className={`status-badge status-${service.status.toLowerCase()}`}
                    onClick={() => handleToggleStatus(service.id)}
                    title="Click to toggle status"
                    style={{ cursor: 'pointer', border: 'none', background: 'none', font: 'inherit' }}
                  >
                    {service.status}
                  </button>
                </td>
                <td className="actions-cell">
                  <button
                    className="btn-action btn-toggle"
                    onClick={() => openEditModal(service)}
                    title="Edit Service"
                  >
                    <MdEdit color="gray" />
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDeleteService(service.id)}
                    title="Delete Service"
                  >
                    <FaTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="empty-state">
            <p>No services yet. Click "Add Service" to create one.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddServiceModal
          onClose={() => setIsModalOpen(false)}
          onAddService={handleAddService}
        />
      )}

      {isEditModalOpen && selectedService && (
        <EditServiceModal
          service={selectedService}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedService(null)
          }}
          onUpdateService={handleEditService}
        />
      )}
    </div>
  )
}

export default ManageServices
