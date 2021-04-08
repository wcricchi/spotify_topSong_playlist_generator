import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ArtistCard from '../components/artistCard'
import ArtistList from '../components/artistList'
import SongList from '../components/songList'


const HomePage = () => {

    const [artist, setArtisit] = useState([]);
    const [content, setContent] = useState("");
    const [listOfArtists, setListOfArtists] = useState([])
    const [listOfSongs, setListOfSongs] = useState([])

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
            let inList = false
            newSongList.map(existingSong => {
                if (existingSong.songID === songID) {
                    inList = true;
                }
            })
            if (!inList) newSongList.push({ albumName, artistName, songName, songID, songURL })
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
            fetch(`/api/getArtist?artist=${artist}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setContent(result)
                })
                .catch(error => console.log('error', error));
        }


    }

    return (
        <Container>
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
                        <ArtistList listOfArtists={listOfArtists} handleListRemove={handleListRemove} handleSetListOfSongs={handleSetListOfSongs}></ArtistList>
                    </Row>
                    <Row className="listOfSongs">
                        {listOfSongs.length > 0 && <SongList listOfSongs={listOfSongs} handleSetListOfSongsRemove={handleSetListOfSongsRemove} handleClearSongList={handleClearSongList}></SongList>}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage