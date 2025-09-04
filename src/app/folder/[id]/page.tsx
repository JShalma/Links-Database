'use client'

import Folder from "@/components/folder";
import { useFolderTree } from "@/utilities/FolderTreeContext";
import File from "@/components/file";
import Breadcrumb from "@/components/breadcrumbs";
import { useState } from "react";

// { params } : { params : {id : string}}
export default function FolderPage(){
    const { currentFolder, breadcrumbs } = useFolderTree();
    const [isSelected, setIsSelected] = useState('');


    function checkEmpty(type:string){
        if (currentFolder.type === "folder"){
            if (currentFolder.children.filter(child => child.type === type).length === 0){
                return <p className="opacity-50 pt-2">No {type}s</p>;
            }
        }
        return <></>;
    }

    return (
    <div className="flex-grow folder-page-bg rounded-2xl black-border mr-5 mb-3 overflow-y-scroll">
        <section className="p-5 h-full">
            
            <Breadcrumb paths={[...breadcrumbs , {name: currentFolder.name, id: currentFolder.id}]} />
   
            <article className="pt-5">
                <h1 className="category-btn black-border">Folders</h1>
                {checkEmpty("folder")}
                <div className="grid grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "folder" && <Folder content={child} key={child.id} isSelected={isSelected === child.id} onSelect={(value:string) => setIsSelected(value)} /> )}
                </div>
            </article>
            <article className="pt-5">
                <h2 className="category-btn black-border">Files</h2>
                {checkEmpty("file")}
                <div className="grid grid-auto-rows-fr grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "file" && <File content={child} key={child.id} /> )}
                </div>
            </article>

        </section>
    </div>
    );
}