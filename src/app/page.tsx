import MainContent from '@/Components/main';
import NavBar from '@/Components/navbar';
import SideBar from '@/Components/sidebar';
import { Item, PrismaClient } from '@prisma/client';
// import Image from 'next/image';

const prisma = new PrismaClient();


export default async function HomePage() {
  type FileData = {
            itemId: string;
            url: string;
            img: string;
            description: string;
  } | null;

  const items: (Item & { fileData: FileData })[] = await prisma.item.findMany({
    include: { fileData: true },
  });

  return (
    <main>
      <NavBar />

      <div className='flex'>

      <SideBar />
      <MainContent items={items} />
      </div>
      
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
