import { Box, Tooltip, Typography } from "@mui/material";

import { useTextOverflow } from "@/lib/useTextOverflow";
import { Task } from "@/schemas/tasks";

export default function TitleCellContent({
  title,
  description,
}: Pick<Task, "title" | "description">) {
  const [titleRef, getTitleTooltip] = useTextOverflow();
  const [descriptionRef, getDescriptionTooltip] = useTextOverflow();

  return (
    <Box display={"grid"}>
      <Tooltip title={getTitleTooltip(title)}>
        <Typography ref={titleRef} fontWeight={600} className={"truncate"}>
          {title}
        </Typography>
      </Tooltip>

      <Tooltip title={getDescriptionTooltip(description ?? "")}>
        <Typography
          variant={"subtitle2"}
          ref={descriptionRef}
          className={"truncate"}
        >
          {description}
        </Typography>
      </Tooltip>
    </Box>
  );
}
