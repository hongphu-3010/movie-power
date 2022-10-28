import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="pt-[3rem] border-t border-gray-700">
      <div className="max-w-[1000px] mx-auto mb-[6rem] px-[1rem] md:px-[2rem]">
        <div className="flex justify-between flex-wrap gap-y-[1rem] mb-[2rem]">
          <ul className="text-[1.4rem] w-[50%] lg:w-[33.3%] text-gray-300 md:text-[2rem]">
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Audio Description
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Investor Relations
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Legal Notices
              </Link>
            </li>
          </ul>
          <ul className="text-[1.4rem] w-[50%] lg:w-[33.3%] text-gray-300 md:text-[2rem]">
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Help center
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Job
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Cookie Preferences
              </Link>
            </li>
          </ul>
          <ul className="text-[1.4rem] lg:w-[33.3%] text-gray-300 md:text-[2rem]">
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Gifs Cards
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Terms of You
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-primary duration-200">
                Media Center
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between flex-col sm:flex-row">
          <h2 className="text-xl md:text-2xl lg:text-3xl w-[50%] lg:w-[33.3%]">
            {" "}
            © hongphu301020@gmail.com
          </h2>
          <div className="flex gap-[1rem] items-center w-[50%] lg:w-[33.3%]">
            <p className="text-xl md:text-2xl lg:text-3xl">Contact me</p>
            <a href="https://www.facebook.com/phu.hong.779205">
              <BsFacebook className="text-2xl md:text-4xl hover:cursor-pointer hover:scale-105 duration-300 hover:text-primary" />
            </a>
            <BsGithub className="text-2xl md:text-4xl hover:cursor-pointer hover:scale-105 duration-300 hover:text-primary" />
            <RiInstagramFill className="text-2xl md:text-4xl hover:cursor-pointer hover:scale-105 duration-300 hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
