import { useForm } from "react-hook-form";
import InputField from "~/components/InputField";
import { Button } from "~/components/ui/button";

type FormValues = {
  newRestaurantName: string;
};

export function NewRestaurantForm({
  onSave,
}: {
  onSave: (data: FormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSave(data);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputField
        type="text"
        label="new restaurant name"
        data-test="newRestaurantName"
        error={errors.newRestaurantName}
        disabled={false}
        {...register("newRestaurantName", { required: "Required!" })}
      />
      <Button type="submit" data-test="saveNewRestaurantButton">
        Save
      </Button>
    </form>
  );
}
