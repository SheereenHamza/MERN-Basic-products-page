// import necessary libraries
import React from 'react';
import { useParams } from 'react-router-dom';

// import product store
import { useProductStore } from '@/store';
import { HStack, VStack, Box, Heading, Image, Text, Container } from '@chakra-ui/react';

export const ProductPage = () => {

    const { productId } = useParams();

    const { products } = useProductStore();

    const product = products.filter(product => product._id === productId)[0];

    return (
        <Container maxW='70%' padding={10} borderBlockColor='gray' shadow='lg'
            rounded='lg' overflow='hidden'>
            <HStack gap={3}>
                <Image h={40} minWidth={40} w='full' src={product.image} alt={product.name} objectFit='cover' />
                <VStack gap={2} justifyContent='space-between'>
                    <Heading> {product.name} </Heading>
                    <Text> {product.category} </Text>
                    <Text> ${product.price} </Text>
                </VStack>
            </HStack>
        </Container>
    )
};