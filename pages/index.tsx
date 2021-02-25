import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { useAuth } from '@lib/auth';
import { getIssues } from '../utils/getIssues';

const Home: React.VFC = () => {
  const auth = useAuth();
  const handleClick = async () => {
    const issues = await getIssues(auth.user.username);

    console.log(issues);
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        // height="100vh"
      >
        <Box border="1px" borderColor="gray.400" p="10" borderRadius="10px">
          {auth.user ? (
            <Box display="grid" placeItems="center">
              <div>{auth?.user?.displayName}</div>
              <Button borderRadius="100px" mb={3} onClick={handleClick}>
                Get Data
              </Button>
              <Button
                borderRadius="100px"
                mb={3}
                onClick={() => auth.signOut()}
              >
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
