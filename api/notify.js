export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, event_type, source } = req.body || {};
  if (!email) return res.status(400).json({ error: 'No email provided' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return res.status(500).json({ error: 'Email service not configured' });

  const sourceLabel = {
    general:  'Greens Marriage Hall',
    indulge:  'Indulge The Salon',
    sinfonia: 'Studio Sinfonia',
    weavorah: 'Weavorah'
  }[source] || 'Greens Group';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f8f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(60,100,65,.10);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3d6b40,#5a8a5e);padding:36px 40px;text-align:center;">
            <div style="font-size:2.2rem;">🌿</div>
            <h1 style="color:#ffffff;font-size:1.4rem;font-weight:700;margin:8px 0 4px;font-family:Georgia,serif;">Greens Marriage Hall</h1>
            <p style="color:rgba(255,255,255,.75);font-size:.85rem;margin:0;">Bhubaneswar, Odisha</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="font-family:Georgia,serif;font-size:1.3rem;color:#2d3a2e;margin:0 0 12px;">We've received your enquiry! ✅</h2>
            <p style="color:#7a7570;font-size:.95rem;line-height:1.7;margin:0 0 24px;">
              Dear <strong style="color:#2d3a2e;">${name || 'there'}</strong>,<br><br>
              Thank you for reaching out to <strong>${sourceLabel}</strong>. We have received your enquiry and our team will get back to you within <strong>24 hours</strong> to discuss availability and next steps.
            </p>

            <!-- Details box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef5ef;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:20px 24px;">
                <p style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#5a8a5e;margin:0 0 12px;">Enquiry Summary</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:.88rem;color:#7a7570;font-weight:700;padding:4px 0;width:120px;">Service</td>
                    <td style="font-size:.88rem;color:#2d3a2e;padding:4px 0;">${event_type || 'General Enquiry'}</td>
                  </tr>
                  <tr>
                    <td style="font-size:.88rem;color:#7a7570;font-weight:700;padding:4px 0;">Brand</td>
                    <td style="font-size:.88rem;color:#2d3a2e;padding:4px 0;">${sourceLabel}</td>
                  </tr>
                  <tr>
                    <td style="font-size:.88rem;color:#7a7570;font-weight:700;padding:4px 0;">Status</td>
                    <td style="font-size:.88rem;padding:4px 0;"><span style="background:#dbeafe;color:#1d4ed8;padding:2px 10px;border-radius:10px;font-weight:700;font-size:.8rem;">Under Review</span></td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <p style="color:#7a7570;font-size:.9rem;line-height:1.7;margin:0 0 24px;">
              In the meantime, you can reach us directly:
            </p>

            <!-- Contact buttons -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="https://wa.me/919040210791" style="display:inline-flex;align-items:center;gap:8px;background:#25d366;color:#fff;padding:10px 20px;border-radius:30px;font-weight:700;font-size:.88rem;text-decoration:none;">💬 WhatsApp Us</a>
                </td>
                <td>
                  <a href="tel:+919040210791" style="display:inline-flex;align-items:center;gap:8px;background:#eef5ef;color:#3d6b40;padding:10px 20px;border-radius:30px;font-weight:700;font-size:.88rem;text-decoration:none;border:1.5px solid #c8dfc9;">📞 Call Us</a>
                </td>
              </tr>
            </table>

            <p style="color:#7a7570;font-size:.88rem;line-height:1.6;margin:0;">
              You can also track your enquiry status by logging into your account at<br>
              <a href="https://greens-marriage-hall.vercel.app/my-enquiries.html" style="color:#3d6b40;font-weight:700;">greens-marriage-hall.vercel.app</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f5f8f5;padding:24px 40px;text-align:center;border-top:1px solid #c8dfc9;">
            <p style="font-size:.78rem;color:#7a7570;margin:0;">© 2025 Greens Marriage Hall · Bhubaneswar, Odisha<br>
            This email was sent because you submitted an enquiry on our website.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Greens Marriage Hall <onboarding@resend.dev>',
        to: [email],
        subject: `We've received your enquiry — ${sourceLabel}`,
        html
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notify error:', err);
    return res.status(500).json({ error: err.message });
  }
}
