/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiLogout } from "react-icons/hi";
import { fadeInOutWithOpacity, slideUpDownMenu } from "../animations";
import { auth } from "../config/firebase.config";
import { useQueryClient } from "react-query";
import { adminIds } from "../utils/helpers";

const Header = ({ data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const signOutUser = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 lg:px-8 shadow-md bg-white dark:bg-gray-700 z-50 gap-12 sticky top-0">
      {/* logo */}
      <Link to="/">
        <p className="text-2xl text-gray-700 dark:text-gray-300">KBC Quiz</p>
      </Link>
      {/* profile */}
      <AnimatePresence>
        <React.Fragment>
          <motion.div
            {...fadeInOutWithOpacity}
            className="relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {data?.photoURL ? (
              <div className="h-12 w-12 rounded-full relative flex items-center justify-center cursor-pointer">
                <img
                  src={data?.photoURL}
                  className="h-full w-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  alt="Profile"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                <p className="text-white text-2xl uppercase">
                  {data?.email[0]}
                </p>
              </div>
            )}
            {/* dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  {...slideUpDownMenu}
                  className="absolute px-4 py-3 rounded-md bg-white right-0 top-14 flex flex-col items-center justify-start gap-3 w-64 pt-4"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {data?.photoURL ? (
                    <div className="h-20 w-20 rounded-full relative flex flex-col items-center justify-center cursor-pointer">
                      <img
                        src={data?.photoURL}
                        className="h-full w-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                        alt="Profile"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md cursor-pointer">
                      <p className="text-white text-3xl uppercase">
                        {data?.email[0]}
                      </p>
                    </div>
                  )}
                  {data?.displayName && (
                    <p className="text-2xl text-txtDark">{data?.displayName}</p>
                  )}
                  {/* menu */}
                  <div className="w-full flex flex-col items-start gap-8 pt-6">
                    <Link
                      className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                      to={`/profile/${data?.uid}`}
                    >
                      My Account
                    </Link>
                    {adminIds.includes(data?.uid) && (
                      <Link
                        className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                        to={"/quiz"}
                      >
                        Start Quiz
                      </Link>
                    )}
                    <div
                      className="w-full p-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer"
                      onClick={signOutUser}
                    >
                      <p className="group-hover:text-txtDark text-txtLight">
                        Sign Out
                      </p>
                      <HiLogout className="group-hover:text-txtDark text-txtLight" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </React.Fragment>
      </AnimatePresence>
    </header>
  );
};

export default Header;
