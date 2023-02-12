import { useState } from 'react';

import SuccessModal from './SuccessModal';
import RequestAnInviteModal from './RequestAnInviteModal';

import './App.scss';

function App() {
	const [openRequestModal, setOpenRequestModal] = useState(false)
	const [openSuccessModal, setOpenSuccessModal] = useState(false)

	const showRequestModal = () => {
		setOpenRequestModal(true)
	}

	const hideRequestModal = () => {
		setOpenRequestModal(false)
	}

	const showSuccessModal = () => {
		setOpenRequestModal(false)
		setOpenSuccessModal(true)
	}

	const hideSuccessModal = () => {
		setOpenSuccessModal(false)
	}

	return (
		<div className='app'>
			<header className='header'>
				<h1 className='header__text--bold header__text--medium'>Broccoli & Co.</h1>
			</header>
			<section className='section'>
				<p className='section__text--bold section__text--large'>A better way to enjoy every day.</p>
				<p>Be the first to know when we launch.</p>
				<div className='button'>
					<button className='section__button' onClick={showRequestModal}>Request an invite</button>
				</div>
				<RequestAnInviteModal openModal={openRequestModal} onClose={hideRequestModal} onSuccess={showSuccessModal} />
				<SuccessModal openModal={openSuccessModal} onClose={hideSuccessModal} />
			</section>
			<footer className='footer'>
				<p>Made with ♥ in Naarm</p>
				<p>@ 2023 Broccoli & Co. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default App;
