import {
    Box,
    Flex,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Image,
    HStack,
    IconButton,
    Stack,
    Button,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import NavBarMenuItems from './NavBarMenuItems';

import Logo from "../../../assets/images/logo.png"

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box boxShadow="lg" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link to="/">
                                <Image w={100} src={Logo} />
                            </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NavBarMenuItems />
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                        </Stack>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavBarMenuItems />
                        </Stack>
                    </Box>
                ) : null}

            </Box>
        </>
    );
}





