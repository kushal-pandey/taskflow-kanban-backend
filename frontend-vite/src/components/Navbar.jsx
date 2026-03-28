import { LayoutGrid, LogOut } from "lucide-react";

function Navbar({ setIsLoggedIn, setCurrentView }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <LayoutGrid className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TaskFlow
        </h2>
      </div>

      <div className="flex gap-3">
        {setCurrentView && (
          <button
            onClick={() => setCurrentView("dashboard")}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <LayoutGrid size={18} /> Dashboard
          </button>
        )}
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;