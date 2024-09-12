import { Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs"

const AddToPlaylist = ({ song, allPlaylists, handleAddToPlaylist, isPlaylistClicked, setIsPlaylistClicked, handleCreateNewPlaylist }) => {

    const dropDownOptions = () => {
        return allPlaylists.map((playlist) => {
            return <Dropdown.Item onClick={() => handleAddToPlaylist(playlist)}>{playlist.name}</Dropdown.Item>
        })
    }

    return (
        <span className="audioPlaylistSpan">
            <audio className="songCardAudio" controls name="media">
                <source src={song.preview_url} alt="no preview available" type="audio/mp3" />
            </audio>
            <Dropdown className="playlistDropdown">
                <Dropdown.Toggle variant="none" style={{marginBottom:"15px"}}>
                    <BsList type="select" onClick={() => setIsPlaylistClicked(!isPlaylistClicked)} style={{display:"inline-flex", cursor:"pointer", scale:"1.75", zIndex:"10"}} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="songCardDropdownMenu">
                    <span className="songCardDropdownMenu"><strong>Add to...</strong></span>
                    <Dropdown.Item onClick={() => handleCreateNewPlaylist()}>New Playlist</Dropdown.Item>
                {dropDownOptions()}
                </Dropdown.Menu>
            </Dropdown>
        </span>
    )
}

export default AddToPlaylist;