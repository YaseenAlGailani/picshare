import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../../src/client/components/Header";
import { BrowserRouter } from "react-router-dom";
import { useSession } from "../../../src/client/context/SessionContext";

jest.mock("../../../src/client/hooks/useQuery",()=>({
 useQuery: jest.fn(()=>true)
}))

jest.mock("../../../src/client/components/Logo", () => ({
  Logo: () => <div></div>,
}));

jest.mock("../../../src/client/components/PictureGrid", () => ({
  PictureGrid: () => <div></div>,
}));

jest.mock("../../../src/client/context/SessionContext", () => ({
  useSession: jest.fn(() => ({ session: { loggedIn: false } })),
}));

test("Renders log in button when user is logged out", () => {
  const openModal = () => {};

  const { container } = render(
    <BrowserRouter>
      <Header openShareModal={openModal} />
    </BrowserRouter>
  );

  expect(container).toHaveTextContent("Log in");
});

test("Renders log out button when user is logged in", () => {

  const mockedUseSession = useSession as jest.MockedFunction<typeof useSession>;
  mockedUseSession.mockReturnValue({
    session: { loggedIn: true, username: "Yaseen" },
    login: () => {},
    logout: () => {},
  });

  const openModal = () => {};

  const { container } = render(
    <BrowserRouter>
      <Header openShareModal={openModal} />
    </BrowserRouter>
  );

  console.log(container.innerHTML);
  expect(container).toHaveTextContent("Log out");
});
