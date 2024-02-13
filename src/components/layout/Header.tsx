"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AccountDropDown from "../AccountDropdown";
import { getSessionData } from "@/redux/auth/AuthActions";

const Header = () => {
  const [fixer, setfixer] = useState<boolean>(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkScroll = () => {
      setfixer(window.scrollY > 10);
    };
    window.addEventListener("scroll", checkScroll);
  }, [fixer]);

  const menu = [
    { name: "About", link: "/about" },
    { name: "Events", link: "/events" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    dispatch(getSessionData());
  }, [isAuthenticated]);

  return (
    <Fragment>
      <header className={`neoh_fn_header ${fixer ? "fixer" : ""}`}>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={75}
                  height={75}
                  alt="One Kingdom Logo"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </Link>
              <div className="menu">
                <ul className="flex ml-12">
                  {menu.map((item, index) => (
                    <li key={index} className={index !== 0 && index !== menu.length - 1 ? "mx-4" : ""}>
                      <Link href={item.link}>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {isAuthenticated ? (
                <AccountDropDown />
              ) : (
                <Link href="/login">
                  <button className="neoh_fn_btn">Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
