"use client";

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ height: "100%", display: "grid", placeContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
