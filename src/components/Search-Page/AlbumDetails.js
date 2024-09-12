import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Card, ListGroup } from "react-bootstrap";
import { BsSpotify } from "react-icons/bs";
import TrackListItem from "./TrackListItem";

const AlbumDetails = ({ accessToken, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle, handleLikedSong }) => {

    const [albumTracks, setAlbumTracks] = useState([]);
    const location = useLocation();
    const albumData = location.state;

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/albums/${location.state.id}/tracks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("ALBUM DATA:", data)
            setAlbumTracks(data.items)
        })
    }, [])

    const renderAlbumTracks = albumTracks.map((track) => {
        return (
            <ListGroup.Item style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <img src={albumData.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} style={{height:"50px", borderRadius:"7.5px"}}></img>
                <span style={{position:"absolute", left:"100px"}}>{track.name}</span>
                <TrackListItem 
                    track={track} 
                    accessToken={accessToken} 
                    artistName={albumData.artists[0].name} 
                    albumImage={albumData.images[0]?.url  || process.env.PUBLIC_URL + "logo192.png"}
                    allPlaylists={allPlaylists}
                    setAllPlaylists={setAllPlaylists}
                    generalToggle={generalToggle}
                    setGeneralToggle={setGeneralToggle}
                    handleLikedSong={handleLikedSong}  
                />
                <a href={track.external_urls.spotify} target="_blank">
                    <BsSpotify onClick={() => console.log(track.external_urls.spotify)} style={{cursor:"pointer", color:"#1DB954", scale:"2.5"}} />
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
                        <Card.Img src={albumData.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} />
                            <br></br><br></br>
                            <Card.Title>{albumData.name}</Card.Title>
                            <Card.Text>Released: {albumData.release_date}</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <h2 className="sectionTitle">Top Songs</h2>
            <Container>
                <ListGroup>
                    {renderAlbumTracks}
                </ListGroup>
            </Container>
        </div>
    )
}

export default AlbumDetails;