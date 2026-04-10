import { Checkbox, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import { MouseEvent } from "react";

import RemoveAndEdit from "@/app/(tasks)/components/remove-and-edit";
import TitleCellContent from "@/app/(tasks)/components/title-cell-content";
import { COLORS } from "@/app/tokens";
import { formatDateTime } from "@/lib/date";
import { priorityLabel, statusLabel, Task } from "@/schemas/tasks";

export default function TaskRow({
  selected,
  setSelected,
  row,
}: {
  selected: Set<string>;
  setSelected: (selected: Set<string>) => void;
  row: Task;
}) {
  const isItemSelected = selected.has(row.id);

  const handleClick = (_: MouseEvent<unknown>, id: string) => {
    const next = new Set<string>(selected);

    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    setSelected(next);
  };

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{
        cursor: "pointer",
        [`&.${tableRowClasses.selected}`]: {
          boxShadow: `inset 3px 0 0 ${COLORS["$blue-3"]}`,
        },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} />
      </TableCell>
      <TableCell sx={{ paddingLeft: 1, maxWidth: 400 }} align="left">
        <TitleCellContent title={row.title} description={row.description} />
      </TableCell>
      <TableCell align="center">
        <Typography>{priorityLabel[row.priority]}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography noWrap>{statusLabel[row.status]}</Typography>
      </TableCell>
      <TableCell align="center">
        {row.dueDate !== null ? (
          <div>
            <Typography>{formatDateTime(row.dueDate).time}</Typography>
            <Typography>{formatDateTime(row.dueDate).date}</Typography>
          </div>
        ) : null}
      </TableCell>
      <TableCell align="center">
        <div>
          <Typography>{formatDateTime(row.createdAt).time}</Typography>
          <Typography>{formatDateTime(row.createdAt).date}</Typography>
        </div>
      </TableCell>
      <TableCell>
        <RemoveAndEdit task={row} />
      </TableCell>
    </TableRow>
  );
}
