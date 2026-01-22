import { render, screen, waitFor } from "@testing-library/react";
import { NewRestaurantForm } from "../new-restaurant-fom";
import userEvent from "@testing-library/user-event";

describe("New Restaurant form", () => {
  describe("clicking the save button", () => {
    it("calls the onSaveHandler", async () => {
      // Create a mock function to track save calls
      const saveHandler = jest.fn();

      //  Create a mock close handler (required by controlled dialog)
      const closeHandler = jest.fn();

      //  Setup user-event (recommended over fireEvent)
      const user = userEvent.setup();

      // Render the form OPEN (otherwise the dialog content won't exist)
      render(
        <NewRestaurantForm
          open={true}
          onClose={closeHandler}
          onSave={saveHandler}
        />,
      );

      //  Find the input by its accessible label
      const input = screen.getByLabelText("new restaurant name");

      //  Simulate typing into the input
      await user.type(input, "Foodco");

      //  Find the Save button
      const saveButton = screen.getByRole("button", { name: /save/i });

      //  Click the Save button (submits the form)
      await user.click(saveButton);

      //  Assert the save handler was called correctly
      await waitFor(() => {
        expect(saveHandler).toHaveBeenCalledTimes(1);

        expect(saveHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            newRestaurantName: "Foodco",
          }),
        );
      });

      //  Optional but important: ensure the dialog was asked to close
      expect(closeHandler).toHaveBeenCalledTimes(1);
    });
  });
});
