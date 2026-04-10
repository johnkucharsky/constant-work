"use client";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Box,
  debounce,
  InputAdornment,
  OutlinedInput,
  outlinedInputClasses,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { useTaskFilters } from "@/app/(tasks)/hooks/useTaskFilters";
import { COLORS } from "@/app/tokens";

const searchInputStyles = {
  width: "100%",
  maxWidth: "1024px",
  backgroundColor: "#f3f3f3",
  paddingLeft: "20px",

  [`&.${outlinedInputClasses.focused}`]: {
    backgroundColor: "unset",
  },

  [`& .${outlinedInputClasses.input}`]: {
    paddingTop: "12px",
    paddingBottom: "12px",

    "&::placeholder": {
      color: COLORS["$grey-12"],
      opacity: 1,
    },
  },
};

export default function SearchBar() {
  const { query, setQuery } = useTaskFilters();
  const [localValue, setLocalValue] = useState(query);

  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 500),
    [setQuery],
  );

  useEffect(() => {
    return () => {
      debouncedSetQuery.clear();
    };
  }, [debouncedSetQuery]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "26px 30px",
        display: "grid",
        gap: 2,
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        mb: "30px",
        borderRadius: "10px",
      }}
    >
      <Typography variant={"h5"} fontWeight={600}>
        Задачи
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
        }}
      >
        <OutlinedInput
          value={localValue}
          onChange={(e) => {
            const value = e.target.value;
            setLocalValue(value); // instant UI update
            debouncedSetQuery(value); // delayed update
          }}
          startAdornment={
            <InputAdornment position={"start"}>
              <SearchOutlinedIcon
                sx={{ color: COLORS["$grey-12"], zIndex: 1 }}
              />
            </InputAdornment>
          }
          placeholder={"Найти"}
          sx={searchInputStyles}
        />
      </Box>
      {/*it's here to center input*/}
      <Typography
        variant={"h6"}
        fontWeight={600}
        color={"transparent"}
        className={"up-md"}
      >
        Задачи
      </Typography>
    </Box>
  );
}
