'use client';

import { useFolderTree } from "@/utilities/FolderTreeContext";

export default function Folder(){
    const { currentFolder } = useFolderTree()
    return (
        <>Hello: {currentFolder}</>
    );
}