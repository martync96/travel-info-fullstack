import { expect, it, vi } from "vitest";
import LoginDropdown from "../src/components/LoginDropdown";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, userEvent } from '@testing-library/react';

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

    it('calls handleSubmit when clicked', () => {
        // Mock function to simulate handleSubmit
        const mockFunction = vi.fn(() => true);
    
        // Render the LoginDropdown component within MemoryRouter
        render(<MemoryRouter><LoginDropdown handleSubmit={mockFunction} /></MemoryRouter>);
    
        // Find the submit button
        const button = screen.getByTestId('submit-form');
    
        // Simulate click event on the submit button
        fireEvent.click(button);
        
        // Log the mock function
        console.log(mockFunction);
    
        // Check if handleSubmit has been called
        expect(mockFunction).toHaveBeenCalled();
    });
});

//17-19,24-26,30-33,44-56