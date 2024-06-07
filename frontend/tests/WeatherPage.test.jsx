import WeatherPage from "../src/pages/WeatherPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import favouriteLocationsMock from "./mockData/favouriteLocations.json";
import weatherResponse from './mockData/weatherResponse.json';
import weatherResponseTokyo from './mockData/weatherResponseTokyo.json';
import axios from 'axios';

vi.mock('axios');

describe(`WeatherPage tests`, () => {

    beforeEach(() => {
        vi.resetAllMocks();
      });

    const localStorageMock = (function() {
        let store = {
            'favouriteLocations': JSON.stringify(favouriteLocationsMock)
        }
        return {
            getItem: function(key) {
              return store[key] || null
            },
            setItem: function(key, value) {
              store[key] = value.toString()
            },
            removeItem: function(key) {
              delete store[key]
            },
            clear: function() {
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
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={favouriteLocationsMock} setFavouriteLocations={() => {}}/>} />
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
                    <Route path="/weather/:city" element={<WeatherPage favouriteLocations={[]} setFavouriteLocations={() => {}}/>} />
                </Routes>
            </MemoryRouter>
        );
    
        const favouriteIcon = await screen.findByTestId('favourite');
    
        expect(favouriteIcon).toBeInTheDocument();
    });
});