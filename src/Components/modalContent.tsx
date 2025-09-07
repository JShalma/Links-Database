import { MouseEvent, useState } from "react";
import { TreeNode } from "./types";
import { NodeInput } from "@/types/data";

type dataFile = {
    url: string,
    image: string,
    description: string
}

export default function EditModal({ content, onModify } : { content: TreeNode, onModify: (data:NodeInput) => void }){
    const [name, setName] = useState(content.name);

    const [url, setURL] = useState(() => {
        if (content.type === "file") {
            if (content.fileData?.url === undefined){
                return ""
            }
            return content.fileData?.url 
        } 
        return "";
    });
    const [image, setImage] = useState(() => {
        if (content.type === "file") {
            if (content.fileData?.img === undefined){
                return "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            return content.fileData?.img;
        } 
        return "";
    });
    const [description, setDescription] = useState(() => {
        if (content.type === "file") {
            if (content.fileData?.description === undefined){
                return ""
            }
            return content.fileData?.description; 
        } 
        return "";
    });
    
    function handleSubmit(e:MouseEvent){
        e.preventDefault();
        if (content.type === "file"){
            const {fileData, ...newObject} = content;
            onModify({...newObject, parentId:content.parentId ?? "", name, img:image, url, description});
        } else {
            const {children, ...newObject} = content;
            onModify({...newObject, parentId:content.parentId ?? "", name})

        }
    }

    return (
        
        <div>
            <form className="flex flex-col gap-4">
                <div>
                    <label>Name</label>
                    <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {content.type === "file" && <EditFile fileData={{url, image, description}} handleURL={setURL} handleDescription={setDescription} handleImage={setImage} />}
                    <div className="flex justify-end gap-7">
                        <button>Cancel</button>
                        <button className="category-btn black-border cursor-pointer" onClick={handleSubmit}>Ok</button>
                    </div>
            </form>
        </div>
    );
}

function EditFile({ fileData, handleURL, handleImage, handleDescription }: {fileData:dataFile, handleURL:(link:string) => void, handleImage:(img:string) => void, handleDescription:(desc:string) => void}){
    return (
        <>
            <div>
                <label>URL</label>
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.url} onChange={(e) => handleURL(e.target.value)} />
            </div>
            <div>
                <label>Image</label>
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.image} onChange={(e) => handleImage(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.description} onChange={(e) => handleDescription(e.target.value)} />
            </div>
        </>
    );
}

export function DeleteModal({ content, onDelete } : { content: TreeNode, onDelete: (id:string, type:string) => void }){
    function handleDelete(e: MouseEvent){
        e.preventDefault();
        onDelete(content.id, content.type);
    }
    return (
        <div>
            <form>
                <p>Are you sure you want to permanently delete {content.name} {content.type}? <br/><br/>You will be unable recover this item after deleting.</p>
                <div className="flex justify-end gap-7 mt-5">
                    <button className="cursor-pointer">Cancel</button>
                    <button className="category-btn black-border cursor-pointer" onClick={handleDelete}>Delete</button>
                </div>
            </form> 
        </div>
    );
}

export function AddModal({ type, parentId, onAdd }:{type: string, parentId:string, onAdd: (data:NodeInput) => void}){
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    

    function handleAdd(e:MouseEvent){
        e.preventDefault();
        if (type === "file"){
            onAdd({ parentId, name, img:image, url, description, type});
        } else {
            onAdd({parentId, name, type:"folder"})

        }
    }

    return (
        <div>
            <form className="flex flex-col gap-4">
                <div>
                    <label>Name</label>
                    <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {type === "file" && <AddFile fileData={{url, image, description}} handleURL={setURL} handleDescription={setDescription} handleImage={setImage} />}
                    <div className="flex justify-end gap-7">
                        <button>Cancel</button>
                        <button className="category-btn black-border cursor-pointer" onClick={handleAdd}>Ok</button>
                    </div>
            </form>
        </div>
    );
}

export function AddFile({fileData, handleURL, handleImage, handleDescription}:{ fileData:dataFile,  handleURL:(link:string) => void, handleImage:(img:string) => void, handleDescription:(desc:string) => void}){
    return (
        <>
            <div>
                <label>URL</label>
                {/* onChange={(e) => handleURL(e.target.value)} */}
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.url} onChange={(e) => handleURL(e.target.value)} />
            </div>
            <div>
                <label>Image</label>
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.image} onChange={(e) => handleImage(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.description} onChange={(e) => handleDescription(e.target.value)} />
            </div>
        </>
    );
}