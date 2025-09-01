'use client';

import { useFolderTree } from "@/utilities/FolderTreeContext";

export default function Folder(){
    const { currentFolder, addItem, deleteItem, modifyItem } = useFolderTree();
    
    return (
        <>
        <br/> 
        Hello: {currentFolder}
        <br/>
        <button onClick={() => addItem({name: "Canva", type: "file", url:"https://www.canva.com/", description: "Canva - graphic design", img: "https://static.canva.com/domain-assets/canva/static/images/fb_cover-1.jpg", parentId:"6bfc1161-d799-4b46-b15b-0d9107adeb95"})}>
            Click to Add
        </button>
        <br/>
        <button onClick={() => deleteItem("e567fc06-56f7-4783-aabc-ab2519041a56", "file")}>
            Click to Delete
        </button>
        <br/>
        <button onClick={() => modifyItem({name: "Java Tutorials - Telusko", type: "file", url:"https://www.youtube.com/watch?v=BGTx91t8q50&list=PLsyeobzWxl7q6oUFts2erdot6jxF_lisP&index=3", description: "Java course in Telusko", img: "https://i.ytimg.com/vi/BGTx91t8q50/maxresdefault.jpg", parentId:"08e64ea3-b941-45c4-aa33-a964410b92b5", id:"c3282b16-7ec3-43aa-8b83-551bfde5d4f0"})}>
            Click to Modify 
        </button>
        </>
    );
}