import { useForm } from "react-hook-form";
import Button from "~/components/Button";
import InputField from "~/components/InputField";


type FormValues = {
  newRestaurantName: string;
};

export function NewRestaurantForm ({onSave}:{onSave:(data: string)=>void}){
   const { 
        register, 
        handleSubmit, 
        formState: { errors } 
      } = useForm<FormValues>(); 

      const onSubmit = (data: FormValues) => {
        onSave(data.newRestaurantName); 
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <InputField type="text" label="new restaurant name" data-test="newRestaurantName"  
         error={errors.newRestaurantName}
          disabled={false}
        {...register('newRestaurantName', { required: 'Required!' })} 
        />
         <Button  data-test="saveNewRestaurantButton">
                    Save
         </Button>
    </form>
}