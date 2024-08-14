export const Logout = () => {
  const handleLogout = () => {
    window.location.href = '/Login';
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  )
}