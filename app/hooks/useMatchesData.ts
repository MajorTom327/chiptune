import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export function useMatchesData<T>(
  id: string
): Record<string, T> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}
