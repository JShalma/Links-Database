'use server';

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSessionOrThrow } from "@/app/api/auth/getSessionOrThrow";


export async function getAllFolders(){
    const session = await getSessionOrThrow();
    // const session = await getServerSession(authOptions);

    // getSessionOrThrow

    // if(!session?.user.id){
    //     throw new Error("Not authenticated");
    //     // return;
    // }
    
    const foldersData = await prisma.item.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            fileData: true,
        },
    });

    return foldersData;
}

// export async function getFolderContent(folderId:string) {
//     const children = await prisma.item.findMany({
//         where: {parentId: folderId},
//         include: {fileData: true}
//     });
//     return children;
// }

export async function addFolder(folderName:string, parentId:string) {
    const session = await getSessionOrThrow();

    const newFolder = await prisma.item.create({
        data: {
            name: folderName,
            parentId,
            type: 'folder',
            userId: session.user.id,
        }
    })
    return newFolder;
}

export async function addFile(fileName:string, fileURL:string, fileDescription:string, fileImg:string, parentId:string) {
    const session = await getSessionOrThrow();
    
    const newFile = await prisma.item.create({
        data: {
            name: fileName,
            type: "file",
            parentId,
            userId: session.user.id,
            fileData: {
                create: {
                    url: fileURL,
                    img: fileImg,
                    description: fileDescription,
                }
            }
        },
        include: {
            fileData: true,
        }
    })
    return newFile;
}

export async function deleteFolder(folderId: string) {
    // const session = await getSessionOrThrow();

    const deletedFolder = await prisma.item.delete({
        where: {
            id: folderId,
        }
    })
    // Needs to delete fileData too!!
    await prisma.item.deleteMany({
        where: {
            parentId: folderId,
        }
    })
    return deletedFolder;
}

export async function deleteFile(fileId: string) {
    const deletedFileData = await prisma.fileData.delete({
        where: {
            itemId: fileId,
        },
    })
    const deletedFile = await prisma.item.delete({
        where: {
            id: fileId,
        },
    })
    return {...deletedFile, fileData: deletedFileData};
}

export async function modifyFolder(folderId:string, folderName:string) {
    // console.log(folderId, folderName);
    const modifiedFolder = await prisma.item.update({
        where: {id : folderId},
        data: {name: folderName}
    })
    return modifiedFolder;
}

export async function modifyFile(fileId:string, fileName:string, fileURL:string, fileDescription:string, fileImg:string, parentId:string ) {
    
    const modifiedFile = await prisma.item.update({
        where: {id : fileId},
        data: {name: fileName, parentId}
    })
    const modifiedFileData = await prisma.fileData.update({
        where: {itemId : fileId},
        data: {url: fileURL, description: fileDescription, img: fileImg}
    })

    return {...modifiedFile, fileData: modifiedFileData};
}

export async function moveFileAndFolder(itemId: string, updatedParentId:string) {
    const moveItem = await prisma.item.update({
        where: {id: itemId},
        data: {parentId:updatedParentId}
    })
    return moveItem;
}