import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const theme = extendTheme({
    colors: {
        brain: {
            0: "#c4161c",
            100: "#DE181F",
            200: '#A61217'
        },
    },
})

export const App = () => (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>

                <AppRoutes />

            </ChakraProvider>
        </QueryClientProvider>
    </BrowserRouter>
)
