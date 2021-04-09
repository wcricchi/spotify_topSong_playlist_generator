import React, { useEffect, useState } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'


const ArtistCard = (props) => {

    const artistName = props.artist.name
    const artistID = props.artist.id
    const spotifyUrl = props.artist.external_urls.spotify
    const artistImgURL = props.artist.images[0]
    const followers = props.artist.followers.total
    const genres = props.artist.genres
    const generesLen = genres.length
    const displayGenres = genres.map((genre, i) => {
        return <>{genre}{i < generesLen - 1 ? ", " : ""}</>
    })

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(false)
        props.listOfArtists.map((artist) => {
            if (artist.artistID === artistID) {
                setDisabled(true)
                return true
            }
        })
    }, [artistID, props.listOfArtists, artistName])

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        props.handleListChange(artistName, artistID)
        setDisabled(true)
    }

    //



    return (
        <Card style={{ wdith: '18rem' }}>
            <Card.Img variant="top" src={artistImgURL && artistImgURL.url} onClick={() => openInNewTab(spotifyUrl)} className="artistImage" />
            <Card.Body>
                <Card.Title>{artistName}</Card.Title>
                <ListGroup className="list-group-flush align-left">
                    <ListGroupItem>Followers: {followers}</ListGroupItem>
                    <ListGroupItem>Generes: {displayGenres}</ListGroupItem>
                </ListGroup>
                <Button variant="primary" type="submit" onClick={(e) => handleOnClick(e)} disabled={disabled}>Add to Artist List</Button>
            </Card.Body>
        </Card>
    )


}

export default ArtistCard