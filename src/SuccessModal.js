import React from 'react';

import './Modal.scss';

function SuccessModal(props) {
    return (
        <div id="success-modal" data-testid="request-an-invite-modal" className={`container ${props.openModal ? 'open' : ''}`} onClick={props.closeModal}>
            <div className="modal" onClick={e => { e.stopPropagation() }}>
                <h1 className='modal__title'>All Done!</h1>
                <span className='modal__line' />
                <form className='modal__form'>
                    <p>You will be the first to experience Broccoli & Co. when we launch</p>
                    <button className='modal__button' onClick={props.onClose}>Ok</button>
                </form>
            </div>
        </div>
    );
}

export default SuccessModal;
