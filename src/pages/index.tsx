import * as React from "react";
import { useOpenAi } from "../utils";

export default function Home() {
  const botDescription =
    "You are a bot that generates dinner questions and provides only the question to ask";

  const instructions = "Give me a dinner game question";

  const { data } = useOpenAi(botDescription!, instructions);

  return <div>Hello world +{JSON.stringify(data)}</div>;
}
