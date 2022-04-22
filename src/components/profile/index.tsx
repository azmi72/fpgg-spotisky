import { Avatar,  Box,  HStack,  VStack,  Link, Button }from '@chakra-ui/react'

interface IUser {
    userData: any
}

const Profile = ({ userData } : IUser) => {
    const isLoading = userData.display_name === undefined;
    const { external_urls, display_name, images } = userData;
    return isLoading ? (
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="start"
      > Loading
      </Button>
    ) : (
      <HStack>
        <Avatar
            size={'sm'}
            src={images[0]?.url}
            alt={display_name}
        />
        <VStack
            display={{ base: 'none', md: 'flex' }}
            alignItems="flex-start"
            spacing="1px"
            ml="2">
            <Link href={external_urls.spotify} fontSize="md">{display_name}</Link>
        </VStack>
        <Box display={{ base: 'none', md: 'flex' }}>
        </Box>
    </HStack>
    );
  };
  
export default Profile;
