import { Resend } from "resend";



export async function sendEmail(newsItems, subject) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("📧 Sending email...");

  const htmlContent = `
    <div style="font-family: Arial; max-width: 600px; margin: auto;">
      <h2>Daily Tech Brief</h2>

      ${newsItems
        .map(
          (item) => `
        <div style="
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
        ">
          <h3>${item.title}</h3>
          
          <p><b>Summary:</b> ${item.summary}</p>
          <p><b>Why it matters:</b> ${item.why}</p>

          <a href="${item.url}" target="_blank"
            style="
              display: inline-block;
              margin-top: 10px;
              padding: 8px 12px;
              background-color: black;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            ">
            Read Full Article →
          </a>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "pratz.bachu@gmail.com",
    subject: subject,
    html: htmlContent,
  });

  if (response.error) {
    console.error("❌ Email error:", response.error);
  } else {
    console.log("✅ Email sent:", response.data);
  }
}