import { Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const ArtistList = (props) => {

    const artistNameList = props.listOfArtists


    const handleSubmit = (e) => {
        e.preventDefault();
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };



        async function getPopularSongs() {
            let songArray = []
            await Promise.all(artistNameList.map(async (artist) => {
                await fetch(`/api/getPopularSongs?artistID=${artist.artistID}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    songArray.push(...result)
                })
                .catch(error => console.log('error', error));
                })
            )
          props.handleSetListOfSongs(songArray)
        }

        getPopularSongs();
    }

    const removeArtist = (e, artistID, artistName) => {
        e.preventDefault();
        props.handleListRemove(artistName, artistID)
    }

    return (
        <div>
            <ListGroup>
                {artistNameList && artistNameList.map((artist) => {
                    return <ListGroup.Item key={artist.artistID}>{artist.artistName}
                        <FontAwesomeIcon className="deleteButton" icon={faMinusCircle} onClick={(e) => removeArtist(e, artist.artistID, artist.artistName)} />
                    </ListGroup.Item>
                })}
                <Button variant="primary" type="submit" className="generateButton" onClick={(e) => handleSubmit(e)}>Generate Popular Songs List</Button>

            </ListGroup>
        </div>
    )

}

export default ArtistList
