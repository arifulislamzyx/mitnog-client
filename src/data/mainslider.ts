import img1 from "../../public/assets/bannerImage1.jpeg";
import img2 from "../../public/assets/bannerImage2.jpeg";
import img3 from "../../public/assets/bannerImage3.jpeg";
import img4 from "../../public/assets/bannerImage4.jpeg";

export interface sliderItem {
  id: number;
  bg: string;
  title: String;
}

const mainSlider: sliderItem[] = [
  {
    id: 1,
    bg: img1,
    title: "Main Slider Banner",
  },
  {
    id: 2,
    bg: img2,
    title: "Banner 2",
  },
  {
    id: 3,
    bg: img3,
    title: "Banner 3",
  },
  {
    id: 4,
    bg: img4,
    title: "Banner 3",
  },
];

export default mainSlider;
