import { redirect } from "next/navigation";  
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  // redirect("/folder/6bfc1161-d799-4b46-b15b-0d9107adeb95")
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/login");
  }
  redirect("/folder/6bfc1161-d799-4b46-b15b-0d9107adeb95");
  // return "null";
}
