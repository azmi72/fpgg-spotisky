import './styles.css'
import Card from '../../components/card'
import { Heading } from '@chakra-ui/react'
import { getUserPlaylist } from '../../libraries/spotify'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated, accessToken } = useSelector(state => state.auth)
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsloading] = useState(false)


  useEffect(() => {
    if (isAuthenticated)
      setIsloading(true);
    getUserPlaylist(accessToken)
      .then(user => setPlaylists(user.items))
    setIsloading(false);
  }, [isAuthenticated, accessToken]);

  return (
    <div className="home">
      <Heading className="subtitle">  Your Playlists </Heading>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="content">
          {playlists.map(playlist =>
            <Card
              key={playlist.id}
              onClick={() => window.open(playlist.external_urls.spotify)}
              alt={playlist.name}
              thumbnail={playlist.images[0]?.url}
              title={playlist.name}
              owner={'By ' + playlist.owner.display_name}
            />)}
        </div>
      )}
    </div>
  )
}

export default Home