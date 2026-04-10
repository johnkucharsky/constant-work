"use client";

import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ruRU } from "@mui/x-date-pickers/locales";
import { Priority, Status } from "@root/generated/prisma/enums";
import { ru } from "date-fns/locale";

import { useTaskFilters } from "@/app/(tasks)/hooks/useTaskFilters";
import { priorityLabel, statusLabel } from "@/schemas/tasks";

const ruLocale =
  ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

export default function FiltersBar() {
  const { resetFilters } = useTaskFilters();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ru}
      localeText={ruLocale}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "26px 30px",
          mb: "30px",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <PriorityEl />
        <StatusEl />
        <DueDateStart />
        <DueDateEnd />
        <IconButton onClick={resetFilters} sx={{ alignSelf: "end" }}>
          <SearchOffOutlinedIcon />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}

const PriorityEl = () => {
  const { priority, setPriority } = useTaskFilters();

  const selectPriority = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as Priority | "none";

    setPriority(selectedValue === "none" ? null : selectedValue);
  };

  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant={"body2"} component={"div"} ml={1}>
        Приоритет
      </Typography>
      <Select<Priority | "none">
        value={priority ?? "none"}
        onChange={selectPriority}
        size={"small"}
        sx={{ minWidth: 180, pl: 0 }}
      >
        <MenuItem value={"none"}>Не выбрано</MenuItem>
        {Object.entries(priorityLabel).map((label) => (
          <MenuItem key={label[0]} value={label[0]}>
            {label[1]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const StatusEl = () => {
  const { status, setStatus } = useTaskFilters();

  const selectStatus = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as Status | "none";

    setStatus(selectedValue === "none" ? null : selectedValue);
  };

  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant={"body2"} component={"div"} ml={1}>
        Статус
      </Typography>
      <Select<Status | "none">
        value={status ?? "none"}
        onChange={selectStatus}
        size={"small"}
        sx={{ minWidth: 180, pl: 0 }}
      >
        <MenuItem value={"none"}>Не выбрано</MenuItem>
        {Object.entries(statusLabel).map((label) => (
          <MenuItem key={label[0]} value={label[0]}>
            {label[1]}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const DueDateStart = () => {
  const { dueDateStart, setDueDateStart } = useTaskFilters();

  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant={"body2"} component={"div"} ml={1}>
        Срок от
      </Typography>
      <DesktopDatePicker
        value={dueDateStart}
        onChange={(date) => setDueDateStart(date)}
        slotProps={{
          textField: {
            variant: "outlined",
            size: "small",
          },
        }}
      />
    </Box>
  );
};

const DueDateEnd = () => {
  const { dueDateEnd, setDueDateEnd } = useTaskFilters();

  return (
    <Box sx={{ display: "grid", gap: 0.5, textAlign: "left" }}>
      <Typography variant={"body2"} component={"div"} ml={1}>
        Срок до
      </Typography>
      <DesktopDatePicker
        value={dueDateEnd}
        onChange={(date) => setDueDateEnd(date)}
        slotProps={{
          textField: {
            variant: "outlined",
            size: "small",
          },
        }}
      />
    </Box>
  );
};
