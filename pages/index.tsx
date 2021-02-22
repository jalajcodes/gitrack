import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useAuth } from '@lib/auth';

export const Home: React.VFC = () => {
  const auth = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box border="1px" borderColor="gray.400" p="10" borderRadius="10px">
        {auth.user ? (
          <Box display="grid" placeItems="center">
            <div>{auth?.user?.displayName}</div>
            <Button borderRadius="100px" mb={3} onClick={() => auth.signOut()}>
              Sign Out
            </Button>
          </Box>
        ) : (
          <>
            <Button
              borderRadius="100px"
              mb={3}
              onClick={() => auth.signinWithGithub()}
            >
              Sign In with Github
            </Button>
            <br />
            <Button onClick={() => auth.signinWithTwitter()}>
              Sign In with Twitter
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
