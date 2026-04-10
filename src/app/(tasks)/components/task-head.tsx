import {
  Box,
  Checkbox,
  Stack,
  TableHead,
  TableRow,
  TableSortLabel,
  tableSortLabelClasses,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { ChangeEvent, MouseEvent } from "react";

import { COLORS } from "@/app/tokens";
import { Order, TaskHeadCell } from "@/app/types";
import { Task } from "@/schemas/tasks";

const headCells: TaskHeadCell[] = [
  {
    id: "priority",
    label: "Приоритет",
  },
  {
    id: "status",
    label: "Статус",
  },
  {
    id: "dueDate",
    label: "Срок",
  },
  {
    id: "createdAt",
    label: "Создано",
  },
];

export default function TaskHead({
  onSelectAllClick,
  order,
  sortBy,
  numSelected,
  rowCount,
  onRequestSort,
}: {
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof Task | null,
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  sortBy: keyof Task | null;
  rowCount: number;
}) {
  const createSortHandler =
    (property: keyof Task) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell
          key={"title"}
          align={"left"}
          padding={"normal"}
          sortDirection={sortBy === "title" ? order : false}
          sx={{ paddingLeft: 1 }}
        >
          <TableSortLabel
            active={sortBy === "title"}
            direction={sortBy === "title" && order ? order : "asc"}
            onClick={createSortHandler("title")}
            sx={{
              textWrap: "nowrap",
              fontSize: "medium",
              color: COLORS["$grey-9"],
              [`&.${tableSortLabelClasses.active}`]: {
                color: COLORS["$grey-6"],
              },
            }}
          >
            Название
          </TableSortLabel>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={sortBy === headCell.id ? order : false}
          >
            <Stack direction={"row"} justifyContent={"center"}>
              <Box width={18} />
              <TableSortLabel
                active={sortBy === headCell.id}
                direction={sortBy === headCell.id && order ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  textWrap: "nowrap",
                  fontSize: "medium",
                  color: COLORS["$grey-9"],
                  [`&.${tableSortLabelClasses.active}`]: {
                    color: COLORS["$grey-6"],
                  },
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </Stack>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}
