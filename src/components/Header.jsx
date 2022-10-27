import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { TiVideoOutline } from "react-icons/ti";
import { RiMovie2Line } from "react-icons/ri";
import { UserAuth } from "../context/authContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, logOut } = UserAuth();
  const [name, setName] = useState("");
  useEffect(() => {
    const setUser = async () => {
      await onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setName(doc.data()?.name);
      });
    };
    setUser();
  }, [user?.email]);
  // const name = useSelector((state) => state.nameUser.name);
  // const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {}
  };

  const headerNav = useRef([
    {
      case: "Home",
      path: "/",
      icon: <AiOutlineHome size={24} className="md:hidden" />,
    },
    {
      case: "Movie",
      path: "/movie",
      icon: <BiMoviePlay size={24} className="md:hidden" />,
    },
    {
      case: "TV Shows",
      path: "/tv",
      icon: <TiVideoOutline size={24} className="md:hidden" />,
    },
  ]);

  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const pathActive = headerNav.current.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const scrollHeader = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        headerRef.current.classList.add("scrollHeader");
      } else {
        headerRef.current.classList.remove("scrollHeader");
      }
    };
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="fixed h-[5rem] md:h-header-height top-0 left-0 w-full transition-height_bg ease-in duration-300 z-[99] "
    >
      <div className="container-wrap flex h-full px-8 justify-between">
        <div className="flex items-center">
          <RiMovie2Line
            size={38}
            className="md:w-[50px] w-[24px] object-center  rounded-full md:mr-[10px] mr-[5px]"
          />
          <Link
            to="/"
            className="text-3xl md:text-3xl lg:text-4xl font-bold flex items-center"
          >
            <p className="mr-[5px]">POWER</p>{" "}
            <p className="text-[#8e2e2e]">MV</p>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="fixed h-[5rem] md:h-auto bottom-0 left-0 w-full bg-black px-8 flex items-center justify-between font-bold lg:font-semibold md:unsetPos md:justify-end md:gap-[2rem] ">
            {headerNav.current.map((item, i) => (
              <li
                key={i}
                id="header_nav"
                className={`${
                  pathActive === i ? "activeClassName" : null
                } hover:text-primary flex gap-[1rem] justify-center items-center text-2xl md:text-3xl lg:text-4xl relative duration-500`}
              >
                {" "}
                {item.icon}
                <Link to={item.path}>{item.case}</Link>
              </li>
            ))}
          </ul>
          {/* //// */}
          {user?.email ? (
            <div className="ml-[2rem]">
              <Link to="/account">
                <button className="text-white pr-4 text-2xl md:text-[1.8rem]">
                  {name}
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-6 py-4 rounded text-white text-2xl md:text-[1.8rem]"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="ml-[2rem]">
              <Link to="/login">
                <button className="text-white pr-4 text-2xl md:text-[1.8rem] md:py-[0.8rem]">
                  Sing In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-red-600 px-6 py-2 md:py-[0.8rem] rounded text-white text-2xl md:text-[1.8rem]">
                  Sing Up
                </button>
              </Link>
            </div>
          )}
          {/* //// */}
        </div>
      </div>
    </div>
  );
};

export default Header;
