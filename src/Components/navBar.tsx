export default function NavBar(){
    return (
        <nav className="md:block h-16 flex-none">
            <div className="h-full flex">
                <div className="w-64 flex-none"></div>
                <div className="h-full flex-grow pt-2">
                    <input type="text" className="p-2 rounded-3xl black-border search-bar" placeholder="Search in Directory" />
                </div>
            </div>
        </nav>
    );
}