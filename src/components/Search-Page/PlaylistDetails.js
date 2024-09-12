import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Card, ListGroup } from "react-bootstrap";
import { BsSpotify } from "react-icons/bs";

import TrackListItem from "./TrackListItem";

const PlaylistDetails = ({ accessToken, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle, handleLikedSong }) => {

    const [playlistTracks, setPlaylistTracks] = useState([]);
    const location = useLocation();
    const playlistData = location.state;

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${location.state.id}/tracks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setPlaylistTracks(data.items)
        })
    }, [])

    const renderPlaylistTracks = playlistTracks.map((item) => {
        console.log(item.track)
        return (
            <ListGroup.Item style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <img style={{height:"50px", borderRadius:"7.5px"}} src={item.track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"}></img>
                <span style={{position:"absolute", left:"100px"}}>{item.track.name}</span>
                    {console.log("ITEM TRACK", item.track)}
                    <TrackListItem 
                        track={item.track} 
                        accessToken={accessToken} 
                        artistName={item.track.artists[0].name}
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        albumImage={item.track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"}
                        handleLikedSong={handleLikedSong}
                    />
                <a href={item.track.external_urls.spotify} target="_blank">
                    <BsSpotify onClick={() => console.log(item.track.external_urls.spotify)} style={{cursor:"pointer", color:"#1DB954", scale:"2.5"}} />
                </a>   
            </ListGroup.Item>
        )
    })

    return (
        <div style={{marginBottom:"100px"}}>
            <Container>
            <br></br><br></br>
                <Row className="mx-2 row row-cols-4">
                    <Card style={{margin:"auto"}}>
                        <Card.Body>
                        <Card.Img src={playlistData.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} />
                            <br></br><br></br>
                            <Card.Title>{playlistData.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <h2 className="sectionTitle">Top Songs</h2>
            <Container>
                <ListGroup>
                    {renderPlaylistTracks}
                </ListGroup>
            </Container>
        </div>    
    )
}

export default PlaylistDetails;