import { useCallback, useMemo, useState } from "react";
import type { User } from "../models/User";
import ApiService from "../services/ApiService";

export const useUsersViewModel = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const service = useMemo(() => new ApiService(), []);

  // Buscar a lista de usuários
  const getUsersList = useCallback(async () => {
    setLoading(true)
    const response = await service.get("/users")
    if (response) {
      setUsersList(response)
    }
    setLoading(false)
  }, [service])

  return { usersList, loading, getUsersList }
}