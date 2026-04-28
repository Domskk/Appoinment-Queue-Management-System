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
    </div>
  )
}

export default CurrentQueue
