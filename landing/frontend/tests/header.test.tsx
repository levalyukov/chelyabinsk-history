import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from "../components/Header"

describe("Navigation Menu", () => {
  test("Buttons (pc/mobile)", () => {
    render(
      <MemoryRouter>
        <Header 
          setTheme={jest.fn()} 
          getTheme={jest.fn().mockReturnValue(true)} 
          setLang ={jest.fn()}
        />
      </MemoryRouter>
    );

    const pcContainer = screen.getByTestId("pc-navmenu"); 
    expect(within(pcContainer).getByText(/безопасность/i)).toBeInTheDocument();
    expect(within(pcContainer).getByText(/обратная связь/i)).toBeInTheDocument();
    expect(within(pcContainer).getByText(/блог/i)).toBeInTheDocument();
    expect(within(pcContainer).getByText(/контакты/i)).toBeInTheDocument();

    const mobileContainer = screen.getByTestId("mobile-navmenu"); 
    expect(within(mobileContainer).getByText(/безопасность/i)).toBeInTheDocument();
    expect(within(mobileContainer).getByText(/обратная связь/i)).toBeInTheDocument();
    expect(within(mobileContainer).getByText(/блог/i)).toBeInTheDocument();
    expect(within(mobileContainer).getByText(/контакты/i)).toBeInTheDocument();

  });

  test("Logotypes (pc/mobile)", () => {
    render(
      <MemoryRouter>
        <Header 
          setTheme={jest.fn()} 
          getTheme={jest.fn().mockReturnValue(true)} 
          setLang ={jest.fn()}
        />
      </MemoryRouter>
    );

    const logotypes = screen.getAllByAltText("logotype.svg");
    expect(logotypes).toHaveLength(2);
    logotypes.forEach((i) => {
      expect(i).toBeInTheDocument();});
  });
});