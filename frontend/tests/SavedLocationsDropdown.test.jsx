import { MemoryRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import { expect, vi } from "vitest";
import { render, screen, userEvent, fireEvent } from "@testing-library/react";

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });

describe(`SavedLocationsDropdown tests`, () => {
    it(`should render the dropdown if there are favourite locations`, () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[{city: 'London'}]}/>
            </MemoryRouter>
        )

        const dropdown = screen.getByTestId('fav-dropdown');

        expect(dropdown).toBeVisible();
    });

    it(`should not render the dropdown if there are no favourite locations`, () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[]}/>
            </MemoryRouter>
        )

        const dropdown = screen.queryByTestId('fav-dropdown');

        if (dropdown) {
            expect(dropdown).toHaveClass('favourites-dropdown-hidden');
        } else {
            expect(dropdown).toBeNull();
        }
    });

    it(`should render the correct number of favourite locations in the dropdown`, () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[{city: 'London'}, {city: 'Paris'}, {city: 'New York'}]}/>
            </MemoryRouter>
        )

        const dropdownItems = screen.queryAllByTestId('fav-map-item');

        expect(dropdownItems).toHaveLength(3);
    });

    it(`should navigate to the correct page when a favourite location is clicked`, async () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[{city: 'London'}]}/>
            </MemoryRouter>
        )

        const dropdownItem = screen.getByText('London');

        await fireEvent.click(dropdownItem);

        expect(mockNavigate).toHaveBeenCalledWith('/weather/London');

    });

    it(`should render the dropdown items when the dropdown is clicked`, async () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[{city: 'London'}]}/>
            </MemoryRouter>
        )

        const dropdownToggle = screen.getByTestId('fav-dropdown-tog');
        fireEvent.click(dropdownToggle);
      
        const dropdownMenu = screen.getByTestId('dropdown-menu');
        expect(dropdownMenu).toHaveClass('show');

    });

    it(`should navigate to the favourite-locations page when the 'View All Favourite Locations' link is clicked`, async () => {
        render(
            <MemoryRouter>
                <NavBar favouriteLocations={[{city: 'London'}]}/>
            </MemoryRouter>
        )

        const viewAllLink = screen.getByText('View All Favourite Locations');

        await fireEvent.click(viewAllLink);
        expect(mockNavigate).toHaveBeenCalledWith('/favourite-locations');
    });
});