// import necessary libraries
import { Routes, Route } from "react-router-dom";

// import Chakra UI components
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

// import components
import { Navbar } from "./components";

// import pages
import { CreatePage, HomePage } from "./pages";

export const App = () => {
  return (
    <Box minH='100vh' bg={useColorModeValue("gray.200", "gray.800")}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </Box>
  )
};