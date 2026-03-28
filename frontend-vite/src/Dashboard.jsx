import { useEffect, useState } from "react";
import api from "./api";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LayoutGrid, LogOut } from "lucide-react";

const Dashboard = ({ setIsLoggedIn, setCurrentView }) => {
  const [stats, setStats] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await api.get("/analytics/dashboard/stats");
      setStats(statsRes.data);

      const boardsRes = await api.get("/boards");
      setBoards(boardsRes.data);
      
      if (boardsRes.data.length > 0) {
        setSelectedBoard(boardsRes.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedBoard) {
      fetchBoardAnalytics();
    }
  }, [selectedBoard]);

  const fetchBoardAnalytics = async () => {
    try {
      const res = await api.get(`/analytics/board/${selectedBoard}`);
      setBoardData(res.data);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <div className="flex justify-between items-center px-8 py-6 bg-black/40 backdrop-blur-md border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <LayoutGrid className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
            <p className="text-xs text-slate-400">Analytics & Dashboard</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentView("board")}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 font-medium"
          >
            <LayoutGrid size={18} /> Board
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (
            <>
              <StatsCard label="Total Boards" value={stats.totalBoards} color="from-blue-500" />
              <StatsCard label="Total Tasks" value={stats.totalTasks} color="from-purple-500" />
              <StatsCard label="Due Today" value={stats.tasksDueToday} color="from-yellow-500" />
              <StatsCard label="Overdue" value={stats.overdueTasks} color="from-red-500" highlight />
            </>
          )}
        </div>

        {/* Board Selector */}
        {boards.length > 0 && (
          <div className="mb-8">
            <label className="text-white font-semibold mb-3 block">Select Board</label>
            <select
              value={selectedBoard || ""}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full md:w-72 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {boards.map((board) => (
                <option key={board._id} value={board._id}>
                  {board.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Charts */}
        {boardData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Priority Distribution */}
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={boardData.priorityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {boardData.priorityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tasks by Column */}
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Tasks by Column</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={boardData.tasksByColumn}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Priority Stats */}
            <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Priority Summary</h3>
              <div className="space-y-4">
                <PriorityStat label="High Priority" value={boardData.highPriority} color="bg-red-500" />
                <PriorityStat label="Medium Priority" value={boardData.mediumPriority} color="bg-yellow-500" />
                <PriorityStat label="Low Priority" value={boardData.lowPriority} color="bg-green-500" />
              </div>
            </div>

            {/* Overdue Tasks Alert */}
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 backdrop-blur-md p-6 rounded-xl border border-red-700/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ Overdue Tasks</h3>
              <p className="text-4xl font-bold text-red-400">{boardData.overdueTasks}</p>
              <p className="text-red-300 mt-2">Tasks past their due date</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, color, highlight }) => (
  <div className={`bg-gradient-to-br ${color} to-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition ${highlight ? "ring-2 ring-red-500" : ""}`}>
    <p className="text-slate-300 text-sm font-medium">{label}</p>
    <p className="text-4xl font-bold text-white mt-2">{value}</p>
  </div>
);

const PriorityStat = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-300">{label}</span>
    <div className="flex items-center gap-3">
      <div className={`${color} px-4 py-2 rounded-lg text-white font-bold`}>{value}</div>
    </div>
  </div>
);

export default Dashboard;
