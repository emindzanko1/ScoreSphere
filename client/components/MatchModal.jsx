import React, { useRef, useEffect } from 'react';
import '../styles/MatchModal.css';

const MatchModal = ({ isOpen, matchData, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.close();
    }
    onClose();
  };

  if (!matchData) return null;

  return (
    <dialog ref={dialogRef} className='modal-overlay' onClose={handleClose}>
      <div className='modal-content'>
        <h2>Match Details</h2>
        <div className='match-info'>
          <div className='team'>
            <img src={matchData.team1Badge} alt={`${matchData.team1} badge`} />
            <p>{matchData.team1}</p>
          </div>
          <div className='score'>
            <p>{matchData.score}</p>
          </div>
          <div className='team'>
            <img src={matchData.team2Badge} alt={`${matchData.team2} badge`} />
            <p>{matchData.team2}</p>
          </div>
        </div>
        <p>Match Time: {matchData.time}</p>
        <form method='dialog'>
          <button type='button' className='close-btn' onClick={handleClose}>
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default MatchModal;
