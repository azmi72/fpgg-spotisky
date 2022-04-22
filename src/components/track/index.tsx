import React from "react"
import './styles.css'
import { Flex, Image, Text, Button, useBreakpointValue} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { Artist, Track as SpotifyTrack } from "../../redux/types"
import { addSelectedTracks, removeSelectedTracks } from "../../redux/store/playlist"


const Track = ({track} : {track: SpotifyTrack}) => {
    const dispatch = useAppDispatch()

    const selectedTracks = useAppSelector(state => state.playlist.selectedTracks)
    const isSelected: boolean = selectedTracks.includes(track.uri)

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (isSelected) {
          dispatch(removeSelectedTracks(track.uri))
        } else {
          dispatch(addSelectedTracks(track.uri))
        }
      }
  
      const artistName: JSX.Element[]  = track.artists.map((artist: Artist, idx: number) => {
        const isLast = idx === track.artists.length - 1;
        const txt = isLast ? artist.name : artist.name + ",";
        return (
            <a href={artist.external_urls.spotify} className='link' key={idx}> {txt}</a>
        );
    });


    return (
    <Flex alignItems='center' borderBottom='1px' textAlign='left' width={["full", null, "unset"]} 
          borderRadius='sm' _hover={{ bg: 'dark.500' }} justifyContent='space-between' flex={1}>
        <Image data-testid="album-cover" padding='.5rem' borderRadius='5px' boxSize='80px' src={track.album.images[1].url}
               objectFit="cover" alt={track.album.name}/>
        <Flex mx={2} direction='column' flex={1}>
            <Text data-testid="track-name" fontSize={useBreakpointValue([ "md", "lg"])} fontWeight='bold'>{track.name}</Text>
            <Text data-testid="artist-name" fontSize={useBreakpointValue([ "md", "lg"])}> {artistName}</Text>            
        </Flex>
         <Flex mx={2} direction='column' flex={1}  display={{ md: 'flex', base: 'none' }}>
            <a data-testid="album-name" href={track.album.external_urls.spotify} className='link'>{track.album.name}</a>
         </Flex>
        <Flex  mx={2} direction='column' >
            <Button
                size={useBreakpointValue(["sm", "md"])}
                type='button'
                variant={isSelected? 'outline' : 'solid'}
                color={'white'}                
                onClick={handleClick}
            >{isSelected ? "Selected" : "Select"}</Button>        
        </Flex>
    </Flex>
    )
}
export default Track
