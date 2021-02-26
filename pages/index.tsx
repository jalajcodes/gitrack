import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useAuth } from '@lib/auth';
import { useEffect } from 'react';

const Home: React.VFC = () => {
  const auth = useAuth();
  const toast = useToast();
  // useEffect(() => {
  //   if (!auth?.user?.token || !auth?.user?.username) {
  //     auth.signOut();
  //     toast({
  //       title: 'Token Expired',
  //       description: 'Please login again.',
  //       status: 'warning',
  //       duration: 5000,
  //       position: 'top',
  //       isClosable: true
  //     });
  //   }
  // }, []);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" w="full">
        <Box p="10" minW="900px" borderRadius="10px" boxShadow="md" bg="white">
          <Flex mt="-5" mb="-3" alignItems="center" justifyContent="center">
            <Image w="100px" src="./logo.png" />
          </Flex>
          <Heading as="h1" mt="0" mb="4" textAlign="center">
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
          <Divider />
        </Box>
      </Box>
    </>
  );
};

export default Home;
