import { extendTheme } from '@chakra-ui/theme-utils';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white',
            },
        },
    },
    colors: {
        brand: {
            50: '#f7fafc',
            500: '#2D3748',
            900: '#1a202c',
        },
    },
});

export default theme; 