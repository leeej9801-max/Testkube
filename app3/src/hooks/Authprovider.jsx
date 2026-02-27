import { createContext, useContext, useEffect, useState } from "react";
import { api, BASE_URL } from "@utils/network.js";  

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [profileImg, setProfileImg] = useState("")
  
  const setLogin = () => {
    console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
    console.log("api baseURL =", api.defaults.baseURL);
    window.location.href = `${api.defaults.baseURL}/login/kakao`;
  };

  const refreshAuth = async () => {
    try {
      const res = await api.get("me"); 
      setIsLogin(res.data?.status || false);
      setProfileImg(res.data?.new_name || "")
    } catch (e) {
      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);


  const setAuth = async () => {
    setLoading(true);
    await refreshAuth(); 
  };

   // 로그아웃

  const clearAuth = () => {
    setIsLogin(false);
    setProfileImg(""); 
  };

  const removeAuth = () => {
    api.post("/logout")
      .then((res) => {
        if (res.data?.status) clearAuth();
      })
      .catch((err) => console.error(err));
  };

  const checkAuth = () => isLogin;

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isLogin, profileImg, setAuth, setProfileImg, removeAuth, clearAuth, checkAuth, refreshAuth, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;