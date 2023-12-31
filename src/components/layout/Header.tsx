"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
  const [fixer, setfixer] = useState<boolean>(false);

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

  return (
    <Fragment>
      <header className={`neoh_fn_header ${fixer ? "fixer" : ""}`}>
        <div className="container">
          <div className="header_in">
            <div className="logo">
              <Link href="/">
                <Image src="/logo.png" width={75} height={75} alt="One Kingdom Logo" />
              </Link>
            </div>
            <div className="menu">
              <ul className="flex ">
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
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
