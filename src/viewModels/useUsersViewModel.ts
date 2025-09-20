import { useCallback, useState } from "react";
import type { User } from "../models/User";
import ApiService from "../services/apiService";

export const useUsersViewModel = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const service = new ApiService();

  // Buscar a lista de usuários
  const getUsersList = useCallback(async () => {
    setLoading(true)
    const response = await service.get("https://jsonplaceholder.typicode.com/users")
    if (response) {
      setUsersList(response);
    }
    setLoading(false)
  }, [])

  return { usersList, loading, getUsersList }
}