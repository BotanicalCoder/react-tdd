import { render } from "@testing-library/react";
import { NewRestaurantForm } from "../new-restaurant-fom";
import userEvent from "@testing-library/user-event";

describe("New Restaurant form", ()=>{
    describe("clicking the save button", ()=>{
        it("calls the onSaveHandler", ()=>{
            const saveHandler = jest.fn();
            const user = userEvent.setup()

            render(<NewRestaurantForm onSave={saveHandler}/>)
        })
    })
})