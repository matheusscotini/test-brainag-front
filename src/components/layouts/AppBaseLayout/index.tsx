import { Flex } from '@chakra-ui/react';
import React, { } from 'react';
import Navbar from '../../navigation/NavBar';

interface Props {
    children: any;
}

const AppBaseLayout: React.FC<Props> = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

export default AppBaseLayout;