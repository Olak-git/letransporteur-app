import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { UserContext } from "@/providers/UserContextProvider"
import { initToken, initUser, setTemporaryUserId } from "@/store/features/auth.slice"
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from "next/router"
import { ProfessionalType } from "@/helpers/type.models"
import { API_STORAGE } from "@/helpers/request"

// export default function useUser() {
//     const router = useRouter()
//     const dispatch = useDispatch()
//     const { user: _user, token: _token } = useSelector((state: any) => state.auth)

//     // @ts-ignore
//     const { user, updateUser, token, updateToken } = useContext(UserContext)

//     const _updateUser = (newData: any) => {
//         dispatch(initUser(newData))
//     }
//     const _updateToken = (newToken: string|undefined) => {
//         dispatch(initToken(newToken))
//     }

//     const remember_me = true

//     const user_in = remember_me?_user:user;
//     const userImage = user_in?.image?.startsWith('http') ? user_in?.image : `${API_STORAGE}/${user_in?.image}`

//     const data : {
//         user: UserType|undefined,
//         updateUser: (newState: UserType|undefined)=>void,
//         token: string|undefined,
//         updateToken: (newState: string|undefined)=>void,
//         userImage: string
//     } = {
//         user: remember_me?_user:user, 
//         updateUser: remember_me?_updateUser:updateUser, 
//         token: remember_me?_token:token, 
//         updateToken: remember_me?_updateToken:updateToken,
//         userImage
//     }

//     useEffect(()=>{
//         setCookie('user', user)
//         if(user) {
//             setCookie('isAuthenticated', true)
//         } else {
//             if(hasCookie('isAuthenticated'))
//                 deleteCookie('isAuthenticated')
//         }
//     },[user])

//     useEffect(()=>{
//         setCookie('user', _user)
//         if(_user) {
//             setCookie('isAuthenticated', true)
//         } else {
//             if(hasCookie('isAuthenticated'))
//                 deleteCookie('isAuthenticated')
//         }
//     },[_user])

//     useEffect(()=>{
//         if(!data.user && router.asPath.startsWith('/dashboard')) {
//             router.replace('/')
//         }
//     }, [data])

//     return { ...data }
// }

export default function useUser() {
    const router = useRouter()

    const dispatch = useDispatch()
    const { user: _user, token: _token, temporaryUserId } = useSelector((state: any) => state.auth)

    // @ts-ignore
    const { user, updateUser, token, updateToken } = useContext(UserContext)

    const _updateUser = (newData: any) => {
        dispatch(initUser(newData))
    }
    const _updateToken = (newToken: string|undefined) => {
        dispatch(initToken(newToken))
    }
    const editTemporaryUserId = (id: string|number|undefined) => {
        dispatch(setTemporaryUserId(id))
    }

    const remember_me = true

    const user_in = remember_me?_user:user;
    const userImage = user_in?.profile_image?.startsWith('http') ? user_in?.profile_image : `${API_STORAGE}/${user_in?.profile_image}`

    const data : {
        user: ProfessionalType | undefined,
        updateUser: (a:any)=>void,
        token: string | undefined,
        updateToken: (a:string|undefined)=>void,
        userImage: string,
        temporaryUserId: number|string|undefined,
        editTemporaryUserId: (a:string|number|undefined)=>void
    } = {
        user: remember_me?_user:user, 
        updateUser: remember_me?_updateUser:updateUser, 
        token: remember_me?_token:token, 
        updateToken: remember_me?_updateToken:updateToken,
        userImage,
        temporaryUserId,
        editTemporaryUserId
    }

    useEffect(()=>{
        setCookie('user', user)
        if(user) {
            setCookie('isAuthenticated', true)
        } else {
            if(hasCookie('isAuthenticated'))
                deleteCookie('isAuthenticated')
        }
    },[user])

    useEffect(()=>{
        setCookie('user', _user)
        if(_user) {
            setCookie('isAuthenticated', true)
            editTemporaryUserId(undefined)
        } else {
            if(hasCookie('isAuthenticated'))
                deleteCookie('isAuthenticated')
        }
    },[_user])

    useEffect(()=>{
        if(!data.user) {

        }
    },[data])

    return { ...data }
}