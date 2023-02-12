import React, { useState } from 'react';

import './Modal.scss';

function RequestAnInviteModal(props) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [email2, setEmail2] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const validateFullName = () => {
        return fullName.length > 3
    }
    const validateEmail = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    const validateConfirmedEmail = () => {
        return email === email2
    }
    const validateFields = () => {
        if (validateFullName() &&
            validateEmail() &&
            validateConfirmedEmail()) return true
        return false
    }

    function submitForm() {
        let updateErrors = []

        const fieldsAreValid = validateFields()
        if (fieldsAreValid) {
            const data = { name: fullName, email: email };
            fetch('https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) return response.json()
                    else props.onSuccess()
                })
                .then((data) => {
                    console.log(data)
                    if (data && data.errorMessage) {
                        updateErrors.push(data.errorMessage)
                    }
                })
        } else {
            if (!validateFullName()) updateErrors.push('Your full name must be at least 3 characters long.')
            if (!validateEmail()) updateErrors.push('This is not a valid email address.')
            if (!validateConfirmedEmail()) updateErrors.push('Your confirmed email does not match your email address.')
        }
        setLoading(false)
        setErrors(updateErrors)
    }

    const handleClose = () => {
        if (!loading) {
            setErrors([])
            setFullName('')
            setEmail('')
            setEmail2('')
            props.onClose()
        }
    }

    const handleClick = (e) => {
        e.stopPropagation()
        submitForm()
    }

    return (
        <div id="request-an-invite-modal" data-testid="request-an-invite-modal" className={`container ${props.openModal ? 'open' : ''}`} onClick={handleClose}>
            <div className="modal" onClick={e => { e.stopPropagation() }}>
                <h1 className='modal__title'>Request an invite</h1>
                <span className='modal__line' />
                <form className='modal__form'>
                    <input className='modal__form__input' placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
                    <input className='modal__form__input' placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    <input className='modal__form__input' placeholder="Confirm Email" type="email" onChange={(e) => setEmail2(e.target.value)} />
                </form>
                {loading ? (
                    <div className='modal__button__loading'>Sending. Please wait...</div>
                ) : (
                    <button
                        className='modal__button'
                        onClick={(e) => {
                            setLoading(true)
                            handleClick(e)
                        }}
                    >
                        Send
                    </button>
                )}
                {errors && (
                    <div id='errors' className='modal__error'>
                        {errors.map((error) => (
                            <p>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}

export default RequestAnInviteModal;