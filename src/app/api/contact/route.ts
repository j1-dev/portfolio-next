import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();

    const payload = {
      from: `${name} <${process.env.MY_EMAIL!}>`,
      to: ['aephyxen@gmail.com'],
      subject: `New message from ${name}`,
      html: `<p>${message}</p>`,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resendRes.ok) {
      const errorText = await resendRes.text();
      return NextResponse.json(
        { error: errorText },
        { status: resendRes.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
