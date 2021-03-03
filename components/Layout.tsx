import {
  Box,
  Flex,
  Link,
  Avatar,
  Button,
  forwardRef,
  Image,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { useAuth } from '@lib/auth';
import { motion, isValidMotionProp } from 'framer-motion';
import NextLink from 'next/link';
import { useEffect } from 'react';
import Footer from './Footer';
import styled from '@emotion/styled';

const Toggle = styled.div`
  input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 80px;
    height: 30px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
    top: -12px;
    left: -12px;
  }

  label:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 21px;
    height: 21px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  input:checked + label {
    background: #bada55;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 50px;
  }
`;

const MotionFlex = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Flex flex="1" ref={ref} {...chakraProps} />;
  })
);

const Layout: React.FC = ({ children }) => {
  const auth = useAuth();
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', '#1A202C');
  const navColor = useColorModeValue('white', '#2D3748');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', function () {
        console.clear();
      });
      window.addEventListener('unhandledrejection', function (e) {
        console.log('Unhandled Error occurred: ' + e.reason.message);
      });
    }
  }, []);
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      backgroundColor={bgColor}
    >
      <Flex
        backgroundColor={navColor}
        mb={4}
        w="full"
        borderTop="5px solid #5094F0"
        boxShadow="md"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={[4, 8]}
          pb={[4, 8]}
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link mr="4" _focus={{ boxShadow: 'none' }}>
                <Image minW="100%" width="100px" src="./logo.png" />
              </Link>
            </NextLink>
            {auth.user && (
              <>
                <NextLink href="/profile" passHref>
                  <Link
                    _focus={{ boxShadow: 'none' }}
                    fontSize="sm"
                    mr={4}
                    fontWeight="medium"
                    color="gray.500"
                  >
                    Profile
                  </Link>
                </NextLink>
                <NextLink href="/track" passHref>
                  <Link
                    _focus={{ boxShadow: 'none' }}
                    fontSize="sm"
                    mr={4}
                    fontWeight="medium"
                    color="gray.500"
                  >
                    Tracker
                  </Link>
                </NextLink>
              </>
            )}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Toggle>
              <input type="checkbox" id="switch" />
              <label onClick={toggleColorMode} htmlFor="switch">
                Toggle
              </label>
            </Toggle>

            {!auth.user ? (
              <>
                <NextLink href="/login" passHref>
                  <Button
                    backgroundColor="gray.900"
                    color="white"
                    h="32px"
                    mr="3"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.700' }}
                    _active={{
                      bg: 'gray.800',
                      transform: 'scale(0.95)'
                    }}
                  >
                    Login
                  </Button>
                </NextLink>
                <Avatar
                  cursor="pointer"
                  name={auth?.user?.username}
                  src={auth?.user?.avatar}
                />
              </>
            ) : (
              <NextLink href="/profile">
                <Avatar
                  cursor="pointer"
                  name={auth?.user?.username}
                  src={auth?.user?.avatar}
                />
              </NextLink>
            )}
          </Flex>
        </Flex>
      </Flex>
      <MotionFlex key={Math.random() * 1000}>{children}</MotionFlex>
      <Footer />
    </Box>
  );
};

export default Layout;
