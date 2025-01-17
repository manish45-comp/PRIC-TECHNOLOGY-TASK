import UserForm from "@/components/UserForm";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <>
      <div className="flex items-center justify-between p-3 w-[90%] bg-blue-200 rounded-lg mb-3">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Update User
        </p>
        <div className="bg-gray-500 hover:bg-gray-600 text-white font-semibold p-2 rounded-md text-sm uppercase">
          <Link href="/users">Back</Link>
        </div>
      </div>
      <UserForm userId={id} />
    </>
  );
};

export default Page;
