import { render, screen } from '@testing-library/react';
import WeatherForecast from '../src/components/WeatherForecast';
import forecastData from './mockData/forecastData.json';
import { MemoryRouter } from 'react-router-dom';

describe(`WeatherForecast tests`, () => {

    const mockForecast = forecastData

    it('renders the weather correct', () => {
        render(
            <MemoryRouter>
                <WeatherForecast forecast={mockForecast} />
            </MemoryRouter>
        )

        const date = screen.getByText('19°c');
        expect(date).toBeInTheDocument();

      });
});