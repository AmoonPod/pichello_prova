import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();
    // ─── Add x-current-path for downstream components ───
    response.headers.set("x-current-path", request.nextUrl.pathname);

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

