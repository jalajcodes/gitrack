// import Octicon, { Briefcase, Calendar, Location } from '@primer/octicons-react';
// import UserInfoStyles from './styles/UserInfoStyles';
// import { Section } from '../style';

import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { useAuth } from '@lib/auth';
import { CalendarIcon, LocationIcon, OrgIcon } from './Icons';

const Statistics = ({ stats: userStats }) => {
  const stats = userStats.data;
  const auth = useAuth();

  return (
    <Box w="full" display="grid" placeItems="center">
      <Box
        maxWidth="900px"
        // height="240px"
        m="5"
        bg="white"
        shadow="md"
        borderRadius="md"
        overflow="hidden"
      >
        {stats && (
          // <UserInfoStyles>
          <Box display="flex">
            {stats.avatar_url && (
              <Image
                boxSize="300px"
                objectFit="cover"
                src={stats.avatar_url}
                alt={auth?.user?.username}
              />
            )}

            <Box boxShadow="xl" padding="5">
              {stats.name && <Heading as="h3">{stats.name}</Heading>}

              {stats.login && (
                <>
                  <Text color="#5094F0" mb="5">
                    @{stats.login}
                  </Text>
                </>
              )}

              <div className="info">
                {stats.company && (
                  <Text color="#CC579E">
                    <OrgIcon mr="1" mb="1" />
                    {stats.company}
                  </Text>
                )}

                {stats.location && (
                  <Text color="#EF5125">
                    <LocationIcon mr="1" mb="1" />
                    {stats.location}
                  </Text>
                )}

                {stats.created_at && (
                  <Text color="#5094F0">
                    <CalendarIcon mr="1" mb="1" />
                    Joined{' '}
                    {new Date(stats.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                )}
              </div>

              <Flex mt="3" direction="column">
                <HStack>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    shadow="md"
                    padding="3"
                    bgColor="gray.100"
                    transition="all .3s ease"
                    borderRadius="sm"
                    _hover={{ bgColor: '#EF5125', color: '#fff' }}
                    cursor="default"
                  >
                    <Text>{stats.followers.toLocaleString()}</Text>
                    <Text>&nbsp;Followers</Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    cursor="default"
                    justifyContent="center"
                    shadow="md"
                    padding="3"
                    transition="all .3s ease"
                    borderRadius="sm"
                    _hover={{ bgColor: '#5094F0', color: '#fff' }}
                    bgColor="gray.100"
                  >
                    <Text>{stats.following.toLocaleString()}</Text>
                    <Text>&nbsp;Following</Text>
                  </Flex>
                </HStack>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  cursor="default"
                  shadow="md"
                  padding="3"
                  mt="2"
                  bgColor="gray.100"
                  transition="all .3s ease"
                  borderRadius="sm"
                  _hover={{ bgColor: '#CC579E', color: '#fff' }}
                >
                  <Text>{stats.public_repos.toLocaleString()}</Text>
                  <Text>&nbsp;Repositories</Text>
                </Flex>
              </Flex>
            </Box>

            {/* </UserInfoStyles> */}
          </Box>
        )}
      </Box>
      <Flex alignItems="center" direction="column" wrap="wrap">
        <Box m="5" w="540px">
          <Image
            // shadow="md"
            minW="100%"
            src={`https://github-readme-stats.vercel.app/api?username=${stats?.login}&show_icons=true`}
            alt={auth?.user?.username}
          />
        </Box>
        <Box m="5" w="540px">
          <Image
            minW="100%"
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${stats?.login}&layout=compact`}
            alt={auth?.user?.username}
          />
        </Box>
        <Box m="5" mb="28" w="540px">
          <Image
            minW="100%"
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${stats?.login}&layout=compact`}
            alt={auth?.user?.username}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Statistics;
