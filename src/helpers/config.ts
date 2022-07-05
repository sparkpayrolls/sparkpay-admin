export const config = () => ({
  isDev() {
    return process.env.NODE_ENV !== "production";
  },
  apiUrl: process.env.REACT_APP_API_URL,
});
