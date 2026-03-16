import { render, screen, within} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from "../components/Header"

describe("Navigation Menu", () => {
  test("Buttons (pc/mobile)", () => {
    render(
      <MemoryRouter>
        <Header 
          map={null} 
          setPage={jest.fn()} 
          setAppTheme={jest.fn()} 
          updateAppTheme={jest.fn()}
          setSettingsVisible={jest.fn()} 
          getPage={jest.fn().mockReturnValue("")} 
          control={jest.fn().mockReturnValue(true)}
          getAppTheme={jest.fn().mockReturnValue(true)}  
          settingsVisible={jest.fn().mockReturnValue(true)} 
        />
      </MemoryRouter>
    );

    const pcContainer = screen.getByTestId("pc-navmenu"); 
    expect(within(pcContainer).getByText(/точки интереса/i)).toBeInTheDocument();
    expect(within(pcContainer).getByText(/избранные/i)).toBeInTheDocument();
    expect(within(pcContainer).getByText(/профиль/i)).toBeInTheDocument();

  });
});