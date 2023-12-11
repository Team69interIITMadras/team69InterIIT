import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import SongDisplayCard from "../components/songDisplayCard";

const AuthorPage = ({ className = "" }) => {
    useEffect(() => {
        async function fetchData() {
            try {
                //fetchData logic
            } catch (error) {
                console.error("Axios error:", error);
            }
        }

        fetchData();
    }, []);

    const renderSidebar = () => {
        return (
            <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
                <p className="text-neutral-500 dark:text-neutral-400">{userData.email}</p>

                <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

                {/* ---- */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="text-neutral-6000 dark:text-neutral-300">{userData.starRating}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                    </div>

                    <div className="flex items-center space-x-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-neutral-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection1 = () => {
        return (
            <div className="">
                <div>
                    <h2 className="text-2xl font-semibold">{userData.name}'s creations</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">Here are all your songs</span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                <div>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 overflow-x-auto">
                            {categories.map((item) => (
                                <Tab key={item} as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                                                selected
                                                    ? "bg-secondary-900 text-secondary-50 "
                                                    : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            } `}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="">
                                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                                    {userData
                                        .filter((_, i) => i < 4)
                                        .map(
                                            //edit and handle data here
                                            (user) => (
                                                <SongDisplayCard
                                                    title={user.title}
                                                    imageSrc={user.imageSrc}
                                                    starRating={user.starRating}
                                                    genre={user.genre}
                                                />
                                            ),
                                        )}
                                </div>
                                <div className="flex mt-11 justify-center items-center">
                                    <button>Show me more</button>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
            <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
                </div>
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
                    {renderSection1()}
                </div>
            </main>
        </div>
    );
};

export default AuthorPage;
