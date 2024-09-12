import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const CreatePlaylist = ({ allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) => {

    const [playlistName, setPlaylistName] = useState("")
    const [playlistDescription, setPlaylistDescription] = useState("")
    const history = useHistory();

    const createdPlaylist = {
        name: playlistName,
        description: playlistDescription,
        songs: []
    }

    const postPlaylist = (event) => {
        event.preventDefault()
        fetch("http://localhost:8000/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: playlistName,
                description: playlistDescription,
                songs: []
            })
        })
        .then((response) => response.json())
        .then((newPlaylistData) => console.log(newPlaylistData))
        setAllPlaylists([...allPlaylists, createdPlaylist])
        handleGeneralToggle()
    }

    const handleGeneralToggle = () => {
        setGeneralToggle(!generalToggle)
        handleRedirect()
    }
    
    const handleRedirect = () => {
        history.push({pathname: "/playlists"})
    }
    return (
        <Form style={{margin:"auto", width:"75vw", textAlign:"center"}} onSubmit={(event) => postPlaylist(event)}>
            <h1 className="pageTitle">Your New Playlist</h1>
            <Form.Group className="mb-3">
                <Form.Label>Playlist Name</Form.Label>
                <Form.Control type="text" placeholder="Playlist Name" value={playlistName} onChange={(event) => setPlaylistName(event.target.value)}></Form.Control>
                <Form.Text>C'mon, be creative!</Form.Text>
                <br></br>
                <Form.Label style={{marginTop:"75px"}}>Playlist Description</Form.Label>
                <Form.Control type="text" placeholder="Playlist Description" value={playlistDescription} onChange={(event) => setPlaylistDescription(event.target.value)}></Form.Control>
                <Form.Text>What's the vibe?</Form.Text>
            </Form.Group>
            <Button type="submit">Create Playlist!</Button>
        </Form>
    )
}

export default CreatePlaylist;