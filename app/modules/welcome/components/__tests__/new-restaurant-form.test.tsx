import { useState } from "react";
import { Button } from "~/components/ui/button";
import { NewRestaurantForm } from "../new-restaurant-fom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

function NewRestaurantFormHarness({
  onSave,
}: {
  onSave: (data: { newRestaurantName: string }) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <NewRestaurantForm
        onSave={onSave}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

describe("New Restaurant Form", () => {
  describe("saving new restaurant", () => {
    it("calls the onSaveHandler with the entered restaurant name and closes the dialog", async () => {
      const saveHandler = jest.fn();
      const user = userEvent.setup();

      render(<NewRestaurantFormHarness onSave={saveHandler} />);

      const input = screen.getByLabelText("new restaurant name");

      await user.type(input, "FoodCo");

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(saveHandler).toHaveBeenCalledTimes(1);

        expect(saveHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            newRestaurantName: "FoodCo",
          }),
        );
      });
    });
  });

  it("clears the form input after saving, (reset works)", async () => {
    const saveHandler = jest.fn();
    const user = userEvent.setup();

    render(<NewRestaurantFormHarness onSave={saveHandler} />);

    const input = screen.getByLabelText("new restaurant name");

    await user.type(input, "FoodCo");

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });

    await user.click(saveButton);

    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });

    await user.click(saveButton);

    expect(input).toHaveValue("");
  });
});
