import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />);
});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm />);

    const firstNameInput = screen.getByLabelText(/first name:/i)
    userEvent.type(firstNameInput, "David");

    const lastNameInput = screen.getByLabelText(/last name:/i)
    userEvent.type(lastNameInput, "Dwight");

    const addressInput = screen.getByLabelText(/address:/i)
    userEvent.type(addressInput, "308 Washington St");

    const cityInput = screen.getByLabelText(/city:/i)
    userEvent.type(cityInput, "Denver");
    
    const stateInput = screen.getByLabelText(/state:/i)
    userEvent.type(stateInput, "CO");

    const zipInput = screen.getByLabelText(/zip:/i)
    userEvent.type(zipInput, "80209");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const success = screen.queryByTestId("successMessage");
    expect(success).toBeInTheDocument();
});
