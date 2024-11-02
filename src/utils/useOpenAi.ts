// src/utils/useOpenAi.ts
import { useQuery } from "@tanstack/react-query";
import { fetchOpenAi } from "../server";

export const useOpenAi = (input: string, instructions: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["open-ai", input, instructions],
    queryFn: () => fetchOpenAi(input, instructions),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading, refetch };
};
