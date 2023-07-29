import React from 'react';
import './MatchModal.css';

const MatchModal = props => {
  return (
    <>
      <div className='backdrop' onClick={props.onClose} />
      <div className='match-modal'>
        <div className='modal-content'>
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

/*

/*}
  {/*<div className={`match-modal ${props.show ? 'show' : ''}`}>       </div>}

      {/* <div className='modal-content'></div>}*/
/*import React from 'react';
import Modal from '../../shared/UI/Modal';

import './MatchModal.css';

const MatchModal = props => {
  return (
    <Modal>
      {/* <div className={`match-modal ${props.show ? 'show' : ''}`}>
           </div>
*/
/*
      <div className='modal-content'>
        <span className='close' onClick={props.onClose}>
          &times;
        </span>
        <h2>{props.title}</h2>
        <p>Date & Time: {props.dateTime}</p>
        <p>Home Team: {props.homeTeam}</p>
        <p>Away Team: {props.awayTeam}</p>
        <p>Result: {props.result}</p>
      </div>
    </Modal>
  );
};

export default MatchModal;*/
