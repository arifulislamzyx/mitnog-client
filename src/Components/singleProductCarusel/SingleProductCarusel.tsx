import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Providers/AuthProviders";
import UseCart from "@/Hooks/useCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompressIcon from "@mui/icons-material/Compress";
import ShareIcon from "@mui/icons-material/Share";
import Swal from "sweetalert2";
import { Product } from "@/types/product";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SingleProductCaruselProps {
  products: Product[];
}

const SingleProductCarusel: React.FC = ({
  products,
}: SingleProductCaruselProps) => {
  const { _id, name, img, price, rating } = products[0] || {};

  // const navigate:AppRouterInstance = useRouter();
  const { user } = useContext(AuthContext);
  const { cart, refetch } = UseCart();
  const textMaxLength = 10;
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength)}...`;
  };

  const handleAddToCart = (products: Product) => {
    if (user && user.email) {
      const cartItem = {
        productId: _id,
        name,
        img,
        price,
        email: user.email,
      };

      fetch("https://mitnog-server.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your cart has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: "Please Login to Order Products",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Login Now",
            }).then((result) => {
              if (result.isConfirmed) {
                // navigate.push("/login", { query: { from: location } });
              }
            });
          }
        });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
        },
      },
    ],
  };
  return (
    <div className="bg-white border">
      <p className="text-2xl pt-5 md:ml-4 sm:ml-2">Related Items</p>
      <div
        className="bg-white rounded w-full max-w-[1050px] mx-auto relative 
    md:w-[750px] sm:m-auto "
      >
        <Slider {...settings}>
          {products.map((product) => (
            <Box
              component="div"
              key={product._id}
              className="max-w-[450px] p-5 bg-white rounded-xl "
            >
              <Card sx={{ maxWidth: 345 }}>
                <Box
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
                  style={{ position: "relative" }}
                >
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="140"
                    image={product.img}
                    className="transition duration-700 ease-in-out transform hover:scale-105"
                  />
                  {hovered && (
                    <Box
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "85%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Button className="bg-white text-black border-red-100 m-1 ">
                        <FavoriteBorderIcon />
                      </Button>
                      <Button className="bg-white text-black m-1 ">
                        <CompressIcon />
                      </Button>
                      <Button className="bg-white text-black m-1">
                        <ShareIcon />
                      </Button>
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Link href={`/all-products/${product._id}`}>
                    <Typography gutterBottom variant="h6" component="div">
                      {truncateText(product.name, textMaxLength)}
                    </Typography>
                  </Link>
                  <Rating></Rating>
                  <p className="ml-1">$ {product.price}</p>
                </CardContent>
                <CardActions className="flex justify-center">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    variant="outlined"
                    className="items-center rounded-2xl hover:bg-orange-500 hover:text-white "
                  >
                    <span className="transition duration-700 ease-in-out transform hover:scale-105">
                      Add To Cart
                    </span>
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Slider>
      </div>
    </div>
    // <>
    //   <Swiper
    //     slidesPerView={4}
    //     spaceBetween={30}
    //     modules={[Pagination, Navigation]}
    //     className="mySwiper"
    //   >

    //    <div className='"bg-white rounded w-full max-w-[1050px] mx-auto relative
    // md:w-[750px] sm:m-auto'>
    //   <Slider {...settings}>
    //    {products.map(product =>(
    //     <SwiperSlide  key={product._id}>

    //   <Card sx={{ maxWidth: 345 }}>
    //     <CardMedia
    //       component="img"
    //       alt="green iguana"
    //       height="140"
    //       image={product.img}
    //     />
    //     <CardContent>
    //       <Link href={`/all-products/${product._id}`}>
    //         <Typography gutterBottom variant="h5" component="div">
    //           {truncateText(product.name, textMaxLength)}
    //         </Typography>
    //       </Link>
    //       <Rating></Rating>
    //     </CardContent>
    //     <Typography variant='overline' className="ml-4">${product.price}</Typography>
    //     <CardActions>
    //       <Button
    //         onClick={() => handleAddToCart(product)}
    //         variant="contained"
    //         className="bg-blue-600"
    //       >
    //         Add To Cart
    //       </Button>
    //     </CardActions>
    //   </Card>

    // </SwiperSlide>
    //   ))}
    //   </Slider>
    //    </div>
    //   </Swiper>
    // </>
  );
};

export default SingleProductCarusel;
