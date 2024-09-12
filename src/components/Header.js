import { Link } from "react-router-dom";
import { BsMusicNote } from "react-icons/bs"

function Header() {
    return (
        <div id="navBar">
            <Link to="/" exact="true" className="navBarLink"><h1 className="menuSpan">Codify<BsMusicNote style={{marginLeft:"15px", marginBottom:"5px"}} /></h1></Link> 
            {/* <Link to="/" exact="true" className="navBarLink"><h1 className="menuSpan">Home</h1></Link> */}
            <Link to="/search" exact="true" className="navBarLink"><h1 className="menuSpan">Search</h1></Link>
            <Link to="/playlists" exact="true" className="navBarLink"><h1 className="menuSpan">Playlists</h1></Link>
        </div>
    )
}

export default Header;