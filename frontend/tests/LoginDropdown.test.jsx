import { expect, it, } from "vitest";
import LoginDropdown from "../src/components/LoginDropdown";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from '@testing-library/react';

describe(`LoginDropdown Tests`, () => {
    it(`should display as a login button if user is not logged in`, () => {

        render(<MemoryRouter><LoginDropdown /></MemoryRouter>);

        const button = screen.getByText('Sign In');

        expect(button).toBeInTheDocument();
    });

    it(`should display as a logout button if user is logged in`, () => {

        render(<MemoryRouter><LoginDropdown signedIn={true} /></MemoryRouter>);

        const button = screen.getByText('Logout');

        expect(button).toBeInTheDocument();
    });

    it(`should close the login dropdown when the user clicks outside of the form`, () => {

        render(<MemoryRouter><LoginDropdown loginDropdown={true} /></MemoryRouter>);

        // Assume that the dropdown is open at the start of the test
        let dropdown = screen.queryByTestId('login-dropdown');
        expect(dropdown).toBeInTheDocument();
        
        // Simulate a mouse down event on the document body
        fireEvent.mouseDown(document.body);

        // Check if the dropdown has been removed from the document
        setTimeout(() => {
            expect(dropdown).not.toBeInTheDocument();
        }, 100);

    });

    it(`should not close the login dropdown when the user clicks inside of the form`, () => {

        render(<MemoryRouter><LoginDropdown loginDropdown={true} /></MemoryRouter>);

        // Assume that the dropdown is open at the start of the test
        let dropdown = screen.queryByTestId('login-dropdown');
        expect(dropdown).toBeInTheDocument();
        
        // Simulate a mouse down event on the document body
        fireEvent.mouseDown(dropdown);

        // Check if the dropdown has been removed from the document
        setTimeout(() => {
            expect(dropdown).not.toBeInTheDocument();
        }, 100);

    });
});

//19-21, 37-40, 51-63