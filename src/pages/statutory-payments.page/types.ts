import { GetStatutoryPaymentsQuery } from "../../helpers/api/modules/statutory-payments/types";
import { useFormContext } from "../../helpers/hooks/use-form-context.hook/use-form-context.hook";

export type StatutoryPaymentsTableFilterContentProps = {
  formContext: ReturnType<typeof useFormContext<GetStatutoryPaymentsQuery>>;
};
