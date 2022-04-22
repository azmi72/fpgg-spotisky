import { useToast, Box, Heading, Input, Textarea, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { clearSelectedTracks, clearForm } from '../../redux/store/playlist'
import { setForm } from "../../redux/store/playlist"
import { createPlaylist, addTrackToPlaylist } from "../../libraries/spotify"

const PlaylistForm = () => {
  const { accessToken, user } = useSelector(state => state.auth)
  const { selectedTracks, form } = useSelector(state => state.playlist)
  const toast = useToast()

  const dispatch = useDispatch()

  const handleFormChanges = e => {
      dispatch(setForm({[e.target.name]: e.target.value}))
  }

  const handleSubmit = e => {
       e.preventDefault()
       if (selectedTracks.length > 0){
           createPlaylist(accessToken, user.id, {
           name: form.title,
           description: form.description,
           public: false,
           collaborative: false
         }).then(playlist => {
           return addTrackToPlaylist(accessToken, playlist.id, {
             uris: selectedTracks
           })
         }).then(() => {
            dispatch(clearForm())
            dispatch(clearSelectedTracks())
            toast({
                title: "Playlist created.",
                position: "top",
                description: "Yeay you've successfully created a new playlist.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
         })
       } else {
         toast({
            title: "Warning",
            position: "top",
            description: "Please selected some tracks to make a playlist.",
            status: "info",
            duration: 9000,
            isClosable: true,
          })
       }    
   }

  return (
    <Box 
        marginBottom="1.5rem"
        textAlign="left"
        padding=".75rem">
        <Heading>Create Playlist</Heading>
        <form style={{ marginTop:"0.5em" }} onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <Input
                placeholder="Playlist Title"
                margin="0.5em 0"
                padding="1em"
                borderRadius="0.5rem"
                bgColor={'dark.500'} 
                type="text"
                name="title"
                minLength="10"
                onChange={handleFormChanges}
                value={form.title}
            />
            <label htmlFor="description">Description</label>
            <Textarea
                required="required"
                placeholder="Playlist Description"
                padding="1em"
                marginTop="0.5em"
                borderRadius="0.5rem"
                bgColor={'dark.500'} 
                name="description"
                type="text"
                minLength="20"
                onChange={handleFormChanges}
                value={form.description}
            ></Textarea>
            <Button
                type="submit"
                marginTop="0.5em"
                px='1.5em'
                bg={'brand.300'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}
            > Create Playlist </Button>
        </form>
    </Box>

  )
}
export default PlaylistForm