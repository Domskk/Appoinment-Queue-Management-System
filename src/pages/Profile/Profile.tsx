import { useState } from 'react'
import './Profile.css'

interface UserProfile {
  fullName: string
  email: string
  role: string
  initials: string
}

function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Judes Serafica',
    email: '202312280@gordoncollege.edu.ph',
    role: 'admin',
    initials: 'J'
  })

  const [editedName, setEditedName] = useState(userProfile.fullName)
  const [saved, setSaved] = useState(false)

  const handleSaveChanges = () => {
    setUserProfile({ ...userProfile, fullName: editedName })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>View and update your account information</p>
      </header>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="avatar">{userProfile.initials}</div>
            <div className="profile-details">
              <h2>{userProfile.fullName}</h2>
              <p className="email">{userProfile.email}</p>
            </div>
          </div>
        </div>

        <div className="edit-profile-section">
          <div className="edit-header">
            <h3>Edit Profile</h3>
          </div>

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
            <label>Email Address</label>
            <input
              type="email"
              value={userProfile.email}
              disabled
              placeholder="Email cannot be changed"
            />
            <p className="input-hint">Email cannot be changed</p>
          </div>

          <button
            className="save-btn"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {saved && <p className="success-message">Changes saved successfully!</p>}
        </div>
      </div>
    </div>
  )
}

export default Profile
