import { useState, useEffect } from 'react'
import './Profile.css'
import { getProfile, updateProfile } from '../../api/routes'

function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editedName, setEditedName] = useState('')
  const [editedPhone, setEditedPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token') || ''
        const res = await getProfile(token)
        if (res.success) {
          setName(res.data.name)
          setEmail(res.data.email)
          setEditedName(res.data.name)
          setEditedPhone(res.data.phone || '')
        }
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSaveChanges = async () => {
    setSaving(true)
    setError('')
    try {
      const token = localStorage.getItem('token') || ''
      const res = await updateProfile({ name: editedName, phone: editedPhone }, token)
      if (res.success) {
        setName(editedName)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } else {
        setError(res.message || 'Update failed')
      }
    } catch (err) {
      setError('Cannot connect to server')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: '2rem' }}>Loading profile...</div>

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>View and update your account information</p>
      </header>
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="avatar">{name.charAt(0).toUpperCase()}</div>
            <div className="profile-details">
              <h2>{name}</h2>
              <p className="email">{email}</p>
            </div>
          </div>
        </div>
        <div className="edit-profile-section">
          <div className="edit-header"><h3>Edit Profile</h3></div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} disabled placeholder="Email cannot be changed" />
            <p className="input-hint">Email cannot be changed</p>
          </div>
          <button className="save-btn" onClick={handleSaveChanges} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <p className="success-message">Changes saved successfully!</p>}
        </div>
      </div>
    </div>
  )
}

export default Profile