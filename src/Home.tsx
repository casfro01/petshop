import {Outlet} from "react-router";
import NavBar from "./NavBar.tsx";

export default function Home(){
    return <>
        <NavBar></NavBar>
        <Outlet></Outlet>
    </>
}