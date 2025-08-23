import LinkFile from "@/Components/linkFile";
import { Item, FileData, PrismaClient } from "@prisma/client";
import Link from "next/link";
// import { FileData } from "@/Components/types";
// import build from "next/dist/build";
// import buildTree from "@/Components/dataStructure";

const prisma = new PrismaClient();
type ItemWithFileData = Item & {
  fileData: FileData | null;
};

export default async function folderPage({ params } : {params: {id: string}}){
const folderID = params.id;

const children = await prisma.item.findMany({
  where: {parentId: folderID},
  include: {fileData: true}
});

// console.log(children);

function displayItem(item : ItemWithFileData){
  if (item.fileData){
    return <LinkFile key={item.id} url={item.fileData.url} id={item.id} name={item.name} type={item.type} img={item.fileData.img}  />
    // return <a href={item.fileData.url} key={item.id}>{item.name}</a>; 
  } 
  return <Link key={item.id} href={`/folder/${item.id}`}>{item.name}</Link>;
    
}

    return <>
    {folderID}
    <br/>
    {children.map((item) => displayItem(item))}
    </>;
}