import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import theme from '@chakra-ui/theme'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../pages/login';
import { store } from "../redux";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test('renders login page', () => {
  render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <Login/>
        </ChakraProvider>
    </Provider>
  );
  const title = screen.getByText(/Everyone Loves Music/i);
  expect(title).toBeVisible();

  const subtitle = screen.getByText(/Find your song and listen every day!/i)
  expect (subtitle).toBeVisible();

  const loginButton = screen.getByText(/log in/i)
  expect(loginButton).toBeInTheDocument();
});
