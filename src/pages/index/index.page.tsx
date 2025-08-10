import BadgeIcon from "@mui/icons-material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BusinessIcon from "@mui/icons-material/Business";
import Container from "@mui/material/Container";
import GroupIcon from "@mui/icons-material/Group";
import PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import Typography from "@mui/material/Typography";
import { WithAuth } from "../../hoc/with-auth.hoc/with-auth.hoc";
import { DashboardLayout } from "../../layouts/dashboard.layout/dashboard.layout";
import { Util } from "../../helpers/util/util";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";
import { useIndexPageContext } from "./hooks";
import { TrendingIcon } from "./components";

function _IndexPage() {
  const getDataRetrievalErrorHandler = (getData: () => unknown) => {
    return () => {
      snackbar({
        open: true,
        message: "Error loading data",
        autoHideDuration: null,
        action: (
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              getData();
              snackbar({ open: false, autoHideDuration: 3000 });
            }}
          >
            Refresh
          </Button>
        ),
      });
    };
  };
  const { data, loading, getTrendDatesAndAmounts } = useIndexPageContext({
    getDataRetrievalErrorHandler,
  });

  return (
    <DashboardLayout loading={loading}>
      <Box py={4}>
        <Container>
          <Box display="flex" flexDirection="column" gap={4}>
            {data.map((point) => {
              const currency = point.country.currencySymbol;
              const {
                currentAmount: payrollCurrent = 0,
                previousAmount: payrollPrevious = 0,
              } = getTrendDatesAndAmounts(point.payrolls.amountTrend);
              const {
                currentAmount: revenueCurrent = 0,
                previousAmount: revenuePrevious = 0,
              } = getTrendDatesAndAmounts(point.revenue.amountTrend);
              const {
                currentAmount: companyCurrent = 0,
                previousAmount: companyPrevious = 0,
              } = getTrendDatesAndAmounts(point.companies.trend);
              const {
                currentAmount: employeeCurrent = 0,
                previousAmount: employeePrevious = 0,
              } = getTrendDatesAndAmounts(point.employees.trend);
              const {
                currentAmount: userCurrent = 0,
                previousAmount: userPrevious = 0,
              } = getTrendDatesAndAmounts(point.users.trend);

              return (
                <Box key={point.country.id}>
                  <Typography variant="h3" mb={3}>
                    {point.country.name}
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Box
                        className="analytics-card analytics-card--dark"
                        flexGrow={0.25}
                      >
                        <Box className="analytics-card__icon" mb={1}>
                          <PaymentsIcon />
                        </Box>

                        <Typography
                          variant="h4"
                          component="p"
                          className="analytics-card__title"
                        >
                          {currency}{" "}
                          {Util.shortenNumber(point.payrolls.amount, 2)}
                        </Typography>

                        <Typography className="analytics-card__sub-title">
                          Total amount processed
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <BusinessIcon />
                        </Box>

                        <Typography
                          variant="h4"
                          component="p"
                          className="analytics-card__title"
                        >
                          {point.companies.count}
                        </Typography>

                        <Typography className="analytics-card__sub-title">
                          Total number of companies
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <BadgeIcon />
                        </Box>

                        <Typography
                          variant="h4"
                          component="p"
                          className="analytics-card__title"
                        >
                          {point.employees.count}
                        </Typography>

                        <Typography className="analytics-card__sub-title">
                          Total number of employees
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <GroupIcon />
                        </Box>

                        <Typography
                          variant="h4"
                          component="p"
                          className="analytics-card__title"
                        >
                          {point.users.count}
                        </Typography>

                        <Typography className="analytics-card__sub-title">
                          Total number of users
                        </Typography>
                      </Box>

                      <Box
                        className="analytics-card analytics-card--dark"
                        flexGrow={0.25}
                      >
                        <Box className="analytics-card__icon" mb={1}>
                          <SavingsIcon />
                        </Box>

                        <Typography
                          variant="h4"
                          component="p"
                          className="analytics-card__title"
                        >
                          {currency}{" "}
                          {Util.shortenNumber(point.revenue.amount, 2)}
                        </Typography>

                        <Typography className="analytics-card__sub-title">
                          Total revenue
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <PaymentsIcon />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            component="p"
                            className="analytics-card__title"
                          >
                            {currency} {Util.shortenNumber(payrollCurrent, 2)}
                          </Typography>

                          <TrendingIcon
                            previous={payrollPrevious}
                            current={payrollCurrent}
                          />
                        </Box>

                        <Typography
                          component="span"
                          className="analytics-card__sub-title"
                        >
                          Payroll
                        </Typography>

                        <Typography component="p" variant="caption">
                          {currency} {Util.shortenNumber(payrollPrevious, 2)}{" "}
                          last month
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <BusinessIcon />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            component="p"
                            className="analytics-card__title"
                          >
                            {companyCurrent}
                          </Typography>

                          <TrendingIcon
                            previous={companyPrevious}
                            current={companyCurrent}
                          />
                        </Box>

                        <Typography
                          component="span"
                          className="analytics-card__sub-title"
                        >
                          Companies
                        </Typography>

                        <Typography component="p" variant="caption">
                          {companyPrevious} last month
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <BadgeIcon />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            component="p"
                            className="analytics-card__title"
                          >
                            {employeeCurrent}
                          </Typography>

                          <TrendingIcon
                            previous={employeePrevious}
                            current={employeeCurrent}
                          />
                        </Box>

                        <Typography
                          component="span"
                          className="analytics-card__sub-title"
                        >
                          Employees
                        </Typography>

                        <Typography component="p" variant="caption">
                          {employeePrevious} last month
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <GroupIcon />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            component="p"
                            className="analytics-card__title"
                          >
                            {userCurrent}
                          </Typography>

                          <TrendingIcon
                            previous={userPrevious}
                            current={userCurrent}
                          />
                        </Box>

                        <Typography
                          component="span"
                          className="analytics-card__sub-title"
                        >
                          Users
                        </Typography>

                        <Typography component="p" variant="caption">
                          {userPrevious} last month
                        </Typography>
                      </Box>

                      <Box className="analytics-card" flexGrow={0.25}>
                        <Box className="analytics-card__icon" mb={1}>
                          <SavingsIcon />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            component="p"
                            className="analytics-card__title"
                          >
                            {currency} {Util.shortenNumber(revenueCurrent, 2)}
                          </Typography>

                          <TrendingIcon
                            previous={revenuePrevious}
                            current={revenueCurrent}
                          />
                        </Box>

                        <Typography
                          component="span"
                          className="analytics-card__sub-title"
                        >
                          Revenue
                        </Typography>

                        <Typography component="p" variant="caption">
                          {currency} {Util.shortenNumber(revenuePrevious, 2)}{" "}
                          last month
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

const IndexPage = WithAuth(_IndexPage);

export default IndexPage;
