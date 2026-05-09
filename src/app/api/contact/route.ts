import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Basic input validation — no external library needed for this simple form
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 2000)
}

function buildEmailHtml(safe: Record<string, string>): string {
  return `
    <h2 style="color:#1A3A5C">New Contact Form Submission — Avyay Group</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #e2e8f0">Name</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${safe.name}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #e2e8f0">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${safe.email}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #e2e8f0">Phone</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${safe.phone || '—'}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #e2e8f0">Subject</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${safe.subject || '—'}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;border:1px solid #e2e8f0">Message</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${safe.message}</td></tr>
    </table>
  `
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, phone, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const safe = {
    name: sanitize(String(name)),
    email: sanitize(String(email)),
    phone: sanitize(String(phone ?? '')),
    subject: sanitize(String(subject ?? '')),
    message: sanitize(String(message)),
  }

  const contactEmail = process.env.CONTACT_EMAIL || 'info@avyaygroup.in'
  const emailSubject = `[Website Enquiry] ${safe.subject || safe.name}`
  const emailHtml = buildEmailHtml(safe)

  // ── Option 1: Hostinger SMTP via nodemailer (preferred — works once you add creds to .env.local)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS on port 587
      auth: { user: smtpUser, pass: smtpPass },
    })

    try {
      await transporter.sendMail({
        from: `"Avyay Group Website" <${smtpUser}>`,
        to: contactEmail,
        replyTo: safe.email,
        subject: emailSubject,
        html: emailHtml,
      })
      return NextResponse.json({ success: true })
    } catch (err) {
      console.error('[Contact] SMTP send failed:', err)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }
  }

  // ── Option 2: Resend API (alternative — requires a free Resend account + domain verification)
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey && resendApiKey !== 'placeholder') {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Avyay Group Website <noreply@avyaygroup.in>',
        to: [contactEmail],
        reply_to: safe.email,
        subject: emailSubject,
        html: emailHtml,
      }),
    })

    if (!resendRes.ok) {
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  }

  // ── Fallback: log to console in development (email not configured)
  console.log('[Contact Form Submission — email not configured]', safe)
  return NextResponse.json({ success: true })
}
