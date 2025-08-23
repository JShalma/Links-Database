import { Item, PrismaClient } from "@prisma/client";
import { FileData } from "@/Components/types";
import build from "next/dist/build";
import buildTree from "@/Components/dataStructure";

const prisma = new PrismaClient();

export default async function CategoryPage({ params }){
    const { category } = await params;

    const items: (Item & { fileData: FileData })[] = await prisma.item.findUnique({
        where: { id: category },
        include: {fileData : true},
      });
    // const stuff = buildTree(items);
    //   console.log(stuff);

    return <>
    {category}
    </>;
}