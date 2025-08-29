// // import Breadcrumb from "@/Components/breadcrumb";
// // import Folder from "@/Components/folder";
// // import LinkFile from "@/Components/linkFile";
// // import SideBar from "@/Components/sidebar";
// import { PrismaClient } from "@prisma/client";
// import { ItemWithFileData } from "@/types/data";
// // import MainContent from "@/Components/main";
// // import Link from "next/link";
// // import { FileData } from "@/Components/types";
// // import build from "next/dist/build";
// // import buildTree from "@/Components/dataStructure";

// const prisma = new PrismaClient();
// // type ItemWithFileData = Item & {
// //   fileData: FileData | null;
// // };

// export default async function folderPage({ params } : {params: {id: string}}){
// const folderID = params.id;

// const children = await prisma.item.findMany({
//   where: {parentId: folderID},
//   include: {fileData: true}
// });

// // console.log(children);

// function displayItem(item : ItemWithFileData){
//   if (item.fileData){
//     return <LinkFile key={item.id} url={item.fileData.url} id={item.id} name={item.name} type={item.type} img={item.fileData.img}  />
//   } 
//   return <Folder name={item.name} id={item.id} key={item.id} type={item.type} />;
    
// }

//     return <>
//     {/* {folderID} */}
//     {/* <br/> */}
//     <div className="flex"> 

//     <SideBar />
//      <section className="rounded-2xl dark-gray h-screen flex justify-center flex-1">
//           <div className="w-11/12">
//               <Breadcrumb />
//               <MainContent />
//               <div className="grid grid-cols-4 gap-4">                
//                 {children.map((item) => displayItem(item))}
//               </div>
//           </div>
//       </section>
//     </div>
//     </>;
// }