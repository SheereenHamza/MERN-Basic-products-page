// import necessary libraries
import React, { useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';

// import Chakra UI components
import { Box, Button, Container, Field, Heading, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";

// import stores
import { useProductStore } from '@/store';

export const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    image: ""
  });

  const { createProduct } = useProductStore();

  const addProductHandler = async () => {
    if (newProduct.price <= 0)
      toaster.create({
        title: `price should be greater than 0`,
        type: 'error',
        duration: 5000
      });
    else {
      const { success, message } = await createProduct(newProduct);
      toaster.create({
        title: message,
        type: success ? 'success' : 'error',
        duration: 5000
      });
      if (success)
        setNewProduct({ name: '', price: 0, category: '', image: '' });
    }
  }

  return (
    <Container
      maxWidth='60vw'
      bg={useColorModeValue("gray.300", "gray.900")}>
      <VStack spacing={10}>
        <Heading padding={3} fontSize={20} fontWeight={1}>
          Create new product
        </Heading>
        <Box
          padding={5} >
          <VStack spacing={5}>
            <Field.Root required orientation='horizontal'>
              <Field.Label> Name  <Field.RequiredIndicator /> </Field.Label>
              <Input name="name" variant="outline"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            </Field.Root>
            <Field.Root required orientation='horizontal'>
              <Field.Label> Price <Field.RequiredIndicator /> </Field.Label>
              <Input name="price" variant="outline" type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            </Field.Root>
            <Field.Root required orientation='horizontal'>
              <Field.Label> Category  <Field.RequiredIndicator /> </Field.Label>
              <Input name="category" variant="outline"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            </Field.Root>
            <Field.Root required orientation='horizontal'>
              <Field.Label> Image  <Field.RequiredIndicator /> </Field.Label>
              <Input name="image" variant="outline"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            </Field.Root>
            <Button w='full' colorScheme='blue' onClick={addProductHandler}
              disabled={newProduct.name == "" || newProduct.price == "" || newProduct.image == "" || newProduct.category == ""} >
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  )
}

