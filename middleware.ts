import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const username = process.env.PROTECTED_USERNAME;
  const password = process.env.PROTECTED_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Protected area is not configured.", {
      status: 500,
    });
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sitora Protected Area"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sitora Protected Area"',
      },
    });
  }

  let decoded = "";

  try {
    decoded = Buffer.from(encoded, "base64").toString("utf8");
  } catch {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sitora Protected Area"',
      },
    });
  }

  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Sitora Protected Area"',
      },
    });
  }

  const enteredUsername = decoded.slice(0, separatorIndex);
  const enteredPassword = decoded.slice(separatorIndex + 1);

  if (enteredUsername === username && enteredPassword === password) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sitora Protected Area"',
    },
  });
}

export const config = {
  matcher: [
    "/proposal-templates/:path*",
    "/proposals/:path*",
    "/invoices/:path*",
    "/api/invoices/:path*",
  ],
};