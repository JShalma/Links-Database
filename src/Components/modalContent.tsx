import { MouseEvent, useState } from "react";
import { TreeNode } from "./types";
import { NodeInput } from "@/types/data";

type dataFile = {
    url: string,
    image: string,
    description: string
}
// { setIsModalOpen, children } : {setIsModalOpen: (open:boolean) => void, children: React.ReactNode}
export default function EditModal({ content, setIsModalOpen,  onModify } : { content: TreeNode, setIsModalOpen:(open:boolean) => void, onModify: (data:NodeInput) => void }){
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
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className="flex gap-2 justify-between">
                <h1 className="text-2xl">Rename {content.type}</h1>
                <button onClick={() => setIsModalOpen(false)} className="self-end rounded-3xl hover:bg-(--bg-400) cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <hr className="mt-2"/>
            <div className="py-5">
                <form className="flex flex-col gap-4">
                    <div>
                        <label>Name</label>
                        <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {content.type === "file" && <EditFile fileData={{url, image, description}} handleURL={setURL} handleDescription={setDescription} handleImage={setImage} />}
                        <div className="flex justify-end gap-7">
                            <button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="bg-(--pink) p-1 px-3 rounded-lg cursor-pointer" onClick={handleSubmit}>Rename {content.type}</button>
                        </div>
                </form>
            </div>
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

export function DeleteModal({ content, setIsModalOpen, onDelete } : { content: TreeNode,  setIsModalOpen:(open:boolean) => void, onDelete: (id:string, type:string) => void }){
    function handleDelete(e: MouseEvent){
        e.preventDefault();
        onDelete(content.id, content.type);
        setIsModalOpen(false);
    }
    return (
        <div>
            <div className="flex gap-2 justify-between">
                <h1 className="text-2xl">Delete {content.type}</h1>
                <button onClick={() => setIsModalOpen(false)} className="self-end rounded-3xl hover:bg-(--bg-400) cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <hr className="mt-2"/>
            <div className="py-5">
                <form>
                    <p>Are you sure you want to permanently delete {content.name} {content.type}? <br/><br/>You will be unable recover this item after deleting.</p>
                    <div className="flex justify-end gap-7 mt-5">
                        <button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="bg-(--pink) p-1 px-3 rounded-lg cursor-pointer" onClick={handleDelete}>Delete</button>
                    </div>
                </form> 
            </div>
        </div>
    );
}

export function AddModal({ type, parentId, setIsModalOpen, onAdd }:{type: string, parentId:string, setIsModalOpen:(open:boolean) => void, onAdd: (data:NodeInput) => void}){
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [image, setImage] = useState("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
    const [description, setDescription] = useState("");

    

    function handleAdd(e:MouseEvent){
        e.preventDefault();
        if (type === "file"){
            onAdd({ parentId, name, img:image, url, description, type});
        } else {
            onAdd({parentId, name, type:"folder"})

        }
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className="flex gap-2 justify-between">
                <h1 className="text-2xl">Add {type}</h1>
                <button onClick={() => setIsModalOpen(false)} className="self-end rounded-3xl hover:bg-(--bg-400) cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <hr className="mt-2"/>
            <div className="py-5">
                <form className="flex flex-col gap-4">
                    <div>
                        <label>Name</label>
                        <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {type === "file" && <AddFile fileData={{url, image, description}} handleURL={setURL} handleDescription={setDescription} handleImage={setImage} />}
                        <div className="flex justify-end gap-7">
                            <button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="bg-(--pink) p-1 px-3 rounded-lg cursor-pointer" onClick={handleAdd}>Add {type}</button>
                        </div>
                </form>
            </div>
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