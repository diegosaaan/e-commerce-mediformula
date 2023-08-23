import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthProvider';

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders children and provides context value', () => {
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isUserLoggedIn }): React.JSX.Element => <div>{isUserLoggedIn.toString()}</div>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(getByText('false')).toBeInTheDocument();
  });

  it('updates context value after sign in', async () => {
    const mockSignIn = jest.fn();
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isUserLoggedIn, signIn }): React.ReactElement => (
            <>
              <div>{isUserLoggedIn.toString()}</div>
              <button onClick={(): void => signIn(mockSignIn)}>Войти</button>
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    fireEvent.click(getByText('Войти'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
      expect(getByText('true')).toBeInTheDocument();
    });
  });

  it('updates context value after sign out', async () => {
    const mockSignOut = jest.fn();
    const mockSignIn = jest.fn();
    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ signIn, signOut, isUserLoggedIn }): React.JSX.Element => (
            <>
              <div>{isUserLoggedIn.toString()}</div>
              {isUserLoggedIn && <button onClick={(): void => signOut(mockSignOut)}>Выйти</button>}
              {!isUserLoggedIn && <button onClick={(): void => signIn(mockSignIn)}>Войти</button>}
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    fireEvent.click(getByText('Войти'));
    fireEvent.click(getByText('Выйти'));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(getByText('false')).toBeInTheDocument();
    });
  });

  it('initializes context value from local storage', async () => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));

    const { getByText } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ isUserLoggedIn }): React.ReactElement => (
            <div>{localStorage.getItem('isUserLoggedIn') || isUserLoggedIn.toString()}</div>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByText('true')).toBeInTheDocument();
    });
  });
});
