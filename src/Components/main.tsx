import { FileData, Item } from "@prisma/client";
// import NavBar from "./navbar";

type LinkItem = {
  items: (Item & { fileData: FileData })[];
};


export default function MainContent({ items } : LinkItem){
    return (
        <div className="flex-1">

            <section className="rounded-2xl p-5 dark-gray h-screen mr-15 mb-5 flex justify-center">
                <div className="w-11/12">
                    <div className="grid grid-cols-4 gap-4">
                        {items.map((item) => (
                            <div key={item.id} className='link-tab rounded p-2'>
                            <strong>{item.name}</strong> ({item.type})
                            {item.type === 'file' && item.fileData && (
                                <div>
                                <a href={item.fileData.url}>
                                <img src={item.fileData.img} />
                                {/* <Image src={item.fileData.img} alt='Thumbnail' width={50} height={50}/> */}
                                </a>
                            </div>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}