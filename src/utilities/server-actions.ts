'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllFolders(){
    const foldersData = await prisma.item.findMany({
        include: {
            fileData: true,
        },
    });

    return foldersData;
}

export async function getFolder(folderId:string) {
    const children = await prisma.item.findMany({
        where: {parentId: folderId},
        include: {fileData: true}
    });
    return children;
}