import { auth0 } from "@/lib/auth0";

export async function proxy(request: Request) {
  // Dosyamızın ve Next.js'in komutu "proxy" ama Auth0 kütüphanesi içerde "middleware" komutuyla çalışır!
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};