import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

test('loads and displays page', async () => {
  // ARRANGE
  render(<App />)

  // ACT

  // ASSERT
  expect(screen.getByText(/A better way to enjoy every day./i)).toBeInTheDocument()
  expect(screen.getByText(/Be the first to know when we launch./i)).toBeInTheDocument()
  expect(screen.getByText(/Made with ♥ in Naarm/i)).toBeInTheDocument()
  expect(screen.getByText(/@ 2023 Broccoli & Co. All rights reserved./i)).toBeInTheDocument()
})

test('can write in inputs', async () => {
  // ARRANGE
  render(<App />)

  // ACT
  screen.getByPlaceholderText(/Full Name/i)
  // ASSERT
  expect().toBeInTheDocument()
  expect(screen.getByText(/Be the first to know when we launch./i)).toBeInTheDocument()
  expect(screen.getByText(/Made with ♥ in Naarm/i)).toBeInTheDocument()
  expect(screen.getByText(/@ 2023 Broccoli & Co. All rights reserved./i)).toBeInTheDocument()
})
