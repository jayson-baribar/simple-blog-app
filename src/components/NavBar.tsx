import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

const NavBar = ()=> {
    return (
        <nav style ={ styles.nav}>
            <Link to = "/blogs"> Blogs </Link>
            <Link to = "/profile"> Profile </Link>
            <Link to = "/login"> Login </Link>
            <Link to = "/register"> Register </Link>
            <Link to = "/logout"> Logout</Link>
        </nav>
    )
}

const styles: { nav: CSSProperties } = {
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    background: "#111",
    color: "white",
  },
};

export default NavBar;