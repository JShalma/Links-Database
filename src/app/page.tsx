import Link from "next/link";

export default async function HomePage() {
  return (
    <main>
      <h1>Root Folder</h1>
      <Link href={"/folder/6bfc1161-d799-4b46-b15b-0d9107adeb95"}>Root</Link>
      
    </main>
  );
}
