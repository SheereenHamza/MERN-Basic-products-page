// import necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

// import Chakra UI components
import { Button, Container, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@/components/ui/color-mode';

// import icons
import { CiSquarePlus } from "react-icons/ci";
import { LuMoon, LuSun } from 'react-icons/lu';

export const Navbar = () => {

    // Get current color mode (theme) and function to toggle the same
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container
            maxW='90vw'
            fluid
            px={4}
            padding={5} >
            <Flex
                h={16}
                padding={5}
                justifyContent='space-between'
                alignItems='center'
                flexDir={{
                    base: 'column',
                    sm: 'row'
                }}
                bg={useColorModeValue("gray.300", "gray.900")} >
                <Text
                    fontSize={{ base: '30', sm: '40' }}
                    fontWeight='bold'
                    textTransform='uppercase'
                    textAlign='center'
                    bgClip='text'
                    bgGradient="to-r"
                    gradientFrom="cyan.300"
                    gradientTo="blue.700"
                >
                    <Link to='/'> Product Store </Link>
                </Text>
                <HStack spacing={2} alignItems='center'>
                    {/* Create Page button */}
                    <Link to='/create'>
                        <IconButton variant="outline" size="sm">
                            <CiSquarePlus fontSize={20} />
                        </IconButton>
                    </Link>
                    {/* Toggle theme button */}
                    <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                        {colorMode === "light" ? <LuMoon size={20} /> : <LuSun size={20} />}
                    </IconButton>
                </HStack>
            </Flex>
        </Container>
    )
}

