import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box className="w-full flex justify-center">
        <img src={require("../../assets/commerce.jpg")} alt="" />
      </Box>
      <footer style={{ backgroundColor: "#5e35b1" }}>
        <Box className="text-xl flex  justify-center gap-12 py-3  text-white dark:text-white  ">
          <Box>
            <h1 className="font-bold text-5xl mt-5">OmniStock</h1>
            <h3 className="font-bold mt-5 mb-5">Contact</h3>
            <ul className="text-sm">
              <li>Address:fchdhhhdhdhdh</li>
              <li>Phone</li>
              <li>Hours</li>
            </ul>
          </Box>
          <Box className=" ml-12">
            <h3 className="font-bold mb-5 mt-5">About</h3>
            <ul className="text-sm">
              <li>
                <Link href="">About Omnistock</Link>
              </li>
              <li>
                <Link href="">Delivery Information</Link>
              </li>
              <li>
                <Link href="">Privacy Policy</Link>
              </li>
              <li>
                <Link href="">Term and Condition</Link>
              </li>
              <li>
                <Link href="">Contact Us</Link>
              </li>
            </ul>
          </Box>
          <Box className="ml-36">
            <h3 className="font-bold mb-5 mt-5">My account</h3>
            <ul className="text-sm">
              <li>
                <Link href="">Sign in</Link>
              </li>
              <li>
                <Link href="">View cart</Link>
              </li>
              <li>
                <Link href="">My Wishlist</Link>
              </li>
              <li>
                <Link href="">Track My Order</Link>
              </li>
              <li>
                <Link href="">Help</Link>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className="text-center">
          <h3 className="font-bold ">Follow us</h3>
          <Box className="flex justify-self-stretch gap-8 py-3 text-gray-600 dark:text-gray-400 place-content-center">
            <FacebookOutlinedIcon />
            <TwitterIcon />
            <InstagramIcon />
          </Box>
          <p>&copy; 2023 omnistock.com</p>
        </Box>
      </footer>
    </>
  );
};

export default Footer;
