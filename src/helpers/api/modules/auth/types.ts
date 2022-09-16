import { User } from "../../../../types";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoggedInUser = {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
};

export type AuthDetails = Pick<
  LoggedInUser,
  "accessToken" | "refreshToken" | "accessTokenExpires" | "refreshTokenExpires"
>;
