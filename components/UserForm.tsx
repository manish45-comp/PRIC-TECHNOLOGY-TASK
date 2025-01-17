"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useFetchUser from "@/app/hooks/UseFetchUser";
import api from "@/app/services/api";

const UserForm = ({ userId }: { userId?: string }) => {
  const router = useRouter();
  const { userData, isLoading, error, setUserData } = useFetchUser(userId);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      setIsEditing(true);
      await api.put(`/updateUser?id=${userId}`, userData);
      toast.success("User updated successfully");
      setIsEditing(false);
    } else {
      setIsEditing(true);
      await api.post("/createUser", userData);
      toast.success("User created successfully");
      setIsEditing(false);
    }
    router.push("/users");
  };

  const user = userData || {
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    country: "",
    city: "",
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">First Name:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200 disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.firstName}
          placeholder="First Name"
          onChange={(e) => setUserData({ ...user, firstName: e.target.value })}
          required
        />
      </label>
      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">Last Name:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200  disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.lastName}
          placeholder="Last Name"
          onChange={(e) => setUserData({ ...user, lastName: e.target.value })}
          required
        />
      </label>
      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">Email:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200 disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.email}
          placeholder="Email Address"
          onChange={(e) => setUserData({ ...user, email: e.target.value })}
          required
        />
      </label>

      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">Age:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200 disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.age}
          placeholder="Age"
          onChange={(e) =>
            setUserData({ ...user, age: Number(e.target.value) || 0 })
          }
          required
        />
      </label>
      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">Country:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200 disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.country}
          placeholder="Country"
          onChange={(e) => setUserData({ ...user, country: e.target.value })}
          required
        />
      </label>

      <label className="flex items-center justify-center gap-3">
        <p className="min-w-24 text-end">City:</p>
        <input
          disabled={isLoading}
          className="border p-2 rounded-md bg-zinc-200 disabled:bg-white disabled:animate-pulse"
          type="text"
          value={user?.city}
          placeholder="City"
          onChange={(e) => setUserData({ ...user, city: e.target.value })}
          required
        />
      </label>
      {isLoading || isEditing ? (
        <button
          disabled
          className="w-full disabled:bg-gray-400 bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md text-sm uppercase"
          type="submit"
        >
          Loading...
        </button>
      ) : (
        <button
          disabled={isEditing}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-md text-sm uppercase disabled:bg-gray-500"
          type="submit"
        >
          {userId ? "Update User" : "Add User"}
        </button>
      )}
    </form>
  );
};

export default UserForm;
