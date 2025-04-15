import { NextRequest } from "next/server";

export function getRouteParam(req: NextRequest, pattern: string, paramName: string): string | null {
    const urlPattern = new URLPattern({ pathname: pattern })
    const match = urlPattern.exec(req.nextUrl.pathname)
    return match?.pathname.groups[paramName] || null
}