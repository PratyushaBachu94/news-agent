import dotenv from "dotenv";
dotenv.config();

import { runAgent } from "./agent";
import { sendEmail } from "./email";

async function main() {
  const result = await runAgent();
  console.log("\n🧠 AI NEWS BRIEF:\n");
  console.log(result);
  await sendEmail(result || "No updates today");
}

main();