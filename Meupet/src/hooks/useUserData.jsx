// src/hooks/useUserData.js
import { useState, useEffect } from "react";
import axios from "axios"; 

export const useUserData = (userEmail) => {
  const [userData, setUserData] = useState({
    userPoints: 0,
    userName: "",
    error: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get("http://localhost:8080/api/v1/authenticable", {
          params: { email: userEmail },
        });

        setUserData({
          userPoints: response.data.moedaCapiba || 0,  
          userName: response.data.name || "Usuário", 
          error: null,
        });
      } catch (error) {
        setUserData({
          ...userData,
          error: "Erro ao carregar os dados do usuário",
        });
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [userEmail]); 

  return userData;
};