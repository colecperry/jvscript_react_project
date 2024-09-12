import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Card, ListGroup } from "react-bootstrap";
import { BsSpotify } from "react-icons/bs";
import TrackListItem from "./TrackListItem";

const ArtistDetails = ( { accessToken, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle, handleLikedSong } ) => {

    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const data = location.state;

    // Gives the same information as the location.state as is:
    useEffect(() => {
        if (data.type === "artist") {
            fetch(`https://api.spotify.com/v1/${data.type}s/${id}/top-tracks?market=US`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setTopTracks(data.tracks)
            })
        }
    }, [])

    useEffect(() => {
        if (data.type === "artist") {
            fetch(`https://api.spotify.com/v1/${data.type}s/${id}/albums?market=US`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items)
            })
        }
    }, [])

    const renderTopTracks = topTracks.map((track) => {
        return (
            <ListGroup.Item style={{position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <img style={{height:"50px", borderRadius:"7.5px"}} src={track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"}></img>
                <span style={{position:"absolute", left:"100px"}} >{track.name} - {track.album.name}</span>
                    <TrackListItem 
                        track={track} 
                        accessToken={accessToken} 
                        artistName={track.artists[0].name}
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        albumImage={track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"}
                        handleLikedSong={handleLikedSong}
                    />
                <a href={track.external_urls.spotify} target="_blank">
                    <BsSpotify style={{cursor:"pointer", color:"#1DB954", scale:"2.5"}} />
                </a>
            </ListGroup.Item>
        )
    })

    const renderAlbums = albums.map((album) => {
        return (
            <Card onClick={() => history.push({pathname:`/search/album/${album.name}/details`, state:album})}>
                <Card.Body>
                    <Card.Img src={album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} />
                    <br></br><br></br>
                    <Card.Title>{album.name}</Card.Title>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div>
            <Container>
                <br></br><br></br>
                <Row className="mx-2 row row-cols-4">
                    <Card style={{margin:"auto"}}>
                        <Card.Body>
                        <Card.Img src={data.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"} />
                            <br></br><br></br>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>Followers: {data.followers.total}</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <h2 className="sectionTitle">Top Songs</h2>
            <Container>
                <ListGroup>
                    {renderTopTracks}
                </ListGroup>
            </Container>
            <h2 className="sectionTitle">Top Albums</h2>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {renderAlbums}
                </Row>
            </Container>
        </div>
    )
}

export default ArtistDetails;