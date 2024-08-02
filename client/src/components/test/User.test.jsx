import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "../User";
import { MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// Mock the useAxiosPrivate hook
jest.mock("../../hooks/useAxiosPrivate");

const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

useAxiosPrivate.mockReturnValue(mockAxios);
 

test("should create a new user successfully", async () => {
  // Mock the API response
  mockAxios.post.mockResolvedValue({
    status: 200,
    data: {
      message: "User created successfully",
    },
  });

  // await act(async () => {
  render(
    <MemoryRouter>
      <User />
    </MemoryRouter>
  );

  // console.log("Initial DOM state:");
  //  screen.debug();

  fireEvent.click(screen.getByText("Add User"));

  // console.log("DOM state after clicking 'Add User':");
  // screen.debug();

  // Fill the form
  fireEvent.change(screen.getByLabelText(/User Name/i), {
    target: { value: "john_doe" },
  });
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText('Confirm Password'), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/Create/i));

  // console.log("DOM state after submitting the form:");
  // screen.debug();
  // // });

  //Assert the success message

 // expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();

 expect(await screen.findByText('User created successfully')).toBeInTheDocument();


  


});

// test('should update an existing user successfully', async () => {
//   // Mock the API responses
//   mockAxios.get.mockResolvedValue({
//     status: 200,
//     data: [
//       { userId: 1, username: 'john_doe', firstname: 'John', lastname: 'Doe' },
//     ],
//   });
//   mockAxios.put.mockResolvedValue({
//     status: 200,
//     data: {
//       message: 'User updated successfully',
//     },
//   });

//   // await act(async () => {
//     render(
//       <MemoryRouter>
//         <User />
//       </MemoryRouter>
//     );

//     // Open the edit modal
//     // fireEvent.click(screen.getByTestId('edit-button'));

//     fireEvent.click(screen.getByText("Edit"));
    

//     // Fill the form with new values
//     fireEvent.change(screen.getByLabelText(/User Name/i), { target: { value: 'john_doe_updated' } });
//     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
//     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });

//     // Submit the form
//     fireEvent.click(screen.getByText(/Update/i));
//   // });

//   // Assert the success message
  
  
//  expect(await screen.findByText('User updated successfully')).toBeInTheDocument();


// });
