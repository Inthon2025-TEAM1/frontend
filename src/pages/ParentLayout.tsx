import { Outlet } from "react-router-dom"
import { ParentHeader } from "../components/ParentHeader"

export const ParentLayout = () => {
    return (
        <>
            <ParentHeader/>
            <Outlet/>
        </>
    )
}
