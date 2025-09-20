import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return response.json();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Carregando usuários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-text">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2 className="users-title">Lista de Usuários</h2>
      <div className="users-grid">
        {users?.map((user) => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};