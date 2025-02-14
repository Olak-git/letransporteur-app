import { useEffect } from 'react';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthHeaderMode from '@/components/AuthHeaderMode';
import useDisconnect from '@/hooks/useDisconnect';
import useUser from '@/hooks/useUser';

export default function Logout() {

    const { user, token, temporaryUserId, updateUser, updateToken, editTemporaryUserId } = useUser()

    const router = useRouter()

    const { onLogOut } = useDisconnect()

    useEffect(()=>{
        if(user && token) {
            onLogOut()
        } else {
            router.push('/');
        }
    }, [user, token, temporaryUserId])

    return (
        <>
        <Head>
            <title>LeTransporteur | Log out</title>
        </Head>

        <AuthHeaderMode />

        <div className="container justify-center">
            <div className="flex flex-col items-center mt-10 mb-10">
                <AuthHeader titre='Log out...' />
            </div>
        </div>
        </>
    )
}
