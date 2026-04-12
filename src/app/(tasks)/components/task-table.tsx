"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

import AddTask from "@/app/(tasks)/components/add-task";
import TaskHead from "@/app/(tasks)/components/task-head";
import TaskRow from "@/app/(tasks)/components/task-row";
import { useTaskOrder } from "@/app/(tasks)/hooks/useTaskOrder";
import { useTasks } from "@/app/(tasks)/hooks/useTasks";
import { COLORS } from "@/app/tokens";
import refreshSvg from "@/assets/svg/refresh.svg";
import { api } from "@/lib/api";
import { Task, TaskResponse } from "@/schemas/tasks.sever";

const LIMIT = 5;

export default function TaskTable({
  initialTasks,
}: {
  initialTasks?: TaskResponse;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { resetSorting } = useTaskOrder();

  const {
    data: tasks,
    isLoading,
    isValidating,
    mutate,
    page,
    setPage,
  } = useTasks({ initialTasks });

  const { trigger: triggerRemoveMany, isMutating: isRemovingMany } =
    useSWRMutation<unknown, unknown, string, { ids: string[] }>(
      "/api/tasks",
      (url, { arg }) => api.delete(url, { data: arg }),
    );

  useEffect(() => {
    setSelected(new Set());
  }, [tasks?.data]);

  const from = tasks?.meta.total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, tasks?.meta.total ?? 0);

  const handleRemoveMany = async () => {
    const ids = Array.from(selected);

    if (ids.length === 0) {
      return;
    }

    await triggerRemoveMany({ ids });
    await mutate();
    setSelected(new Set());
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "30px",
        height: "100%",
        borderRadius: "10px",
      }}
    >
      <AddTask open={open} setOpen={setOpen} />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Typography variant="h6" fontSize={20} fontWeight={600} component="div">
          Все задачи
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            color="error"
            sx={{ borderRadius: "6px" }}
            loading={isRemovingMany}
            disabled={selected.size === 0}
            onClick={handleRemoveMany}
          >
            <DeleteOutlineIcon />
          </IconButton>

          <Button
            variant="outlined"
            sx={{ minWidth: "42px", padding: "9px", borderRadius: "8px" }}
            color="secondary"
            onClick={() => {
              resetSorting();
              mutate();
            }}
          >
            <Image src={refreshSvg} alt="Refresh" width={22} height={22} />
          </Button>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            variant="contained"
            sx={{ borderRadius: "6px" }}
            onClick={() => setOpen(true)}
          >
            Добавить
          </Button>
        </Stack>
      </Stack>
      <TableEl
        tasks={tasks?.data}
        isLoading={isLoading || isValidating}
        selected={selected}
        setSelected={setSelected}
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>
          <span style={{ color: COLORS["$grey-10"] }}>Показано</span> {from}-
          {to} <span style={{ color: COLORS["$grey-10"] }}>из</span>{" "}
          {tasks?.meta.total}
        </Typography>
        <Pagination
          page={page}
          count={tasks?.meta.totalPages}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              variant={
                item.type === "previous" || item.type === "next"
                  ? "text"
                  : item.variant
              }
              sx={{
                margin: "0 4px",
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}

const TableEl = ({
  tasks,
  isLoading,
  selected,
  setSelected,
}: {
  tasks: Task[] | undefined;
  isLoading: boolean;
  selected: Set<string>;
  setSelected: (selected: Set<string>) => void;
}) => {
  const { order, sortBy, setOrder, setSortBy } = useTaskOrder();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Task | null,
  ) => {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tasks?.map((task) => task.id);

      if (newSelected) {
        setSelected(new Set(newSelected));
      }
      return;
    }

    setSelected(new Set());
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: 5,
        opacity: isLoading ? 0.5 : undefined,
      }}
    >
      <TableContainer>
        <Table size="medium">
          <TaskHead
            numSelected={selected.size}
            order={order}
            sortBy={sortBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tasks?.length ?? 0}
          />
          <TableBody>
            {tasks?.length ? (
              tasks.map((row) => (
                <TaskRow
                  key={row.id}
                  selected={selected}
                  setSelected={setSelected}
                  row={row}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{ borderBottom: "none", padding: 0 }}
                >
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const EmptyState = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{
        minHeight: 280,
        padding: 4,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Пока нет задач
      </Typography>
      <Typography variant="body2">
        Добавьте первую задачу или измените фильтры поиска.
      </Typography>
    </Stack>
  );
};
