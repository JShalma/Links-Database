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

// export async function getFolderContent(folderId:string) {
//     const children = await prisma.item.findMany({
//         where: {parentId: folderId},
//         include: {fileData: true}
//     });
//     return children;
// }

export async function addFolder(folderName:string, parentId:string) {
    const newFolder = await prisma.item.create({
        data: {
            name: folderName,
            parentId,
            type: 'folder'
        }
    })
    return newFolder;
}

export async function addFile(fileName:string, fileURL:string, fileDescription:string, fileImg:string, parentId:string) {
    const newFile = await prisma.item.create({
        data: {
            name: fileName,
            type: "file",
            parentId,
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
    console.log(folderId, folderName);
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