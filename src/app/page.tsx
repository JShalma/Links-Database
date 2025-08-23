// import buildTree from '@/Components/dataStructure';
// import MainContent from '@/Components/main';
// import NavBar from '@/Components/navbar';
// import SideBar from '@/Components/sidebar';
// import { TreeNode } from '@/Components/types';
// import { Item, PrismaClient } from '@prisma/client';
// import Link from 'next/link';
// import Image from 'next/image';

import Link from "next/link";

// const prisma = new PrismaClient();


export default async function HomePage() {
  // type FileData = {
  //           itemId: string;
  //           url: string;
  //           img: string;
  //           description: string;
  // } | null;




  return (
    <main>
      <h1>Root Folder</h1>
      <Link href={"/folder/cc0f9c16-0a33-4667-b847-f633ab15f3c4"}>Root</Link>
      
    </main>
  );
}
