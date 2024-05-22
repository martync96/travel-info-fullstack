import { expect, it, vi, spy } from "vitest";
import RegisterUserPage from "../src/pages/RegisterUserPage";
import { describe } from "node:test";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';

beforeEach(() => {
    render(
        <MemoryRouter>
            <RegisterUserPage />
        </MemoryRouter>
    );
});

vi.mock('axios');

describe(`RegisterUserPage Tests`, () => {

    it(`should render the modal with an error saying passwords do not match if the passwords do not match`, async () => {

        const emailInput = screen.getByLabelText('Email address');
        const passwordInput = screen.getByLabelText('Enter Your Password');
        const confirmPasswordInput = screen.getByLabelText('Enter Your Password Again');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'johnsmith@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });

        fireEvent.click(submitButton);

        const modalText = await screen.getByTestId('notificationModal');
        expect(modalText).toBeInTheDocument();

    });

    it(`should render a modal with a message saying user registered successfully if a response with status 200 is returned `, async () => {

        axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

        const button = screen.getByText('Submit');

        fireEvent.click(button);

        const modalText = await screen.getByTestId('notificationModal');
        expect(modalText).toBeInTheDocument();

    });

    it(`should render a modal with an error message if an error is returned from the API`, async () => {

        axios.post.mockImplementationOnce(() => Promise.reject(new Error('User already exists')));

        const button = screen.getByText('Submit');

        fireEvent.click(button);

        const modalText = await screen.getByTestId('notificationModal');
        expect(modalText).toBeInTheDocument();

    });


});
