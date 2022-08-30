import Box from "@mui/material/Box";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { IF } from "../../components/if.component/if.component";

export const TrendingIcon = (props: { current: number; previous: number }) => {
  const { current, previous } = props;

  return (
    <>
      <IF condition={current < previous}>
        <Box
          className="analytics-card__icon"
          sx={{ background: "transparent" }}
          color="error.main"
          p={0.5}
        >
          <TrendingDownIcon />
        </Box>
      </IF>

      <IF condition={current > previous}>
        <Box
          className="analytics-card__icon"
          sx={{ background: "transparent" }}
          color="success.main"
          p={0.5}
        >
          <TrendingUpIcon />
        </Box>
      </IF>

      <IF condition={current === previous}>
        <Box
          className="analytics-card__icon"
          sx={{ background: "transparent" }}
          color="success.main"
          p={0.5}
        >
          <TrendingFlatIcon />
        </Box>
      </IF>
    </>
  );
};
