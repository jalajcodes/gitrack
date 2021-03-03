import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text
} from '@chakra-ui/layout';
import { CheckCircle } from '@components/Icons';

const Home: React.VFC = () => {
  const bg = useColorModeValue('white', '#2D3748');
  const bg2 = useColorModeValue('white', '#1A202C');

  return (
    <>
      <Box
        m="5"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="full"
      >
        <Box p="10" borderRadius="10px" boxShadow="md" bg={bg}>
          <Flex mt="-5" mb="-3" alignItems="center" justifyContent="center">
            <Image w="100px" src="./logo.png" />
          </Flex>
          <Heading as="h1" mt="0" mb="10" textAlign="center">
            🥳{' '}
            <Text color="#5094F0" display="inline">
              Welcome
            </Text>{' '}
            <Text color="#EF5125" display="inline">
              to{' '}
            </Text>
            <Text color="#CC579E" display="inline">
              GiTrack! 🥳
            </Text>
          </Heading>
          <Flex wrap="wrap" justifyContent="center" alignItems="center">
            <Box
              mr={[0, 0, 10]}
              w={[250, 400]}
              shadow="lg"
              borderRadius="lg"
              padding="5"
              mb={[5, 5, 0]}
              bg={bg2}
            >
              <Image
                m="auto"
                mb="5"
                src="./stats.svg"
                borderRadius="50%"
                w="28"
              />
              <Text>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Statistics from Github
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Total Pull Requests and Issues
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Current Streak Info
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Most Used Languages
                  </ListItem>
                </List>
              </Text>
            </Box>
            <Box bg={bg2} w={[250, 400]} p="5" shadow="lg" borderRadius="lg">
              <Image
                m="auto"
                mb="5"
                src="./issue.svg"
                borderRadius="50%"
                w="28"
              />
              <Text>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Track Issues on Kanban Board
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Rearrange and Reorder cards and lanes
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Fetch assigned issues from github
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircle} fill="green" />
                    Persistent board state
                  </ListItem>
                </List>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
