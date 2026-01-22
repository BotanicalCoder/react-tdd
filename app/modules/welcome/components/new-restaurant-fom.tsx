import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "~/components/InputField";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";

type FormValues = {
  newRestaurantName: string;
};

export function NewRestaurantForm({
  onSave,
  open,
  onClose,
}: {
  onSave: (data: FormValues) => void;
  open: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new restaurant</DialogTitle>
          <DialogDescription>
            Enter the restaurant name and save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <InputField
            type="text"
            label="new restaurant name"
            data-test="newRestaurantName"
            error={errors.newRestaurantName}
            disabled={false}
            {...register("newRestaurantName", { required: "Required!" })}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-test="cancelNewRestaurantButton"
            >
              Cancel
            </Button>

            <Button type="submit" data-test="saveNewRestaurantButton">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
