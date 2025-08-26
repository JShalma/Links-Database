import Link from "next/link";

type FolderItem = {
    name: string;
    id: string;
    type: string;
}

export default function Folder({ name, id, type } : FolderItem){
    return (
        <div className="bg-gray-700">
            <Link key={id} href={`/folder/${id}`}>{name}</Link>
        </div>
    );
}