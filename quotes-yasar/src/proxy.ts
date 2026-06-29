import { auth0 } from "@/lib/auth0";

<<<<<<< HEAD
export async function proxy(request: Request) {
  
=======

export async function proxy(request: any) {
>>>>>>> 05d7aaf0b227e334f8f93b8a0c4ff7515f76fa56
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};