import userInfoSuccess from '../fixtures/Success.json';
import userInfoFail from '../fixtures/Fail.json';

describe('Landing Page', () => {
	it('successfully loads and displays modal that you can make a request invite', () => {
		cy.visit('/')

		// Renders page on load
		cy.get('h1').should('contain', 'Broccoli & Co.')
		cy.get('button').should('contain', 'Request an invite')
		cy.get('#request-an-invite-modal').should('not.be.visible')
		cy.get('#success-modal').should('not.be.visible')

		// Opens modal
		cy.get('button').contains('Request an invite').click()
		cy.get('#request-an-invite-modal').should('be.visible')

		// Interact with modal
		cy.get('input[placeholder=\"Full Name\"]').type('Jac')
		cy.get('input[placeholder=\"Email\"]').type('jack.clarkgmail.com')
		cy.get('input[placeholder=\"Confirm Email\"]').type('jack.clark@gmail.com')

		cy.get('button').contains('Send').click()

		// Modal will display errors for if the form has been filled out incorrectly
		cy.get('#errors').within(() => {
			cy.get('p').should('contain', 'Your full name must be at least 3 characters long.')
			cy.get('p').should('contain', 'This is not a valid email address.')
			cy.get('p').should('contain', 'Your confirmed email does not match your email address.')
		})

		// Modal will return and display an error from server if email is already in use
		cy.get('input[placeholder=\"Full Name\"]').focus().clear();
		cy.get('input[placeholder=\"Email\"]').focus().clear();
		cy.get('input[placeholder=\"Confirm Email\"]').focus().clear();

		cy.get('input[placeholder=\"Full Name\"]').type('Jack Clark')
		cy.get('input[placeholder=\"Email\"]').type('usedemail@blinq.app')
		cy.get('input[placeholder=\"Confirm Email\"]').type('usedemail@blinq.app')

		cy.get('button').contains('Send').click()

		cy.request({
			method: 'POST',
			url: 'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth',
			failOnStatusCode: false,
			body: userInfoFail,
		})
			.then(
				(response) => {
					expect(response.status).to.eq(400)
					expect(response.body.errorMessage).to.eq('This email address is already in use')
				}
			)


		// Success modal will open when the form passes all requirements
		cy.get('input[placeholder=\"Full Name\"]').focus().clear();
		cy.get('input[placeholder=\"Email\"]').focus().clear();
		cy.get('input[placeholder=\"Confirm Email\"]').focus().clear();

		cy.get('input[placeholder=\"Full Name\"]').type('Jack Clark')
		cy.get('input[placeholder=\"Email\"]').type('jack.clark@gmail.com')
		cy.get('input[placeholder=\"Confirm Email\"]').type('jack.clark@gmail.com')

		cy.get('button').contains('Send').click()

		cy.request('POST', 'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth', userInfoSuccess).then(
			(response) => {
				expect(response.status).to.eq(200)
			}
		)

		cy.get('#success-modal').should('be.visible')
	})
})