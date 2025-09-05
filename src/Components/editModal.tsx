import { useState } from "react";

export default function EditModal({ type } : { type:string }){
    // const [name, setName] = useState();
    // const [url, setURL] = useState();
    // const [image, setImage] = useState();
    // const [description, setDescription] = useState();

    return (
        <div>
            <form>
                <label>Name</label>
                <input className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full " />
                {type === "file" && <EditFile />}
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

function EditFile(){
    return (
        <>
            <label>URL</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full " />
            <label>Image</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full " />
            <label>Description</label>
            <input type="text" className="bg-(--bg-400) black-border rounded-md py-1.5 px-2 w-full " />
        </>
    );
}