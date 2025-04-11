import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import SalesDashboard from "../components/SalesDashboard";
import AIAsistant from "../components/AIAsistant";
import { getDataSales } from "../services/Api";
import { getFirstWord } from "../utils/function";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const data = await getDataSales();

        setUsers(data.salesReps);
        if (data.salesReps.length > 0) {
          setSelectedUser(data.salesReps[0]);
        }
      } catch (error) {
        console.error("Failed to fetch sales representatives:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesReps();
  }, []);

  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const userList = useMemo(() => {
    return users.map((user) => (
      <li
        className={`cursor-pointer shadow p-2 px-4 rounded-2xl hover:bg-gray-100 ${
          selectedUser?.id === user.id ? "bg-gray-100" : "bg-white"
        }`}
        key={user.id}
        onClick={() => handleSelectUser(user)}
      >
        <span className="text-xl">{user.name}</span>
        <br />
        <div className="text-sm">{getFirstWord(user.role)}</div>
      </li>
    ));
  }, [users, selectedUser, handleSelectUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-700"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 grid gap-4 md:gap-6">
      <Suspense fallback={<div>Loading</div>}>
        <AIAsistant />
      </Suspense>

      <section>
        <ul className="flex gap-4 mt-4">{userList}</ul>
      </section>

      <Suspense fallback={<div>Loading</div>}>
        <SalesDashboard selectedUser={selectedUser} />
      </Suspense>
    </div>
  );
}
