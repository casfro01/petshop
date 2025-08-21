import {useNavigate} from "react-router";

export default function NavBar() {
    const navigator = useNavigate();
    return <div className="navbar bg-primary text-primary-content shadow-sm sticky top-0 z-50">
        <button className="btn btn-ghost text-xl" onClick={()=> navigator("/")}>Home</button>
        <button className="btn btn-ghost text-xl" onClick={()=> navigator("/pet")}>Pets</button>
        <button className="btn btn-ghost text-xl" onClick={()=> navigator("/pet/form/create")}>New Pet</button>
    </div>
}