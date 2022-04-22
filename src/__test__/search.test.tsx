import { render, screen } from "@testing-library/react"
import { Provider } from 'react-redux'
import { store } from "../redux"
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import data from '../data/Track'
import CreatePlaylist from "../pages/create-playlist"
import userEvent from "@testing-library/user-event"

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
}

const server = setupServer(
    rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ tracks: { items: data } }));
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test("search component are rendered correctly", async ()  => {
    render(
    <Provider store={store}>
        <CreatePlaylist/>
    </Provider>
    );

    const inputSearch = screen.getByTestId('search-bar')
    userEvent.type(inputSearch, 'Bohemian Rhapsody')

    const buttonSearch=screen.getByText(/Search/i)
    userEvent.click(buttonSearch)
    
    await screen.findByText('I Want To Break Free')

    const firstTrack = screen.getByText("Bohemian Rhapsody - Remastered 2011")
	const lastTrack = screen.getByText("I Want To Break Free")
	expect(firstTrack).toBeInTheDocument()
	expect(lastTrack).toBeInTheDocument()
    
  });