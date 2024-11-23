// src/utils/useOpenAi.ts
import { useQuery } from "@tanstack/react-query";
import { fetchQuestion } from "../server";

export const useOpenAi = (input: string, instructions: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["generate-question", input, instructions],
    queryFn: () => fetchQuestion(input, instructions),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { data, isLoading, refetch };
};
