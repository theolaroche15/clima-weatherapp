import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import {
    getAuthenticatedUser,
    loginUser,
    logoutUser,
    registerUser,
    updateUserSettings,
} from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticatedUser =
                    await getAuthenticatedUser()

                setUser(authenticatedUser.user)
            } catch (error) {
                if (error.status !== 401) {
                    console.error(
                        'Erreur pendant la vérification de la session :',
                        error
                    )
                }

                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuthentication()
    }, [])

    const register = async (credentials) => {
        return registerUser(credentials)
    }

    const login = async (credentials) => {
        await loginUser(credentials)

        const authenticatedUser =
            await getAuthenticatedUser()

        setUser(authenticatedUser.user)

        return authenticatedUser
    }

    const logout = async () => {
        await logoutUser()
        setUser(null)
    }

    async function updateSettings(settings) {
        const response = await updateUserSettings(settings)

        setUser(response.user)

        return response.user
    }

    const value = {
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        register,
        login,
        logout,
        updateSettings,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth doit être utilisé dans un AuthProvider.'
        )
    }

    return context
}