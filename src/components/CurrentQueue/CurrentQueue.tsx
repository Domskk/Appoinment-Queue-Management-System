import './CurrentQueue.css'

function CurrentQueue() {
  return (
    <div className="current-queue">
      <h2>Current Queue</h2>
      
      <div className="queue-item">
        <div className="queue-status-label">Queue Progress</div>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">Your turn!</div>
        </div>
      </div>

      <div className="queue-service">
        <div className="service-label">Now Serving: #1</div>
        <div className="service-name">General Consultation</div>
        <div className="service-time">2026-03-09 at 09:00 AM</div>
        <button className="view-details-btn">View Details →</button>
      </div>
    </div>
  )
}

export default CurrentQueue
