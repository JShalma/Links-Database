'use client'

import Folder from "@/components/folder";
// import Link from "next/link";
import { useFolderTree } from "@/utilities/FolderTreeContext";
import { FileNode, TreeNode } from "@/components/types";
import File from "@/components/file";

// { params } : { params : {id : string}}
export default function FolderPage(){
    const { currentFolder } = useFolderTree();

    function checkEmpty(type:string){
        if (currentFolder.type === "folder"){
            if (currentFolder.children.filter(child => child.type === type).length === 0){
                return <p className="opacity-50 pt-2">No {type}s</p>;
            }
        }

        return <></>;
    }

    function createFolder(item : TreeNode){
        return <Folder content={item} key={item.id} />
    }

    function createFile(item : FileNode){
        return <File content={item} key={item.id} />
    }

    return (
    <div className="flex-grow folder-page-bg rounded-2xl black-border mr-3 mb-3 max-h-screen overflow-y-scroll">
        <section className="p-5 h-full">
            <h1 className="text-2xl">{ currentFolder.name } Directory</h1>
            {/* <div>

            </div> */}
            <article className="pt-5">
                <h1 className="category-btn black-border">Folders</h1>
                {checkEmpty("folder")}
                <div className="grid grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "folder" && createFolder(child) )}
                </div>
            </article>
            <article className="pt-5">
                <h2 className="category-btn black-border">Files</h2>
                {checkEmpty("file")}
                <div className="grid grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "file" && createFile(child) )}
                </div>
            </article>

        </section>
    </div>
    );
}