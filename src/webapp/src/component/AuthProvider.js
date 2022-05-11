import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn ,setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [jwtResponse,setJwtResponse] = useState(null)
  useEffect(()=> {
    if(new Date(jwtResponse?.expiryTime).getTime()>new Date().getTime())
    signOut();
  })
  useEffect(() => {
    if(window.localStorage.getItem("token")){
      setIsLogged(true)
      setToken(window.localStorage.getItem("token"))
    }
  }, [])
  function signin(userLoginCredential) {
    setIsLoading(true);
    debugger
    axios
      .post(
        "http://localhost:8080/api/v1/user/authenticate",
        userLoginCredential
      )
      .then((res) => {
        debugger
        setIsLoading(false);
        setIsLogged(true);
        setErrors(null);
        setUser({name: res.data.name,username: res.data.username})
        setToken(res.data.token);
        setJwtResponse(res.data)
        window.localStorage.setItem("token", res.data.token);
      
      }).catch(( err) => {
        debugger
        console.log(err)
        setErrors(err)
      });
  }

  function signOut() {
    setIsLogged(false);
    setUser(null);
    setIsLogged(false);
    setJwtResponse(null)
    window.localStorage.clear();
    setToken("");
  }
  return {
    user,
    signin,
    isLoggedIn,
    token,
    errors,
    signOut
  }


}
