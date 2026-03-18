import { runAgent } from "../src/agent";
import { sendEmail } from "../src/email";

export default async function handler(req: any, res: any) {
  try {
    const result = await runAgent();
    await sendEmail(result);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}