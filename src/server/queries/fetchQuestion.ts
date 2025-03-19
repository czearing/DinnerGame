export const fetchQuestion = async (prompt: string, instructions: string) => {
  console.log(prompt);
  console.log(instructions);

  // Properly encode the parameters for the URL
  const encodedPrompt = encodeURIComponent(prompt);
  const encodedInstructions = encodeURIComponent(instructions);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const res = await fetch(
    `${apiUrl}/api/generateQuestion?prompt=${encodedPrompt}&instructions=${encodedInstructions}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return data;
};
