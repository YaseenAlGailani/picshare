import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../../src/client/pages/Home";
import { BrowserRouter } from "react-router-dom";
import { useSession } from "../../../src/client/context/SessionContext";

jest.mock("../../../src/client/components/PictureGrid", () => ({
  PictureGrid: () => <div></div>,
}));

jest.mock("../../../src/client/context/SessionContext", () => ({
  useSession: jest.fn(() => ({ session: { loggedIn: false } })),
}));

describe("Home handles user session", () => {
  test("Renders login prompt when user is not logged in", () => {
    const { container } = render(
      <BrowserRouter>
        <Home gridKey={1234} />
      </BrowserRouter>
    );
    expect(container).toHaveTextContent(
      "to start sharing your favourite pictures with others!"
    );
  });

  test("Does not render login prompt when user is logged in", () => {
    const mockedUseSession = useSession as jest.MockedFunction<
      typeof useSession
    >;
    mockedUseSession.mockReturnValue({
      session: { loggedIn: true, username: "Yaseen" },
      login: () => {},
      logout: () => {},
    });

    const { container } = render(
      <BrowserRouter>
        <Home gridKey={1234} />
      </BrowserRouter>
    );
    expect(container).not.toHaveTextContent(
      "to start sharing your favourite pictures with others!"
    );
  });
});
