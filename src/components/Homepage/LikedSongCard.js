import AddToPlaylist from "../AddToPlaylist";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Dropdown } from "react-bootstrap";
import { BsSpotify, BsList } from "react-icons/bs";

const LikedSongCard = ({ song, handleRemovedLike, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) => {

    const [isPlaylistClicked, setIsPlaylistClicked] = useState(false);
    const history = useHistory();

// Render a LikedSongCard component (image, song name, artist, and song preview url)
// Render a Remove from likes component with an onclick that is passed to a function
// handleRemoveLike in the LikedSong component which sends a delete request to our JSON

    const handleAddToPlaylist = (playlist) => {
        fetch(`http://localhost:8000/playlists/${playlist.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songs: [
                    ...playlist.songs,
                    song
                ]
            })
        })
        .then((response) => response.json())
        .then((addedSongData) => console.log(addedSongData))
        setAllPlaylists([...allPlaylists, song])
        setGeneralToggle(!generalToggle)
    }

    const handleCreateNewPlaylist = () => {
        history.push({pathname:"/playlists/new-playlist"})
    }

    return (
        <Card>
            <Card.Body>
                <Card.Img src={song.image} />
                <Card.Title>{song.song_name}</Card.Title>
                <Card.Text>{song.artists}</Card.Text>
            </Card.Body>
            <span style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <Button onClick={() => handleRemovedLike(song)}>Remove From Likes</Button>
                <a href={song.song_link} target="_blank">
                    <BsSpotify className="spotifyLogo" />
                </a>
            </span>
            <AddToPlaylist 
                song={song}
                allPlaylists={allPlaylists}
                handleAddToPlaylist={handleAddToPlaylist}
                isPlaylistClicked={isPlaylistClicked}
                setIsPlaylistClicked={setIsPlaylistClicked}
                handleCreateNewPlaylist={handleCreateNewPlaylist}
            />
        </Card>
        )
}

export default LikedSongCard;