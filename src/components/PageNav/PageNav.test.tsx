import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import PageNav from './PageNav';
import { AuthContext, AuthProvider } from '@/hoc/AuthProvider';

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Button with text "Войти" exists', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PageNav />
      </MemoryRouter>
    );

    const loginButton = getByText('Войти');
    expect(loginButton).toBeInTheDocument();
  });

  it('handleLogOut is called when "Выйти" button is clicked', async () => {
    localStorage.setItem('1SortUserToken', 'test');
    const mockSignOut = jest.fn();
    const mockNavigate = jest.fn();

    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isUserLoggedIn, signOut }): React.ReactElement => (
            <>
              <div>{isUserLoggedIn.toString()}</div>
              <button
                onClick={(): void => {
                  signOut(mockSignOut);
                  mockNavigate('/');
                  localStorage.removeItem('1SortUserToken');
                }}
              >
                Выйти
              </button>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const logoutButton = getByText('Выйти');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(getByText('false')).toBeInTheDocument();
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(localStorage.getItem('1SortUserToken')).toBeNull();
    });
  });
});
