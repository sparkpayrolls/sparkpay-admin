import { User } from "../../../../types";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoggedInUser = {
  user: User;
  token: string;
};
