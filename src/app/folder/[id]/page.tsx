'use client'

import Folder from "@/components/folder";
import { useFolderTree } from "@/utilities/FolderTreeContext";
import File from "@/components/file";
import Breadcrumb from "@/components/breadcrumbs";
import { useState } from "react";
import EditPanel from "@/components/editPanel";
import Modal from "@/components/modal";
import EditModal, { DeleteModal } from "@/components/modalContent";

// { params } : { params : {id : string}}
export default function FolderPage(){
    const { currentFolder, breadcrumbs, modifyItem, deleteItem } = useFolderTree();
    const [isSelected, setIsSelected] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ modeType, setModeType ] = useState(0);


    function checkEmpty(type:string){
        if (currentFolder.type === "folder"){
            if (currentFolder.children.filter(child => child.type === type).length === 0){
                return <p className="opacity-50 pt-2">No {type}s</p>;
            }
        }
        return <></>;
    }

    function displayModalContent(){
        if (currentFolder.type === "folder"){
            const selectedItem = currentFolder.children.find((element) => element.id === isSelected); 
            if (modeType === 1){
                return <DeleteModal setIsModalOpen={setIsModalOpen} content={selectedItem ?? currentFolder} onDelete={deleteItem} />
            } 
            else if (modeType === 2){
                if (currentFolder.type === "folder"){
                    return <EditModal setIsModalOpen={setIsModalOpen} content={selectedItem ?? currentFolder} onModify={modifyItem} />;
                }
            }
        }
    }

    return (
    <div className="flex-grow folder-page-bg rounded-2xl black-border mr-5 mb-3 overflow-y-scroll">
        <section className="p-5 h-full">
            
            <Breadcrumb paths={[...breadcrumbs , {name: currentFolder.name, id: currentFolder.id}]} />
   
            <article className="pt-5">
                <div className={`h-11 ${isSelected && "black-border category-btn min-w-full"}`}>
                    {isSelected ? <EditPanel onEdit={(modeType:number) => {setIsModalOpen(true); setModeType(modeType)}} onClose={() => setIsSelected('') } /> :
                    <h1 className="h-full underline flex items-end text-lg underline-offset-4">Folders</h1>
                    }
                </div>
                {checkEmpty("folder")}
                <div className="grid grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "folder" && <Folder content={child} key={child.id} isSelected={isSelected === child.id} onSelect={(value:string) => setIsSelected(value)} /> )}
                </div>
            </article>
            <article className="pt-5">
                <h2 className="h-full underline flex items-end text-lg underline-offset-4">Files</h2>
                {checkEmpty("file")}
                <div className="grid grid-auto-rows-fr grid-cols-4 gap-4">
                    {currentFolder.type === "folder" && currentFolder.children.map((child) => child.type === "file" && <File content={child} key={child.id} isSelected={isSelected === child.id} onSelect={(value:string) => setIsSelected(value)} /> )}
                </div>
            </article>
            { isModalOpen && <Modal>{displayModalContent()}</Modal>}

        </section>
    </div>
    );
}