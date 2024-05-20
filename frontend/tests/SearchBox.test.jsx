import { expect, it, vi } from "vitest";
import SearchBox from '../src/components/SearchBox.jsx';
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

vi.mock('axios');

describe(`SearchBox tests`, () => {

    it(`should render a modal with an error message if a city is not found`, async () => {

        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>)

        axios.get.mockImplementationOnce(() => Promise.reject(new Error('City not found')));

        const button = screen.getByText('Search');

        fireEvent.click(button);

        await screen.findByText(`City not found`);
    });

    // it(`should call the navigate function if the response.status is 200`, async () => {

    //     render(
    //         <MemoryRouter>
    //             <SearchBox search={"Boston"} />
    //         </MemoryRouter>)

    //     axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    //     const button = screen.getByText('Search');

    //     await fireEvent.click(button);

    //     expect(global.window.location.href).toBe('http://localhost/weather/Boston');
    // });
});