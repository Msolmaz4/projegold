import { render, screen } from "@testing-library/react";
import UserContextProvider from "../src/context/user-context-provider";
import Unternehmen from "../src/featurs/compaines/Unternehmen";
import "@testing-library/jest-dom";

test('Button "Hinzufügen"  geschrieben', () => {
  render(
    <UserContextProvider>
      <Unternehmen />
    </UserContextProvider>
  );

  const button = screen.getByRole("Box", { name: /unternehmen/i });
  expect(button).toBeInTheDocument();
});
