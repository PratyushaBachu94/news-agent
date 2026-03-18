import dotenv from "dotenv";
dotenv.config();

import { runAgent } from "./agent.js";
import { sendEmail } from "./email.js";

async function main() {
  const result = await runAgent();
  console.log("\n🧠 AI NEWS BRIEF:\n");
  console.log(result);
  await sendEmail(result || "No updates today");
}

main();