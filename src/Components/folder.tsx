'use client';

import { useRouter } from "next/navigation";
// import { useFolderTree } from "@/utilities/FolderTreeContext";
import { TreeNode } from "./types";
import Link from "next/link";
import { MouseEvent } from "react";
import { truncateString } from "@/utilities/utility";

export default function Folder({ content, isSelected, onSelect } : { content: TreeNode, isSelected:boolean, onSelect:(value:string) => void }){
    // const [isSelected, setIsSelected] = useState(false);
    const router = useRouter();
    
    // const { addItem, deleteItem, modifyItem } = useFolderTree();
    const handleDoubleClick =(e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();        
        router.push(`/folder/${content.id}`);
    }

    return (
        <div className="py-3">
            <Link href={""}>
                <div className="gray p-3 flex justify-between items-center rounded-xl black-border" style={ isSelected ? {backgroundColor: '#C9E6FC'} : {}} onClick={() => isSelected ? onSelect("") : onSelect(content.id)} onDoubleClick={handleDoubleClick}>
                    <div className="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-folder-fill" viewBox="0 0 16 16">
                            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
                        </svg>
                        <p> {truncateString(content.name, 20)} </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </div>
            </Link>
        </div>
    );
}

{/* <button onClick={() => addItem({name: "Github", type: "file", url:"https://github.com/", description: "Github - store projects", img: "https://github.githubassets.com/assets/github-logo-55c5b9a1fe52.png", parentId:"6bfc1161-d799-4b46-b15b-0d9107adeb95"})}>
    Click to Add
    </button>
    <br/>
    <button onClick={() => deleteItem("44c43658-1e46-4d75-9f29-0e1c854560ad", "file")}>
    Click to Delete
    </button>
    <br/>
    <button onClick={() => modifyItem({name: "Java Tutorials - Telusko", type: "file", url:"https://www.youtube.com/watch?v=BGTx91t8q50&list=PLsyeobzWxl7q6oUFts2erdot6jxF_lisP&index=3", description: "Java course in Telusko", img: "https://i.ytimg.com/vi/BGTx91t8q50/maxresdefault.jpg", parentId:"08e64ea3-b941-45c4-aa33-a964410b92b5", id:"c3282b16-7ec3-43aa-8b83-551bfde5d4f0"})}>
    Click to Modify 
    </button> */}