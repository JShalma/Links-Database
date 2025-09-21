import Link from "next/link";
import { TreeNode } from "./types";
import { useState } from "react";
import { truncateString } from "@/utilities/utility";

export default function FolderNavigation({ startingFolder } : {startingFolder:TreeNode}){
    return (
        <article className="container px-5 w-full">
            <FolderTab folder={startingFolder} />
        </article>
    );
}

export function FolderView({ folder } : {folder : TreeNode}){
    return (
        <div className="pl-3 w-full">
            { folder.type === "folder" && (folder.children).map((child) => {
                if(child.type === "folder") return <FolderTab key={child.id} folder={child} />; })
            }
        </div>
    );
}

export function FolderTab({ folder } : {folder : TreeNode}){
    const [toggle, setToggle] = useState(false);
    const [folderItem, setFolder] = useState(folder);

    function displayFolder(child:TreeNode){
        setToggle(!toggle); 
        setFolder(child);
    }
    return <>
    <div key={folder.id}>
        <div className="flex p-1.5 gap-2 items-center my-1 hover:bg-blue-100 rounded-2xl w-full">
            <div onClick={() => displayFolder(folder)} className="pl-2">
                { toggle 
                    ?   <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg> 
                    :   <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>}
            </div>
            <Link href={`/folder/${folder.id}`} className="flex gap-2 items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-folder-fill" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
                </svg>
                <span className="text-sm">{truncateString(folder.name, 10)}</span>
            </Link>
        </div>
        { toggle && <FolderView folder={folderItem} /> }
    </div>
    </>
}