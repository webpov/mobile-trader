// pages/api/getCompletion.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Data = {
  // Define the structure of your expected response here
  choices?: { text: string }[];
  error?: string;
};

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { prompt } = reqBody;

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt,
        max_tokens: 40,
      }),
    });

    const data = await response.json() as Data;
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching data from OpenAI' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
