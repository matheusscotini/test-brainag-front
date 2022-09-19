import {
    Link,
    useColorModeValue,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const menuItems = [
    { name: 'Produtores', to: "/producers" },
];

const NavBarMenuItems: Function = (): JSX.Element[] => {
    const colorModeValue = useColorModeValue('gray.200', 'gray.700');

    return menuItems?.map((item: any, index: number) =>
        <Link
            key={index}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: colorModeValue,
            }}
            as={RouterLink}
            to={item.to}
        >
            {item.name}
        </Link>
    );
};

export default NavBarMenuItems;
