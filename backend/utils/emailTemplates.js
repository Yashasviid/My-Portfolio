// ── Email sent to Yashasvi (notification) ──────────────────────────────────
const ownerNotification = ({ name, email, message }) => ({
  subject: `📬 New Portfolio Message from ${name}`,
  html: `
    <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;border:1px solid #222">
      <h2 style="margin:0 0 4px;color:#a78bfa">New Message!</h2>
      <p style="color:#888;margin:0 0 24px;font-size:13px">Received via your portfolio contact form</p>

      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:10px 14px;background:#111;border-radius:8px 8px 0 0;color:#a78bfa;font-size:12px;font-weight:600;letter-spacing:.05em">FROM</td>
        </tr>
        <tr>
          <td style="padding:12px 14px;background:#161616;border-radius:0 0 8px 8px;font-size:15px">${name} &lt;${email}&gt;</td>
        </tr>
      </table>

      <div style="margin-top:16px;padding:16px;background:#161616;border-radius:8px;border-left:3px solid #a78bfa">
        <p style="margin:0;font-size:14px;line-height:1.7;color:#ccc">${message.replace(/\n/g, '<br>')}</p>
      </div>

      <a href="mailto:${email}?subject=Re: Your message from Yashasvi's portfolio"
         style="display:inline-block;margin-top:20px;padding:10px 20px;background:#a78bfa;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600">
        Reply to ${name}
      </a>
    </div>
  `,
});

// ── Auto-reply sent to the visitor ─────────────────────────────────────────
const visitorAutoReply = ({ name }) => ({
  subject: `Hey ${name}, I got your message! 👋`,
  html: `
    <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;border:1px solid #222">
      <h2 style="margin:0 0 8px;color:#a78bfa">Thanks for reaching out, ${name}! 🙌</h2>
      <p style="color:#ccc;line-height:1.7">I've received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
      <p style="color:#ccc;line-height:1.7">In the meantime, feel free to check out my work on
        <a href="https://github.com/Yashasviid" style="color:#a78bfa">GitHub</a>.
      </p>
      <hr style="border:none;border-top:1px solid #222;margin:24px 0">
      <p style="color:#666;font-size:12px;margin:0">— Yashasvi Dixit · CS Undergrad @ Banasthali Vidyapith</p>
    </div>
  `,
});

module.exports = { ownerNotification, visitorAutoReply };
