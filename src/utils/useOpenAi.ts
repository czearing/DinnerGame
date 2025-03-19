import { useQuery } from "@tanstack/react-query";
import { fetchQuestion } from "../server";

export const useOpenAi = (
  input: string,
  instructions: string,
  enabled: boolean = true,
  refetchOnParamChange: boolean = false
) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["generate-question"],
    queryFn: () => fetchQuestion(input, instructions),
    enabled: !!input && enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { data, isLoading, refetch };
};
