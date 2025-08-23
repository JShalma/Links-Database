import buildTree from '@/Components/dataStructure';
// import MainContent from '@/Components/main';
// import NavBar from '@/Components/navbar';
// import SideBar from '@/Components/sidebar';
import { TreeNode } from '@/Components/types';
import { Item, PrismaClient } from '@prisma/client';
import Link from 'next/link';
// import Image from 'next/image';

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
      {
        childFolders.map((item) => <Link href={`/${item.id}`} key={item.id}>{item.name}</Link>)
      }

      {/* <NavBar /> */}

      {/* <div className='flex'> */}

      {/* <SideBar /> */}

      {/* {codeStuff} */}

      {/* <MainContent items={items} /> */}
      {/* </div> */}
      
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> ({item.type})
            {item.type === 'file' && item.fileData && (
              <div>
                <small>
                  {item.fileData.url} • {item.fileData.img} 
                </small>
              </div>
            )}
          </li>
        ))}
      </ul> */}
    </main>
  );
}
