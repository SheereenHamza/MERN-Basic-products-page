// import necessary libraries
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// import Chakra UI components
import { Container, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';

// import product store
import { useProductStore } from '@/store';

// import components
import { ProductCard } from '@/components';

export const HomePage = () => {

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW='80vw'>
      <VStack spacing={8}>
        <Heading fontSize={20} textAlign='center'> Current products </Heading>
        {/* Show products list with UI actions */}
        < SimpleGrid columns={{ base: '1', sm: '2', md: '3', lg: '4', xl: '4' }} gap={3}>
          {products.map((product) => (<ProductCard key={product._id} product={product} />))}
        </SimpleGrid>
        {/* No products to show */}
        {products.length === 0 && <Text>
          No products found :( &#9;
          <Link to='/create'>
            <Text as='span' color='blue.400' _hover={{ textDecoration: 'underline' }}> Create product </Text>
          </Link>
        </Text>}

      </VStack>
    </Container >
  )
}


