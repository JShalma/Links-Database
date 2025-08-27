import Link from "next/link";

export default async function HomePage() {
  return (
    <main>
      <h1>Root Folder</h1>
      <Link href={"/folder/cc0f9c16-0a33-4667-b847-f633ab15f3c4"}>Root</Link>
      
    </main>
  );
}
