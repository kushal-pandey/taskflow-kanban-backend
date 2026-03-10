function Navbar({ setIsLoggedIn }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#1e293b",
        color: "white"
      }}
    >
      <h2>TaskFlow</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;