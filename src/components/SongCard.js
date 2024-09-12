import AddToPlaylist from "./AddToPlaylist";
import { useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsSpotify, BsList } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const SongCard = ({ track, handleLikedSong, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isPlaylistClicked, setIsPlaylistClicked] = useState(false);
    const history = useHistory();

    const currentSong = {
        song_id: track.id,
        song_name: track.name,
        song_link: track.external_urls.spotify,
        artists_id: track.artists[0].id,
        artists: track.artists[0].name,
        artists_link: track.artists[0].external_urls.spotify,
        album_id: track.album.id,
        album_name: track.album.name,
        album_link: track.album.external_urls.spotify,
        image: track.album.images[0].url,
        popularity: track.popularity,
        preview_url: track.preview_url
    }
    
    const handleAddToPlaylist = (playlist) => {
        fetch(`http://localhost:8000/playlists/${playlist.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songs: [
                    ...playlist.songs,
                    currentSong
                ]
            })
        })
        .then((response) => response.json())
        .then((addedSongData) => console.log(addedSongData))
        setAllPlaylists([...allPlaylists, currentSong])
        setGeneralToggle(!generalToggle)
    }
    
    const onLikeButtonClick = () => {
        setIsLiked(!isLiked)
        handleLikedSong(currentSong)
    }

    const handleCreateNewPlaylist = () => {
        history.push({pathname:"/playlists/new-playlist"})
    }

// Add onclick event listener to button component & point back to handleLikedSong function which lives in App
// Render the details of the song cards with 
    return (
        <Card className="songCard" style={{position:"relative"}}>
            <Card.Body>
            <Card.Img src={track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} />
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>{track.artists[0].name}</Card.Text>
            </Card.Body>
            <span style={{display:"block", marginTop:"25px", marginBottom:"-25px", zIndex:"10"}}>
                {isLiked ? 
                <FaHeart className="fullHeart" onClick={() => window.alert("You've already liked this post!")} />            
                : <FaRegHeart className="emptyHeart" onClick={onLikeButtonClick} />
                }
                <a href={track.external_urls.spotify} target="_blank">
                    <BsSpotify className="spotifyLogo" />
                </a>
            </span>
            <AddToPlaylist 
                song={track}
                allPlaylists={allPlaylists}
                handleAddToPlaylist={handleAddToPlaylist}
                handleCreateNewPlaylist={handleCreateNewPlaylist}
                isPlaylistClicked={isPlaylistClicked}
                setIsPlaylistClicked={setIsPlaylistClicked}
            />
        </Card>
    )
}

export default SongCard;

