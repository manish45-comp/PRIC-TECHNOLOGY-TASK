"use client";
import React from "react";
import useFetchUsers from "../hooks/UseFetchUsers";

import UserTable from "@/components/UserTable";
import { useRouter } from "next/navigation";

import ErrorCard from "../../components/ErrorCard";
import LoadingCard from "../../components/LoadingCard";

const page = () => {
  const { users, loading, error } = useFetchUsers();
  const router = useRouter();
  if (error) {
    return <ErrorCard />;
  }
  return (
    <div className="min-w-[320px] w-[90%] bg-gray-100 border rounded-xl p-3">
      <div className="flex items-center justify-between p-3 w-full bg-blue-200 rounded-lg mb-3">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          User Dashboard
        </p>
        <div
          onClick={() => router.push("/users/add")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md text-sm uppercase cursor-pointer"
        >
          Add New User
        </div>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? <LoadingCard /> : <UserTable users={users} />}
        </div>
      </div>
    </div>
  );
};

export default page;
