import { hasPath } from "ramda";

type UseHasSubmitProp = {
  type: string,
  data: any
}

export const useHasSubmit = (fetcher: UseHasSubmitProp) => {
  const isDone = fetcher.type === "done";
  const hasError = hasPath(['data', 'error'], fetcher);

  return isDone && !hasError;
}
