import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (context.user !== null) {
      setLoading(false);
    }
  }, [context.user]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { ...context, loading };
};

export default useAuth;
