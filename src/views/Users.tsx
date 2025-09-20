import { useEffect } from "react";
import { useUsersViewModel } from "../viewModels/useUsersViewModel";

export const UsersView = () => {
  const { loading, usersList, getUsersList } = useUsersViewModel();

  useEffect(() => {
    getUsersList();
  }, [getUsersList])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2 className="users-title">Lista de Usuários</h2>
      <div className="users-grid">
        {usersList?.map((user) => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );

}