import { useQuery } from "@tanstack/react-query";
import { fetchOpenAi } from "../server";

export const useOpenAi = (input: string, instructions: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["open-ai", input],
    queryFn: () => fetchOpenAi(input, instructions),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading };
};
