// import necessary libraries
import React, { useState } from 'react';

// import Chakra UI components
import { Box, Heading, HStack, IconButton, Image, Text, Dialog, Portal, Button, CloseButton, Field, VStack, Input } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";

// import react icons
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { useProductStore } from '@/store';


export const ProductCard = ({ product }) => {

    const [isEditDialogOpen, setOpenEditDialog] = useState(false);
    const [isDeleteDialogOpen, setOpenDeleteDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image
    });

    const { updateProduct, deleteProduct } = useProductStore();

    const cancelUpdateHandler = () => {
        setOpenEditDialog(false);
        setNewProduct({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image
        });
    };

    const updateProductHandler = async (productId) => {
        if (newProduct.price <= 0)
            toaster.create({
                title: `price should be greater than 0`,
                type: 'error',
                duration: 5000
            });
        else {
            const { success, message } = await updateProduct(productId, newProduct);
            toaster.create({
                title: message,
                type: success ? 'success' : 'error',
                duration: 5000
            });
            if (success)
                setOpenEditDialog(false);
        }
    };

    const deleteProductHandler = async (productId) => {
        const { success, message } = await deleteProduct(productId);
        toaster.create({
            title: message,
            type: success ? 'success' : 'error',
            duration: 5000
        });
    };

    return (
        <Box
            padding={10}
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        >
            <Image h={40} minWidth={40} w='full' src={product.image} alt={product.name} objectFit='cover' />
            <Heading> {product.name} </Heading>
            <Text> {product.category} </Text>
            <Text> ${product.price} </Text>
            <HStack gap={2} justifyContent='left'>
                <IconButton variant="outline" colorPalette='blue' size='md' onClick={() => setOpenEditDialog(true)}>
                    <MdEdit />
                </IconButton>
                <IconButton variant="outline" colorPalette='red' size='md' onClick={() => setOpenDeleteDialog(true)}>
                    <RiDeleteBin6Line />
                </IconButton>
            </HStack>
            {/* Edit product dialog */}
            <Dialog.Root size='md' lazyMount open={isEditDialogOpen}
                onOpenChange={(e) => setOpenEditDialog(e.open)} onExitComplete={cancelUpdateHandler} >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit product details</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack gap={2} width='70%'>
                                    <Field.Root orientation='horizontal'>
                                        <Field.Label> Name </Field.Label>
                                        <Input name="name" variant="flushed"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                                    </Field.Root>
                                    <Field.Root orientation='horizontal'>
                                        <Field.Label> Price </Field.Label>
                                        <Input name="price" variant="flushed" type='number'
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                    </Field.Root>
                                    <Field.Root orientation='horizontal'>
                                        <Field.Label> Category </Field.Label>
                                        <Input name="category" variant="flushed"
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                                    </Field.Root>
                                    <Field.Root orientation='horizontal'>
                                        <Field.Label> Image </Field.Label>
                                        <Input name="image" variant="flushed"
                                            value={newProduct.image}
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                                    </Field.Root>
                                </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" onClick={cancelUpdateHandler}>Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button onClick={() => updateProductHandler(product._id)}>Save</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
            {/* Delete product dialog */}
            <Dialog.Root role="alertdialog" size='sm' lazyMount open={isDeleteDialogOpen}
                onOpenChange={(e) => setOpenDeleteDialog(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Are you sure?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <p>
                                    This action cannot be undone. This will permanently delete the
                                    product and remove it from the database.
                                </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button colorPalette="red" onClick={() => deleteProductHandler(product._id)}>Delete</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
            <Toaster />
        </Box>
    )
}
