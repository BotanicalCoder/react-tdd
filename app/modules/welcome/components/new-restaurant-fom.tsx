import InputField from "~/components/InputField";

export function NewRestaurantForm (){
    return <form>
        <InputField type="text" label="" data-test="newRestaurantName" />
    </form>
}