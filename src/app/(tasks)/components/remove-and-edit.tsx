import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import FormFields from "@/app/(tasks)/components/form-fields";
import { usePopover } from "@/app/(tasks)/hooks/usePopover";
import { useTasks } from "@/app/(tasks)/hooks/useTasks";
import { api } from "@/lib/api";
import { EditTaskFormSchema, EditTaskType, Task } from "@/schemas/tasks";

export default function RemoveAndEdit({ task }: { task: Task }) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const { mutate } = useTasks({});
  const { handleOpen, popoverProps, handleClose } = usePopover();

  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    `/api/tasks/${task.id}`,
    (url) => api.delete(url),
  );

  const { trigger: triggerEdit, isMutating: isEditing } = useSWRMutation<
    unknown,
    unknown,
    string,
    EditTaskType
  >(`/api/tasks/${task.id}`, (url, { arg }) => api.patch(url, arg));

  return (
    <>
      <Dialog
        onClose={() => {
          setDialogOpened(false);
          handleClose();
        }}
        open={dialogOpened}
      >
        <DialogTitle variant={"h5"}>Редактировать товар</DialogTitle>
        <FormFields
          handleClose={handleClose}
          schema={EditTaskFormSchema}
          loading={isEditing}
          defaultValues={task}
          editDataCallback={async (values) => {
            await triggerEdit(values);
            await mutate();
            setDialogOpened(false);
            handleClose();
          }}
        />
      </Dialog>
      <IconButton
        size={"small"}
        sx={{ borderRadius: "23px" }}
        loading={isDeleting || isEditing}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen(e);
        }}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu {...popoverProps} onClick={(e) => e.stopPropagation()}>
        <MenuItem
          sx={{ gap: 1 }}
          onClick={() => {
            setDialogOpened(true);
          }}
        >
          <EditOutlinedIcon fontSize="small" />
          <Typography variant={"body2"}>Редактировать</Typography>
        </MenuItem>
        <MenuItem
          sx={{ gap: 1 }}
          onClick={() => {
            triggerDelete()
              .then(() => mutate())
              .then(handleClose);
          }}
        >
          <DeleteOutlinedIcon fontSize="small" />
          <Typography variant={"body2"}>Удалить</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
