import { GetTransfersQuery } from "../../helpers/api/modules/payout/type";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";

export type TransferTableFilterContentProps = {
  formContext: ReturnType<typeof useFormContext<GetTransfersQuery>>;
};