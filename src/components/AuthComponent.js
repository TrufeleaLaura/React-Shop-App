import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, Navigate} from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user]);

    const login = async (data) => {
        console.log(data);
        setUser(data);
        navigate("/shop");
    };

    const logout = async () => {
        try {
            await axios.get('http://localhost:8080/api/user/logout',
                {headers: {Authorization: `Bearer ${user.token}`}})
            setUser(null);
            navigate("/", {replace: true});
        } catch (error) {
            if (error.response.message === "Invalid token" || error.response.message === "Unauthorized access") {
                alert("You are not logged in!")
                navigate('/login');
            }
        }
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(storedValue));
        } catch (err) {
        }
    }, [keyName, storedValue]);

    return [storedValue, setStoredValue];
};


export const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    if (!user) {
        return <Navigate to="/login"/>;
    }
    return children;
};