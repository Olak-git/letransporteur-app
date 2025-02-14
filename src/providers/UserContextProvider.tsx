import { ProfessionalType } from '@/helpers/type.models'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

export const UserContext = createContext(undefined)
const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<ProfessionalType|undefined>(undefined)
    const [token, setToken] = useState<string | undefined>(undefined)

    const updateUser = (newState: ProfessionalType|undefined) => {
        if(newState) {
            if(user!=undefined) {
                setUser((prev) => ({...prev, ...newState}))
            } else {
                setUser(newState)
            }
        } else {
            setUser(newState)
        }
    }

    return (
        // @ts-ignore
        <UserContext.Provider value={{
            updateUser: (newState: any) => setUser(newState),
            user,
            updateToken: (newToken: string | undefined) => setToken(newToken),
            token
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;