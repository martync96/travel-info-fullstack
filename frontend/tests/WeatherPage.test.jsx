import WeatherPage from "../src/pages/WeatherPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import favouriteLocationsMock from "./mockData/favouriteLocations.json";
import weatherResponse from './mockData/weatherResponse.json';
import weatherResponseTokyo from './mockData/weatherResponseTokyo.json';
import axios from 'axios';

vi.mock('axios');

describe(`WeatherPage tests`, () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    const localStorageMock = (function () {
        let store = {
            'favouriteLocations': JSON.stringify(favouriteLocationsMock)
        }
        return {
            getItem: function (key) {
                return store[key] || null
            },
            setItem: function (key, value) {
                store[key] = value.toString()
            },
            removeItem: function (key) {
                delete store[key]
            },
            clear: function () {
                store = {}
            }
        }
    })()

    global.localStorage = localStorageMock;

    it(`should render the unfavourite icon when the location is already in the favourites`, async () => {

        axios.get.mockResolvedValue({ data: weatherResponse, status: 200 });

        render(
            <MemoryRouter initialEntries={['/weather/madrid']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );

        const favouriteIcon = await screen.findByTestId('unfavourite', {}, { timeout: 3000 });

        expect(favouriteIcon).toBeInTheDocument();
    });

    it(`should render the favourite icon when the location is not in the favourites`, async () => {
        axios.get.mockResolvedValue({ data: weatherResponseTokyo, status: 200 });

        render(
            <MemoryRouter initialEntries={['/weather/Tokyo']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={[]} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );

        const favouriteIcon = await screen.findByTestId('favourite');

        expect(favouriteIcon).toBeInTheDocument();
    });

    it(`should render an error message if the API call returns an error`, async () => {
        axios.get.mockRejectedValue({ message: 'Error' });

        render(
            <MemoryRouter initialEntries={['/weather/madrid']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );

        const error = await screen.findByText('Error');

        expect(error).toBeInTheDocument();
    });

    it(`should re-render the unfavourite icon when the location is added to the favourites`, async () => {
        // Mock the GET request
        axios.get.mockResolvedValue({ data: weatherResponseTokyo, status: 200 });
    
        // Mock the POST request
        axios.post.mockResolvedValue({ data: { favouriteLocations: favouriteLocationsMock }, status: 200 });
    
        render(
            <MemoryRouter initialEntries={['/weather/Tokyo']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={[]} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );
    
        const favouriteIcon = await screen.findByTestId('favourite');
    
        // Simulate a click event on the favourite button
        fireEvent.click(favouriteIcon);
    
        // Wait for the unfavourite button to appear in the document
        const unfavouriteIcon = await screen.findByTestId('unfavourite');
    
        // Check if the unfavourite button is in the document
        expect(unfavouriteIcon).toBeInTheDocument();
    });

    it(`should re-render the favourite icon when the location is removed from the favourites`, async () => {
        axios.get.mockResolvedValue({ data: weatherResponse, status: 200 });
    
        // Mock the DELETE request
        axios.delete.mockResolvedValue({ 
            data: { 
                message: "Location removed from favourites",
                user: {
                    favouriteLocations: favouriteLocationsMock 
                }
            }, 
            status: 200 
        });
    
        render(
            <MemoryRouter initialEntries={['/weather/madrid']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );
    
        const unfavouriteIcon = await screen.findByTestId('unfavourite');

        fireEvent.click(unfavouriteIcon);
    
        const favouriteIcon = await screen.findByTestId('favourite');
    
        expect(favouriteIcon).toBeInTheDocument();
    });

    it(`should render a modal with an error message when an error occurs`, async () => {
        axios.get.mockResolvedValue({ data: weatherResponse, status: 200 });
    
        // Mock the DELETE request
        axios.delete.mockImplementationOnce(() => Promise.reject(new Error('Error removing location from favourites')));
    
        render(
            <MemoryRouter initialEntries={['/weather/madrid']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );
    
        let unfavouriteIcon;
        await waitFor(() => {
            unfavouriteIcon = screen.getByTestId('unfavourite');
            expect(unfavouriteIcon).toBeInTheDocument();
        });
    
        fireEvent.click(unfavouriteIcon);
    
        const modal = await screen.findByTestId('notificationModal');
    
        expect(modal).toBeInTheDocument();
    });

    it(`should render a modal with a Location successfully removed from favourites message when successful`, async () => {
        axios.get.mockResolvedValue({ data: weatherResponse, status: 200 });
    
        // Mock the DELETE request
        axios.delete.mockResolvedValue({ 
            data: { 
                message: "Location removed from favourites",
                user: {
                    favouriteLocations: favouriteLocationsMock 
                }
            }, 
            status: 200 
        });
    
        render(
            <MemoryRouter initialEntries={['/weather/madrid']}>
                <Routes>
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => { }} />} />
                </Routes>
            </MemoryRouter>
        );
    
        const unfavouriteIcon = await screen.findByTestId('unfavourite');
    
        fireEvent.click(unfavouriteIcon);
    
        const modal = await screen.findByTestId('notificationModal');
    
        expect(modal).toBeInTheDocument();
    });
});