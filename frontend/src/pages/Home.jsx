import { ArrowBigLeft, ArrowBigRight, Contact, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utilities/axiosInstance";
import Heading from "../components/Heading";
import Users from "../components/Users";
import UserSkeleton from "../utilities/UserSkeleton";
import { useQuery } from "@tanstack/react-query";
import { userAuth } from "../utilities/User";
import { useNavigate } from "react-router-dom";
import { ToastSuccess, ToastWarning } from "../utilities/Toast";
import NotFound from "../utilities/NotFound";

function Home() {
  const signOut = () => {
    localStorage.removeItem("token");
    ToastSuccess("User sign-out successful.");
    navigate("/signin");
  };

  const [limit] = useState(2);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState(""); // Stores search query after submission
  const [userId, setUserId] = useState(null);

  const isAuthenticated = userAuth();

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users?search=${searchText}&limit=${limit}&page=${page}`
      );
      console.log(response?.data);
      
      return response?.data;
    } catch (error) {
      ToastWarning("Error fetching users.");
    }
  };

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["users", searchText, page],
    queryFn: fetchUsers,
    staleTime: 1000 * 5 * 60,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchText(searchQuery); // Update searchText when the search button is clicked
    refetch(); // Manually trigger a refetch after updating searchText
  };

  useEffect(() => {
    if (!searchText && data?.users) {
      setSearchText(searchQuery); // Ensure the search text is set
    }
    if (isAuthenticated) {
      setUserId(userAuth());
    }
  }, [data, isAuthenticated, page]);

  if (isFetching) {
    return <UserSkeleton />;
  }

  return (
    <div className="min-h-screen w-full relative p-5">
      <div className="flex items-center mb-6">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navigate(`/deposite/${userId}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-95 transition-all"
            >
              Deposit
            </button>
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:scale-95 transition-all"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate(`/signin`)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-95 transition-all"
          >
            Sign In
          </button>
        )}

        <button
          onClick={() => navigate(`/create-bank-account`)}
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-95 transition-all"
        >
          Create Bank Account
        </button>
      </div>

      <div className="flex items-center gap-5 pb-10 justify-center">
        <Contact />
        <Heading text="All Users" />
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-5 max-w-lg mx-auto">
        <input
          value={searchQuery}
          className="w-full p-2 rounded-md bg-transparent border outline-none"
          placeholder="Search user"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute rounded-l-md px-3 right-0 inset-y-0 z-10 bg-blue-600 p-1"
        >
          Search
        </button>
      </form>

      {/* User List */}
      {data?.users?.length ? (
        <div className="space-y-4 px-3">
          {data?.users?.map((user, index) => (
            <Users
              key={user.id || index}
              user={user}
              uniqueKey={user.id || index}
            />
          ))}
        </div>
      ) : (
        <NotFound />
      )}

      {/* Pagination */}
      <div className="absolute flex items-center justify-center bottom-2 inset-x-0">
        <ArrowBigLeft
          className={page === 1 ? "text-gray-700" : "text-white"}
          onClick={() => setPage((prev) => (prev !== 1 ? prev - 1 : prev))}
        />
        <p className="bg-slate-600 text-white flex items-center justify-center h-9 w-9 rounded-md">
          {page}
        </p>
        <ArrowBigRight
          className={`${
            data?.users?.length > 0 ? "text-white" : "text-slate-600"
          }`}
          onClick={() =>
            setPage((prev) => (data?.users?.length > 0 ? prev + 1 : prev))
          }
        />
      </div>
    </div>
  );
}

export default Home;
