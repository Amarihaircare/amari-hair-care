import { NextRequest, NextResponse } from 'next/server';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface GoogleScriptResponse {
  status: 'success' | 'error';
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email }: FormData = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({
        status: 'error',
        message: 'All fields are required',
      }, { status: 400 });
    }

    // Replace with your Google Apps Script web app URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxT-vxecoofx-zHkWOgF6Xy7lrm-Pw26NFFiuURcCAFF6ivy06ILJakR19lpdF_P_l5ww/exec';

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GoogleScriptResponse = await response.json();
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to submit data',
    }, { status: 500 });
  }
}