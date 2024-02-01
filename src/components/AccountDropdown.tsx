import { motion, useCycle } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logoutUser } from "@/redux/auth/AuthActions";
import Link from "next/link";
const MenuButton = ({ onClick, isOpen, img, username }: { onClick: () => void; isOpen: boolean; img: string, username: string }) => {
  return (
    <motion.button className="flex justify-between items-center" onClick={onClick} animate={isOpen ? "open" : "closed"} initial={false}>
      <Avatar className="h-8 w-8 truncate border border-border">
        <AvatarImage src={img} alt={``} />
        {/* <AvatarFallback>{user.username.at(0)}</AvatarFallback> */}
      </Avatar>
      <span className="ml-4">{username}</span>
    </motion.button>
  );
};

const slideVerticalAnimation = {
  open: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      mass: 0.8,
      type: "spring",
    },
    display: "block",
  },
  close: {
    rotateX: -15,
    y: -320,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const App = () => {
  const [isOpen, toggleDropdown] = useCycle(false, true);
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="relative">
      <MenuButton onClick={toggleDropdown} isOpen={isOpen} img={session.profileImage} username={session.username} />
      <motion.div
        className="rounded-md shadow-lg overflow-x-hidden absolute transition-height w-52 z-50 overflow-y-hidden border bg-white mt-4 "
        initial="close"
        animate={isOpen ? "open" : "close"}
        variants={slideVerticalAnimation}
      >
        <motion.div className="flex flex-col text-base h-full relative ">
          <ul className="list-none flex  flex-col justify-between">
            <li className="flex-1 text-center cursor-pointer leading-16 transition-all duration-200 hover:bg-slate-50 hover:text-dark text-black">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li
              className="flex-1 text-center cursor-pointer leading-16 transition-all duration-200 hover:bg-slate-50 hover:text-dark text-black"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
