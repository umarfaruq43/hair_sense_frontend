import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    Input,
    Flex,
    Button,
} from "@chakra-ui/react";
import { PrimaryButton } from "../Common";
import { SecondaryButton } from "../Common/Button";
import { baseUrl, httpPost } from "@/http-request/http-request";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const NewSubModal = ({ isOpen, onOpen, onClose }) => {
    // console.log(cate)
    const initalData = {
        category: "",
        name: "",
    };

    const [newCategory, setNewCategory] = useState(initalData);
    const [lodaing, setLodaing] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const accesToken = Cookies.get("access_token");

    // Desstructure the data state
    const { category, name } = newCategory;

    const handleSubmit = async (e) => {
        setLodaing(true);
        e.preventDefault();
        const formData = {
            category: category,
            name: name,
        };

        await httpPost(`${baseUrl}/store/sub_categories/`, formData, {
            headers: {
                Authorization: `Bearer ${accesToken}`,
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    toast.success("Sub Category successfully created");
                    // Close the modal
                    onClose();
                    // Reset the state to initial
                    setNewCategory(initalData);
                    setLodaing(false);
                }
            })
            .catch((error) => {
                setLodaing(false);

                console.log(error);
            })
            .finally(() => {
                setLodaing(false);
            });

        // // alert(JSON.stringify(formData));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent
                rounded="0px"
                overflow="hidden"
                px="8px"
                bgColor="transparent"
                shadow={"none"}
            >
                <ModalBody bgColor="white" rounded="24px" shadow="sm" py="57px">
                    <Text fontWeight="600" fontSize={["19px"]}>
                        Sub-Category
                    </Text>

                    <Box mt={["14px"]}>
                        <form>
                            <Input
                                type="text"
                                required
                                bgColor={"shades_10"}
                                py="14px"
                                placeholder="Input the id of the sub-category"
                                value={category}
                                name="category"
                                onChange={handleChange}
                                _focusVisible={{}}
                            />

                            <Input
                                mt="16px"
                                type="text"
                                required
                                bgColor={"shades_10"}
                                py="14px"
                                placeholder="Input the name of the sub-category"
                                value={name}
                                name="name"
                                onChange={handleChange}
                                _focusVisible={{}}
                            />

                            <Flex
                                mt="20px"
                                align="center"
                                justify="center"
                                gap="20px"
                            >
                                <SecondaryButton
                                    text="Cancel"
                                    maxW="130px"
                                    color="accent_2"
                                    handleButton={onClose}
                                />
                                <PrimaryButton
                                    maxW="130px"
                                    text="Save"
                                    handleButton={handleSubmit}
                                    py="30px"
                                    type="submit"
                                    isLoading={lodaing}
                                />
                            </Flex>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default NewSubModal;
