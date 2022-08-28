import { Administrator, Company, Country, User } from "../../../../types";
import { QueryParams } from "../../types";

export type GetUsersQueryParams = QueryParams & {
  search?: string;
};

export type GetUsersResponse = Pick<
  User,
  "firstname" | "lastname" | "email" | "createdAt" | "id"
> & {
  country: Pick<Country, "name" | "id">;
  companies: (Pick<Administrator, "isRoot" | "id"> & {
    company: Pick<Company, "name">;
  })[];
};
