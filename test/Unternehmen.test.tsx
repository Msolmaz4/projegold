import { render, screen } from '@testing-library/react'
import { UserProvider } from '../src/context/UserContext'
import Unternehmen from '../src/featurs/compaines/Unternehmen'
import '@testing-library/jest-dom'

test('Button "Hinzufügen"  geschrieben', () => {
  render(
    <UserProvider>
      <Unternehmen />
    </UserProvider>
  )
  
  const button = screen.getByRole('button', { name: /hinzufügen/i })
  expect(button).toBeInTheDocument()
})