// import necessary libraries
import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

export const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    image: ""
  });

  console.log(newProduct);

  return (
    <Container
      maxWidth='60vw'
      bg={useColorModeValue("gray.300", "gray.900")}>
      <VStack spacing={10}>
        <Heading padding={3} fontSize={16}>
          Create new product
        </Heading>
        <Box
          padding={5} >
          <Input name="name" placeholder="Name" variant="flushed"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input name="price" placeholder="Price" variant="flushed"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input name="category" placeholder="Category" variant="flushed"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          <Input name="image" placeholder="Image" variant="flushed"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        </Box>
      </VStack>
    </Container>
  )
}

