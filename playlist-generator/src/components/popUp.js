import { Modal, Button, Form, Col, Row, ListGroup } from 'react-bootstrap'
import useInput from '../custom_hooks/useInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'



const PopUp = (props) => {

    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const { value: description, bind: bindDescription, reset: resetDescription } = useInput('');
    // const [isPublic, setisPublic] = useState(false);

    const listOfSongs = props.listofsongs
    const token = props.token

    const removeSong = (e, songID, songName) => {
        e.preventDefault();
        props.handleSetListOfSongsRemove(songName, songID)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let songURIList = []
        listOfSongs.map(song => {
            songURIList.push(song.songURI)
        })

        var requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playlistData: {
                    name: name,
                    description: description,
                    public: false
                },
                songs: {
                    uris: songURIList
                }

            })
        };

        console.log(requestOptions.body)


        fetch(`/api/createPlaylist?token=${token}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));

        resetName();
        resetDescription();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Generate Spotify Playlist
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form className="spotifyForm" >
                            <Form.Group controlId="formName">
                                <Form.Label>Playlist Name</Form.Label>
                                <Form.Control type="text" {...bindName} />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" {...bindDescription} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        Review Song List
                    <ListGroup className="popUpSongList">
                            {listOfSongs && listOfSongs.map((song) => {
                                return <ListGroup.Item key={song.songID}>
                                    <div class="songArtist">{song.artistName}, {song.albumName}</div>
                                    <div>
                                        {song.songName}
                                        <FontAwesomeIcon className="deleteButton" icon={faMinusCircle} onClick={(e) => removeSong(e, song.songID, song.songName)} />
                                    </div>

                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={(e) => handleSubmit(e)}>Create Playlist</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopUp