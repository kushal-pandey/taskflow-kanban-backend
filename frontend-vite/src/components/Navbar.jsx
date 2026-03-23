function Navbar({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white shadow">
      <h2 className="text-xl font-semibold">TaskFlow</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;