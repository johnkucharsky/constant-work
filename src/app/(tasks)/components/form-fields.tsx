import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ruRU } from "@mui/x-date-pickers/locales";
import { Priority, Status } from "@root/generated/prisma/enums";
import { ru } from "date-fns/locale";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  AddTaskFormFields,
  AddTaskFormType,
  EditTaskFormFields,
  EditTaskFormType,
} from "@/schemas/tasks.client";
import {
  AddTaskType,
  EditTaskType,
  priorityLabel,
  statusLabel,
  Task,
} from "@/schemas/tasks.sever";

const ruLocale =
  ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

export default function FormFields({
  handleClose,
  schema,
  defaultValues,
  addDataCallback,
  editDataCallback,
  loading,
}: {
  handleClose: () => void;
  schema: AddTaskFormType | EditTaskFormType;
  defaultValues?: Task;
  addDataCallback?: (data: AddTaskType) => Promise<unknown>;
  editDataCallback?: (data: EditTaskType) => Promise<unknown>;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      priority: defaultValues?.priority ?? "HIGH",
      status: defaultValues?.status ?? "TODO",
      dueDate: defaultValues?.dueDate ? new Date(defaultValues.dueDate) : null,
    },
  });

  const onSubmit = async (data: AddTaskFormFields | EditTaskFormFields) => {
    if (addDataCallback) {
      await addDataCallback({
        ...data,
        title: data.title ?? "",
        dueDate: data.dueDate?.toISOString(),
        priority: data.priority as Priority,
        status: data.status as Status,
      });
    }

    if (editDataCallback) {
      await editDataCallback({
        title: data.title || undefined,
        description: data.description || undefined,
        priority: data.priority || undefined,
        status: data.status || undefined,
        dueDate: data.dueDate?.toISOString() || undefined,
      });
    }

    handleClose();
  };

  return (
    <>
      <Box
        component={"form"}
        sx={{ display: "grid", gap: 2, width: "100%", px: 3, pt: 2, pb: 3 }}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <Field
          label="Название"
          error={errors.title?.message}
          {...register("title")}
        />

        <Field
          label="Описание"
          error={errors.description?.message}
          {...register("description")}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <SelectEl
              label="Приоритет"
              error={errors.priority?.message}
              options={priorityLabel}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hideNotSelected={Boolean(addDataCallback)}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectEl
              label="Статус"
              error={errors.status?.message}
              options={statusLabel}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hideNotSelected={Boolean(addDataCallback)}
            />
          )}
        />

        <Controller
          name={"dueDate"}
          control={control}
          render={({ field }) => (
            <DateEl
              value={field.value}
              error={errors.dueDate?.message}
              label={"Срок"}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />

        <Button
          sx={{ display: "grid", mt: 2 }}
          variant={"contained"}
          type={"submit"}
          loading={loading}
        >
          {editDataCallback && "Редактировать"}
          {addDataCallback && "Добавить"}
        </Button>
      </Box>
    </>
  );
}

const Field = ({
  label,
  error,
  ...inputProps
}: {
  label: string;
  error?: string;
}) => {
  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant="h6" component="div">
        {label}
      </Typography>

      <OutlinedInput size={"small"} {...inputProps} error={Boolean(error)} />

      <ErrorEl error={error} />
    </Box>
  );
};

const SelectEl = ({
  label,
  error,
  options,
  value,
  onChange,
  onBlur,
  hideNotSelected,
}: {
  label: string;
  error?: string;
  options: Record<string, ReactNode>;
  value?: string;
  onChange?: (value: SelectChangeEvent) => void;
  onBlur?: () => void;
  hideNotSelected?: boolean;
}) => {
  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant="h6">{label}</Typography>

      <Select
        size="small"
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(error)}
      >
        {!hideNotSelected && (
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
        )}
        {Object.entries(options).map(([value, optionLabel]) => (
          <MenuItem key={value} value={value}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>

      <ErrorEl error={error} />
    </Box>
  );
};

const DateEl = ({
  label,
  error,

  value,
  onChange,
  onBlur,
}: {
  label: string;
  error?: string;
  value?: Date | null | undefined;
  onChange?: (value: unknown) => void;
  onBlur?: () => void;
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
      localeText={ruLocale}
    >
      <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
        <Typography variant={"h6"} component={"div"}>
          {label}
        </Typography>

        <DesktopDatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              error: Boolean(error),
              onBlur: onBlur,
              variant: "outlined",
              size: "small",
            },
          }}
        />

        <ErrorEl error={error} />
      </Box>
    </LocalizationProvider>
  );
};

const ErrorEl = ({ error }: { error?: string }) =>
  error && (
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  );
