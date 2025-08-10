import { useCallback, useEffect, useState } from "react";
import { $api } from "./helpers/api/api";
import { useAppDispatch } from "./state/hooks";
import { snackbar } from "./state/reducers/snackbar/snackbar.reducer";
import { commitUser } from "./state/reducers/user/user.reducer";

export const useAppContext = () => {
  const dispatch = useAppDispatch();
  const SETUP_STEPS = 4;
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback((progress: number) => {
    setProgress((_progress) => Math.max(progress, _progress));
  }, []);

  useEffect(() => {
    snackbar.register(dispatch);
  }, [dispatch]);

  useEffect(() => {
    $api.registerInterceptors(dispatch);
    updateProgress(1);
  }, [dispatch, updateProgress]);

  useEffect(() => {
    const timeout150 = setTimeout(updateProgress, 500, 2);
    const timeout300 = setTimeout(updateProgress, 1000, 3.8);

    return () => {
      clearTimeout(timeout150);
      clearTimeout(timeout300);
    };
  }, [updateProgress]);

  useEffect(() => {
    $api.user
      .getDetails()
      .then((user) => {
        dispatch(commitUser(user));
      })
      .catch((error) => {
        if (error.status === 401) {
          dispatch(commitUser(null));
        }
      })
      .finally(() => updateProgress(4));
  }, [dispatch, updateProgress]);

  return { progress, SETUP_STEPS };
};

export const useParamStateKey = <
  T extends Record<string, unknown>,
  K extends Record<string, unknown>
>(
  params: T,
  state: K
) => {
  const [key, setKey] = useState(JSON.stringify(params));

  useEffect(() => {
    setKey((key) => {
      const newKey = JSON.stringify(params);
      if (
        state[newKey] ||
        (state["data"] && (state["data"] as Record<string, unknown>)[newKey])
      ) {
        return newKey;
      }

      return key;
    });
  }, [params, state]);

  return key;
};
