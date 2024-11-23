export const fetchQuestion = async (prompt: string, instructions: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/generateQuestion?prompt=${prompt}&instructions=${instructions}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return data;
};
