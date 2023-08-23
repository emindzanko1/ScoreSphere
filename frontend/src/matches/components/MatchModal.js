import React from 'react';
import './MatchModal.css';

const MatchModal = props => {
  return (
    <>
      <div className='backdrop' onClick={props.onClose} />
      <div className='match-modal'>
        <div className='match-modal-content'>
          <h2 className='title'>{props.title}</h2>
          <span className='close' onClick={props.onClose}>
            &times;
          </span>
          <div className='teams-container'>
            <div className='team'>
              <div className='team-image-container'>
                <img src={props.homeTeamImage} alt={props.homeTeam} className='team-image' />
              </div>
              <p>{props.homeTeam}</p>
            </div>
            <div className='result'>
              <p className='date-time'>{props.dateTime}</p>
              <h2>{props.result}</h2>
            </div>
            <div className='team'>
              <div className='team-image-container'>
                <img src={props.awayTeamImage} alt={props.awayTeam} className='team-image' />
              </div>
              <p>{props.awayTeam}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchModal;

