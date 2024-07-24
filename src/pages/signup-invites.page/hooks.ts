import moment from "moment";
import { ApiResponseWithMeta } from "../../helpers/api/types";
import { usePageContextData } from "../../helpers/hooks/use-page-context-data.hook/use-page-context-data.hook";
import { getAuthTokens } from "../../state/reducers/auth/auth.reducer";
import { AuthToken } from "../../types";
import { Util } from "../../helpers/util/util";
import NiceModal from "@ebay/nice-modal-react";
import { AddSignupInviteModal } from "../../modals/add-signup-invite.modal/add-signup-invite.modal";
import { snackbar } from "../../state/reducers/snackbar/snackbar.reducer";

export const useSignupInvitePageContext = () => {
  const initialParams = {
    page: 0,
    limit: 100,
  };
  const {
    data: authTokens,
    loading,
    shouldRefresh,
    key,
    params,
    // setParams,
    // setLoading,
    refresh,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
  } = usePageContextData<
    Record<string, ApiResponseWithMeta<AuthToken[]>>,
    typeof initialParams
  >({
    getData: getAuthTokens,
    initialParams,
    stateKey: "authTokens",
  });

  const { data, meta } = authTokens[key] || {};

  return {
    count: meta?.total || 0,
    data:
      data?.map((item) => {
        return {
          cells: [
            item.id,
            (item.meta?.firstName as string) || "--",
            (item.meta?.lastName as string) || "--",
            (item.meta?.company as string) || "--",
            (item.meta?.email as string) || "--",
            item.token,
            item.isUsed?.toString()?.toUpperCase(),
            item.isRevoked?.toString()?.toUpperCase(),
            moment(item.createdAt).format("MMMM DD, YYYY"),
          ],
          moreOptions: [
            {
              label: "Copy Link",
              onClick() {
                navigator.clipboard.writeText(
                  `https://www.sparkpayhq.com/create-account?inviteCode=${item.token}`
                );
                snackbar({
                  open: true,
                  message: "Invite link copied to clipboard!",
                });
              },
            },
          ],
        };
      }) || [],
    headRow: [
      { label: "ID" },
      { label: "Firstname" },
      { label: "Lastname" },
      { label: "Company" },
      { label: "Email" },
      { label: "Token" },
      { label: "Used" },
      { label: "Revoked" },
      { label: "Date Created" },
    ],
    loading,
    params,
    shouldRefresh,
    title: `${Util.formatMoneyNumber(meta?.total || 0, 0)} Invite Tokens`,
    handlePageChange,
    handleRowsPerPageChange,
    refresh,
    createInviteToken() {
      return NiceModal.show(AddSignupInviteModal).then(refresh);
    },
  };
};
