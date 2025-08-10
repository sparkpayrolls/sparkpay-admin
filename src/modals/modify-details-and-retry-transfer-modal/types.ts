import { Bank } from "../../helpers/api/modules/banks/types";
import { Transfer } from "../../helpers/api/modules/payout/type";

export type ModifyDetailsAndRetryTransferModalProps = {
  banks: Bank[];
  transfer: Transfer;
};
