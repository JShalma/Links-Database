'use client'

import Image from "next/image";
import { FileNode } from "./types";
import { MouseEvent } from "react";
import { truncateString } from "@/utilities/utility";

export default function File({ content, isSelected, onSelect } : {content: FileNode, isSelected:boolean, onSelect:(value:string) => void}){

    // function truncateString(str : string, len: number){
    //     if (str.length > len){
    //         return str.slice(0, len) + "...";
    //     } else{
    //         return str;
    //     }
    // }

    function handleClick(e:MouseEvent){
        e.stopPropagation();
        e.preventDefault();

        if (isSelected){
            onSelect("")
        } 
        else{
            onSelect(content.id);
        }
    }

    return (
    <div className="py-3">
        <a href={content.fileData?.url} target="_blank">
            <div className={`pt-2.5 px-1.5 pb-2 rounded-xl black-border flex flex-col h-full ${isSelected ? "bg-(--accent-100)" : "gray"}`}>
                <div className="flex justify-between items-center pb-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-link-45deg bg-(--pink)/50  rounded black-border" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg>
                    <p className="w-fit">{truncateString(content.name, 20)}</p>
                    <button className="cursor-pointer p-1 hover:bg-(--bg-500) rounded-2xl" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                </div>
                <div className="black-border rounded-sm">
                    <Image src={content.fileData?.img ?? ""} alt="Link preview" width={100} height={100} className="object-cover h-32 w-full rounded-sm" />
                </div>
                <p className="description w-fit self-center">{content.fileData?.description}</p>
            </div>
        </a>
    </div>
   
    );
}