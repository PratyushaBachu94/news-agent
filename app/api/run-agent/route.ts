import { runAgent } from "@/src/agent";
import { sendEmail } from "@/src/email";

export async function GET() {
  try {
    const result = await runAgent();
    await sendEmail(result);

    return Response.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}