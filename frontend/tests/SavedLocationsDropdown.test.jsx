import { MemoryRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import { expect } from "vitest";
import { render, screen } from "@testing-library/react";

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
});