import ChangePasswordPage from "../src/pages/ChangePasswordPage.jsx";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';

beforeEach(() => {
    render(
        <MemoryRouter>
            <ChangePasswordPage />
        </MemoryRouter>
    );
});

vi.mock('axios');

describe(`ChangePassword Tests`, () => {
    {

        it(`should display an error message if the API request returns an error`, async () => {

            axios.post.mockImplementationOnce(() => Promise.reject(new Error('Passwords do not match')));

            const submitButton = screen.getByTestId('submit');

            fireEvent.click(submitButton);

            const modalText = await screen.findByText('Passwords do not match');
            expect(modalText).toBeInTheDocument();
        });

        it(`should display a success message if the API request is successful`, async () => {

            axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

            const submitButton = screen.getByTestId('submit');

            fireEvent.click(submitButton);

            const modalText = await screen.findByText('Password Changed Successfully');
            expect(modalText).toBeInTheDocument();

        });

        it(`should display an error message if the passwords do not match`, async () => {
            const passwordInput = screen.getByLabelText('Enter Your New Password');
            const confirmPasswordInput = screen.getByLabelText('Enter Your New Password Again');
            const submitButton = screen.getByText('Submit');
        
            fireEvent.change(passwordInput, { target: { value: 'a' } });
            fireEvent.change(confirmPasswordInput, { target: { value: 'b' } });
        
            fireEvent.click(submitButton);
        
            const modalText = await screen.getByTestId('notificationModal');
            expect(modalText).toBeInTheDocument();
        });
    }
});