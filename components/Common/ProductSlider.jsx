import {
    Box,
    Divider,
    Flex,
    Icon,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import ScreenSize from "../layouts/ScreenSize";
import ProductBox from "./ProductBox";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <Icon
            aria-label="Next"
            color="accent_2"
            as={BsChevronRight}
            onClick={onClick}
            position="absolute"
            top="50%"
            right={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={["20px", "30px"]}
            cursor={"pointer"}
        />
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <Icon
            aria-label="Previous"
            color="accent_2"
            as={BsChevronLeft}
            onClick={onClick}
            position="absolute"
            top="50%"
            left={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={["20px", "30px"]}
            cursor={"pointer"}
        />
    );
};

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 820,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },

        {
            breakpoint: 560,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

const ProductSlider = ({ section, productDatas, children }) => {
    return (
        <ScreenSize>
            <Box
                mt={["80px", null, null, "100px"]}
                mb={["40px", null, null, "80px"]}
            >
                <Text
                    color="accent_2"
                    fontSize={["16px", null, "40px"]}
                    mb="12px"
                    fontWeight={600}
                >
                    {section}
                </Text>
                <Divider />
            </Box>

            <Box>
                {productDatas && productDatas === null ? (
                    <Text> Products not Available </Text>
                ) : (
                    <Slider {...settings}>
                        {productDatas && productDatas.length > 0 &&
                            productDatas.map((productData, i) => {
                                return (
                                    <ProductBox
                                        key={i}
                                        productData={productData}
                                    />
                                );
                            })}
                    </Slider>
                )}
            </Box>
        </ScreenSize>
    );
};

export default ProductSlider;
