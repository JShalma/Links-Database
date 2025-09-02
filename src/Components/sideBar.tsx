export default function SideBar(){
    return (
        <aside className="md:block w-64 flex-none sticky top-0">
            <div className="container p-5 w-full red-border">
                <button className="category-btn w-full black-border mb-3">Add File</button>
                <br/>
                <button className="category-btn w-full black-border mb-3">Add Folder</button>
            </div>
            
        </aside>
    );
}