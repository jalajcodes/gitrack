import { Box, Button, Flex, Stack, Image } from '@chakra-ui/react';
import { useAuth } from '@lib/auth';
import { GithubIcon } from '@components/Icons';

const Login = () => {
  const auth = useAuth();
  return (
    <Flex
      align="center"
      justify="center"
      flex="1"
      backgroundColor={['white', 'gray.100']}
    >
      <Stack
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Box as="a" href="/" aria-label="Back to homepage">
            <Image mt="-7" w="100px" src="./logo.png" />
          </Box>
        </Flex>
        <Button
          onClick={() => auth.signinWithGithub('/')}
          // onClick={() => auth.signinWithGitHub()}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          leftIcon={<GithubIcon />}
          mt={2}
          h="50px"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Login with GitHub
        </Button>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => <Login />;

export default LoginPage;
