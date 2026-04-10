import { MouseEvent, useState } from "react";

export const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    popoverProps: {
      open,
      anchorEl,
      onClose: handleClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      } as const,
      transformOrigin: {
        vertical: "top",
        horizontal: "right",
      } as const,
    },
    handleOpen,
    handleClose,
  };
};
