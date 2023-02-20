import { useSearchParams } from "@remix-run/react";


export const usePage = () => {

  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);

  return [page || 1, (page: number) => setParams({ page: page.toString() })] as const;
}

export default usePage;
