import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}