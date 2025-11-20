import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req){
        const { pathname } = req.nextUrl;
        if(pathname === "/"){
            const url = new URL("/folder/6bfc1161-d799-4b46-b15b-0d9107adeb95", req.url);
            console.log(url);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }, 
    {
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [ "/", "/folder/:path*"]
}