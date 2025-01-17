"use client";

import api from "@/app/services/api";
import { User } from "@/app/types/user";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [userList, setUserList] = useState(users);
  const [isLoadingIds, setLoadingIds] = useState<string[]>([]);

  const handleDelete = async (userId: string) => {
    setLoadingIds((prev) => [...prev, userId]);
    try {
      await api.delete(`deleteUser/?id=${userId}`);
      setUserList((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            First Name
          </th>
          <th scope="col" className="px-6 py-3">
            Last Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Age
          </th>
          <th scope="col" className="px-6 py-3">
            Country
          </th>
          <th scope="col" className="px-6 py-3">
            City
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => {
          return (
            <tr
              key={user.id}
              className="odd:bg-white even:bg-gray-50  border-b"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {user.firstName}
              </th>
              <td className="px-6 py-4">{user.lastName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.age}</td>
              <td className="px-6 py-4">{user.country}</td>
              <td className="px-6 py-4">{user.city}</td>
              <td className="px-6 py-4 flex items-center gap-2">
                <a
                  href={`users/edit/${user.id}`}
                  className="px-2 p-1 rounded-md min-w-12 text-center font-medium bg-blue-200 text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  onClick={() => handleDelete(user.id)}
                  href="#"
                  className="px-2 p-1 rounded-md min-w-12 text-center bg-red-200 font-medium text-red-600 hover:underline"
                >
                  {isLoadingIds.includes(user.id) ? "Deleting" : "Delete"}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
