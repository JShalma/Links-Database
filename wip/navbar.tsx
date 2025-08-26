export default function NavBar(){
    return (
        <nav className="flex p-2 justify-between">
            <div className="flex" >
                <div className="w-60 flex gap-4" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg>
                    <span style={{fontSize:"30px"}}>Links</span>
                </div>
                <input type="text" placeholder="Search" className="flex-1 appearance-none rounded-2xl w-100 py-2 px-3 light-gray focus:outline-none" />
            </div>
            <img src="https://i.pinimg.com/736x/0d/98/c9/0d98c999b940b9d0255b06a5b77d2def.jpg" className="w-10 h-10 rounded-full" />
        </nav>
    );
}