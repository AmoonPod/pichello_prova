// app/hello-world/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('Pagina rimossa', { status: 410 });
}
