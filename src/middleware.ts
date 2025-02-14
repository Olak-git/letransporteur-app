import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { format } from "date-fns";
import { UserType } from "./helpers/type.models";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value
    const user = request.cookies.get('user')?.value

    // console.log('nextUrl: ', request.nextUrl)

    if(!isAuthenticated) {
        if(request.nextUrl.pathname.startsWith('/dashboard') && request.nextUrl.pathname!=='/dashboard/rnview') {
            const absoluteURL = new URL("/auth/signin", request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
        if(request.nextUrl.pathname.startsWith('/auth/conf')) {
            const absoluteURL = new URL("/auth/signin", request.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    } else {
        if(user) {
            const _user : UserType = JSON.parse(user)
            // console.log({ _user });
            const CURRENT_DATE = format(new Date(), 'y-MM-dd HH:mm:ss')

            // if(_user.profesional && _user.profile=='user') {

            //     if(request.nextUrl.pathname.startsWith('/dashboard/users')) {
            //         const absoluteURL = new URL("/", request.nextUrl.origin);
            //         return NextResponse.redirect(absoluteURL.toString());
            //     }

            //     if(request.nextUrl.pathname.startsWith('/dashboard/settings')) {
            //         const absoluteURL = new URL("/", request.nextUrl.origin);
            //         return NextResponse.redirect(absoluteURL.toString());
            //     }

            //     const regex_cinemas = /^\/dashboard\/cinemas(\/)?(rates|add|archives)?$/i;
            //     const regex_events = /^\/dashboard\/events(\/)?(add|archives|([0-9]+(\/?(tickets)?)))?$/i;
            //     // const regex_events = /^\/dashboard\/events(\/)?(add|archives)?$/i;
            //     const regex_transports = /^\/dashboard\/transports(\/)?(add)?$/i;

            //     if(regex_cinemas.test(request.nextUrl.pathname)) {
            //         const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
            //         return NextResponse.redirect(absoluteURL.toString());
            //     }

            //     if(regex_events.test(request.nextUrl.pathname)) {
            //         const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
            //         return NextResponse.redirect(absoluteURL.toString());
            //     }

            //     if(regex_transports.test(request.nextUrl.pathname)) {
            //         const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
            //         return NextResponse.redirect(absoluteURL.toString());
            //     }
            // }

            if(request.nextUrl.pathname.startsWith('/auth/password')) {
                const absoluteURL = new URL("/", request.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());
            }

            if(_user.email_verified_at && request.nextUrl.pathname.startsWith('/auth')) {
                const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());
            }
            if(!_user.email_verified_at && (request.nextUrl.pathname.startsWith('/auth/signin') || request.nextUrl.pathname.startsWith('/auth/signup'))) {
                const absoluteURL = new URL("/auth/conf", request.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());
            }
        } else {
            
        }
    }
    // console.log({ request });
}