import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`/api/users/current`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data.data);
    } catch (err) {
      setError(err);
      console.log("Error fetching data: " + err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (newUserData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/current", newUserData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // method: "patch",
      });
      setUser((prevUser) => ({
        ...prevUser,
        ...res.data.data,
      }));
      toast({
        variant: "success",
        description: `${res.data.message}`,
      });
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  // console.log(error);

  return (
    <UserContext.Provider
      value={{ user, loading, error, updateUser, fetchCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => useContext(UserContext);
