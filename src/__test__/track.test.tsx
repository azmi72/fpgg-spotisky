import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Track from '../components/track'
import { Provider } from 'react-redux'
import { store } from "../redux"
import data from '../data/SingleTrack'

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
}

test("tracks component are rendered correctly", ()  => {
    render(
    <Provider store={store}>
        <Track  track={data} />
    </Provider>
    );

    const albumName = screen.getByTestId("album-name");
    const trackName = screen.getByTestId("track-name");
    const selectButton = screen.getByText(/select/i);
    expect(albumName).toBeVisible();
    expect(albumName).toHaveTextContent(data.album.name);
    expect(trackName).toBeVisible();
    expect(trackName).toHaveTextContent(data.name);
    expect(selectButton).toBeVisible();
  });

  test('select button clicked', () => {
    render(
        <Provider store={store}>
            <Track  track={data} />
        </Provider>
    );
    
    const selectButton = screen.getByText(/select/i);

    expect(selectButton).toBeInTheDocument();

    userEvent.click(selectButton)
    expect(selectButton.textContent).toBe('Selected')

    userEvent.click(selectButton)
    expect(selectButton.textContent).toBe('Select')
  })