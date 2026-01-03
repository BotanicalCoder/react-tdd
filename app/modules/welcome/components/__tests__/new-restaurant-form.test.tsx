import { render, screen, waitFor } from "@testing-library/react";
import { NewRestaurantForm } from "../new-restaurant-fom";
import userEvent from "@testing-library/user-event";

describe("New Restaurant form", ()=>{
    describe("clicking the save button", ()=>{
        it("calls the onSaveHandler", async()=>{
            const saveHandler = jest.fn();
            const user = userEvent.setup()

            render(<NewRestaurantForm onSave={saveHandler}/>)

            const input = screen.getByLabelText("new restaurant name");

            await user.type(input,"Foodco")

            const saveButton= screen.getByText("Save");

            await user.click(saveButton);

            await waitFor(()=>{
                expect(saveHandler).toHaveBeenCalledTimes(1);
                
                expect(saveHandler).toHaveBeenCalledWith(
                    expect.objectContaining({
                        newRestaurantName: "Foodco" // Data structure from FormValues
                    })
                );
            })

        })
    })
})