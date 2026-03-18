import { runAgent } from "@/src/agent";
import { sendEmail } from "@/src/email";

export async function GET() {
  try {
    const result = await runAgent();

    // 🌅 Morning email
    await sendEmail(result, "Morning Tech Brief ☀️");

    // 🌆 Evening email (same content for now)
    await sendEmail(result, "Evening Tech Brief 🌆");

    return Response.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}