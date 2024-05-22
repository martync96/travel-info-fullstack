import { expect } from "vitest";
import NotificationModal from "../src/components/NotificationModal";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from '@testing-library/react';



describe(`NotificationModal tests`, () => {

    it(`should display the error message that was passed to it`, () => {
        render(
            <MemoryRouter>
                <NotificationModal error={"Example error"}/>
            </MemoryRouter>
        );

        const modalText = screen.getByText('Example error');
        expect(modalText).toBeInTheDocument();
    })

    it(`should close the modal when the close button is clicked`, async () => {

        render(
            <MemoryRouter>
                <NotificationModal error={"Example error"}/>
            </MemoryRouter>
        );
        
        const closeButton = screen.getByText('Close');
        const modal = screen.queryByTestId('notificationModal');
        
        fireEvent.click(closeButton);

        expect(modal).not.toBeVisible(); 

    });
})