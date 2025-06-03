import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For now, redirect to catalog page with a special parameter to trigger print
    const catalogUrl = new URL('/catalogo', request.url);
    catalogUrl.searchParams.set('print', 'true');

    return NextResponse.redirect(catalogUrl);
  } catch (error) {
    console.error('Error handling PDF request:', error);

    // Fallback: redirect to catalog page
    const catalogUrl = new URL('/catalogo', request.url);
    return NextResponse.redirect(catalogUrl);
  }
}
