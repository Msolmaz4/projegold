import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import UserContextProvider from "../src/context/user-context-provider";
import Unternehmen from "../src/components/Company";

test('Überschrift mit role="heading" und Text "UNTERNEHMEN" wird angezeigt', () => {
  render(
    <MemoryRouter>
      <UserContextProvider>
        <Unternehmen />
      </UserContextProvider>
    </MemoryRouter>
  );

  const heading = screen.getByRole("heading", { name: /unternehmen/i });
  expect(heading).toBeInTheDocument();
});
