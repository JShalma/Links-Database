export default function NavBar(){
    return (
        <nav className="md:block h-16 flex-none">
            <div className="h-full flex">
                <div className="w-64 flex-none flex items-center p-5 gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5"/>
                        <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z"/>
                    </svg>
                    <h1 className="text-2xl">Links DB</h1>
                </div>
                <div className="h-full flex-grow pt-2">
                    <input type="text" className="p-2 rounded-3xl black-border search-bar" placeholder="Search in Directory" />
                </div>
            </div>
        </nav>
    );
}