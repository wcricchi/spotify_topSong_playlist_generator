import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ArtistCard from '../components/artistCard'
import ArtistList from '../components/artistList'
import SongList from '../components/songList'
import PopUp from '../components/popUp'



const HomePage = (props) => {

    const [artist, setArtisit] = useState([]);
    const [content, setContent] = useState("");
    const [listOfArtists, setListOfArtists] = useState([])
    const [listOfSongs, setListOfSongs] = useState([])
    const [showPopUp, setShowPopUp] = useState(false);

    const token = props.token;

    useEffect(() => {

    })

    const handleListChange = (artistName, artistID) => {
        const newArtistList = [...listOfArtists];
        newArtistList.push({ artistName, artistID })
        setListOfArtists(newArtistList)
    }

    const handleListRemove = (artistName, artistID) => {
        const newArtistList = [...listOfArtists];
        let filtered = newArtistList.filter(artist => artist.artistID !== artistID)
        setListOfArtists(filtered)
    }



    const handleSetListOfSongs = (results) => {

        const newSongList = [...listOfSongs]
        results.map(song => {
            let albumName = song.album.name;
            let artistName = song.artists[0].name
            let songName = song.name
            let songID = song.id
            let songURL = song.external_urls.spotify
            let songURI = song.uri
            let inList = false
            newSongList.map(existingSong => {
                if (existingSong.songID === songID) {
                    inList = true;
                }
            })
            if (!inList) newSongList.push({ albumName, artistName, songName, songID, songURL, songURI })
        })
        setListOfSongs(newSongList)
    }

    const handleSetListOfSongsRemove = (songName, songID) => {
        const newSongList = [...listOfSongs]
        let filtered = newSongList.filter(song => song.songID !== songID)
        setListOfSongs(filtered)
    }
    const handleClearSongList = () => {
        setListOfSongs([])
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        if (artist === "") {
            setContent("")
        } else {
            fetch(`/api/getArtist?artist=${artist}&token=${token}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setContent(result)
                })
                .catch(error => console.log('error', error));
        }


    }

    return (
        <Container className="main-container">
            <Row>
                <Col>
                    <div>
                        <h1>Spotify Playlist Generator</h1>
                        <h3>Create Playlist with top songs from list of Artists</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="align-left" onSubmit={handleSubmit}>
                        <Form.Group controlId="formSearchArtists">
                            <Form.Label>Artist Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Artist" value={artist} onChange={e => setArtisit(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>

                    <Row>
                        {content.length > 0 && content.map((artist) =>
                            <div className="artistCard" key={artist.key}>
                                <ArtistCard artist={artist} handleListChange={handleListChange} listOfArtists={listOfArtists}></ArtistCard>
                            </div>
                        )}
                    </Row>

                </Col>
                <Col>
                    <Row className="listOfArtists">
                        {listOfArtists.length > 0 && <ArtistList listofartists={listOfArtists} handleListRemove={handleListRemove} handleSetListOfSongs={handleSetListOfSongs} token={token}></ArtistList>}
                    </Row>
                    <Row className="listOfSongs">
                        {listOfSongs.length > 0 && <SongList listofsongs={listOfSongs} handleSetListOfSongsRemove={handleSetListOfSongsRemove} handleClearSongList={handleClearSongList} setShowPopUp={setShowPopUp}></SongList>}
                    </Row>
                </Col>
            </Row>
            <PopUp show={showPopUp} onHide={() => setShowPopUp(false)} listofsongs={listOfSongs} handleSetListOfSongsRemove={handleSetListOfSongsRemove} token={token}></PopUp>
        </Container>
    )
}

export default HomePage