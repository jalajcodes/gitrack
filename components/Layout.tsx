import {
  Box,
  Flex,
  Icon,
  Link,
  Avatar,
  Button,
  forwardRef
} from '@chakra-ui/react';
import { useAuth } from '@lib/auth';
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import Footer from './Footer';

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

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      backgroundColor="gray.100"
    >
      <Flex
        backgroundColor="white"
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
              <Link>
                <Icon name="logo" size="24px" mr={8} />
              </Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {!auth.user && (
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
            )}
            <NextLink href="/profile">
              <Avatar
                cursor="pointer"
                name={auth?.user?.username}
                src={auth?.user?.avatar}
              />
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <AnimatePresence exitBeforeEnter>
        <MotionFlex
          key={Math.random() * 1000}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
              y: -30
            },
            pageAnimate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5
              }
            },
            pageExit: {
              opacity: 0,
              y: 30,
              transition: { duration: 0.5 }
            }
          }}
        >
          {children}
        </MotionFlex>
      </AnimatePresence>
      <Footer />
    </Box>
  );
};

export default Layout;
