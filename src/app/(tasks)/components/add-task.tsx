import { Dialog, DialogTitle } from "@mui/material";
import useSWRMutation from "swr/mutation";

import FormFields from "@/app/(tasks)/components/form-fields";
import { useTasks } from "@/app/(tasks)/hooks/useTasks";
import { api } from "@/lib/api";
import { AddTaskFormSchema } from "@/schemas/tasks.client";
import { AddTaskType } from "@/schemas/tasks.sever";

export default function AddTask({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (param: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useTasks({});
  const { trigger: triggerEdit, isMutating: isEditing } = useSWRMutation<
    unknown,
    unknown,
    string,
    AddTaskType
  >(`/api/tasks`, (url, { arg }) => api.post(url, arg));

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle variant={"h5"}>Добавить товар</DialogTitle>
        <FormFields
          handleClose={handleClose}
          schema={AddTaskFormSchema}
          loading={isEditing}
          addDataCallback={async (values) => {
            await triggerEdit(values);
            await mutate();
            handleClose();
          }}
        />
      </Dialog>
    </>
  );
}
