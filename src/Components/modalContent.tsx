import { useState } from "react";
import { TreeNode } from "./types";

type dataFile = {
    url: string | undefined,
    image: string | undefined,
    description: string | undefined
}

export default function EditModal({ content } : { content: TreeNode }){
    const [name, setName] = useState(content.name);

    const [url, setURL] = useState(content.type === "file" ? content.fileData?.url : "");
    const [image, setImage] = useState(content.type === "file" ? content.fileData?.img : "");
    const [description, setDescription] = useState(content.type === "file" ? content.fileData?.description : "");

    return (
        <div>
            <form>
                <label>Name</label>
                <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                {content.type === "file" && <EditFile fileData={{url: url, image: image, description: description}} handleURL={setURL} handleDescription={setDescription} handleImage={setImage} />}
                <div className="float-right mt-5"> 
                    <div className="flex gap-7">
                        <button>Cancel</button>
                        <button className="category-btn black-border cursor-pointer">Ok</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function EditFile({ fileData, handleURL, handleImage, handleDescription }: {fileData:dataFile, handleURL:(link:string) => void, handleImage:(img:string) => void, handleDescription:(desc:string) => void}){
    return (
        <>
            <label>URL</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.url} onChange={(e) => handleURL(e.target.value)} />
            <label>Image</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.image} onChange={(e) => handleImage(e.target.value)} />
            <label>Description</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full" value={fileData.description} onChange={(e) => handleDescription(e.target.value)} />
        </>
    );
}

export function DeleteModal(){
    return (
        <div>
            {/* <h1>Confi</h1> */}
            <form>
                <p>You will be unable to go back after deleting.</p>
                <button>Delete</button>
            </form> 
        </div>
    );
}