import React from 'react'
import { Box, Flex, Heading, Input, Button } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

interface ISearchBar {
    handleSearch: (query: string) => void;
}

const SearchBar = ({ handleSearch }:ISearchBar) => {
   
   const [query, setQuery] = React.useState("");
   
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     query !== "" && handleSearch(query);
  };

  return (
      <Box>
        <Heading
            paddingX="0.75rem" 
            fontSize="xl" 
            color="whitesmoke" 
            textAlign="left" 
        > Find your favorite music for your playlist</Heading>
        <Flex width={["full", null, "unset"]} textAlign="left" alignItems="center" padding="0.75rem">
            <form style={{ display: "flex", flex: 1 }} onSubmit={handleSubmit}>
                <Input
                    data-testid="search-bar"
                    width={["full", null, "unset"]}
                    name="track"
                    placeholder="Search for track or artist"
                    padding="1em"
                    borderRadius="0.5rem"
                    marginRight="0.5em"
                    bgColor={'dark.500'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    px='1.5em'
                    leftIcon={<FaSearch/>}
                    bg={'brand.300'}
                    color={'white'}
                    _hover={{ bg: 'whiteAlpha.500' }}
                > Search </Button>
            </form>
        </Flex>
      </Box>    
  )
}

export default SearchBar