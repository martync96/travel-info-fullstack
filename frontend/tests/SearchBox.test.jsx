import React from 'react';
import { expect, it, vi } from "vitest";
import SearchBox from '../src/components/SearchBox.jsx';
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe(`SearchBox tests`, () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it(`should render a modal with an error message if a city is not found`, async () => {

    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>)

    axios.get.mockImplementationOnce(() => Promise.reject(new Error('City not found')));

    const button = screen.getByText('Search');

    fireEvent.click(button);

    const modalText = await screen.getByTestId('notificationModal');
    expect(modalText).toBeInTheDocument();
  });

  it(`should enable the search button if the user has entered a search query`, async () => {

    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>)

    const searchBox = screen.getByTestId('searchBox');
    const submitButton = screen.getByTestId('searchButton');
    const searchText = 'Boston';

    fireEvent.change(searchBox, { target: { value: searchText } });

    expect(submitButton).toBeEnabled();

  });

  it(`should call the navigate function if the response.status is 200`, async () => {
    
    axios.get.mockResolvedValue({ data: {}, status: 200 });

    render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>)

    const searchBox = screen.getByTestId('searchBox');
    const submitButton = screen.getByTestId('searchButton');
    const searchText = 'dublin';

    await userEvent.type(searchBox, searchText);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
