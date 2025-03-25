"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    FaAngleDoubleDown,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleDoubleUp,
} from "react-icons/fa";
import { TopicList } from "@/app/lib/types";
import TopicButton from "./TopicButton";

const Sidebar = () => {
    const [shrink, setShrink] = useState<boolean>(true);

    // Maybe also do animation! (ease-in-out and duration-300?)
    const handleShrinkButtonClick = () => {
        setShrink(!shrink);
    };

    return (
        <div className="flex flex-col shrink-0 sm:gap-8 sm:h-full p-2 pb-0 sm:pb-2 sm:pr-0 ease-in-out duration-300">
            {shrink ? (
                <>
                    <div className="flex flex-row justify-between sm:justify-start items-center gap-3 p-2 sm:p-0 sm:mt-4">
                        <Image
                            src={"/images/logo.png"}
                            className="hidden sm:block rounded-xl"
                            alt="logo"
                            width={36}
                            height={36}
                        />
                        <Link
                            href="/"
                            className="text-white text-xl sm:text-2xl font-medium"
                        >
                            Crescendo
                        </Link>
                        <button
                            onClick={handleShrinkButtonClick}
                            className="p-2 rounded-lg hover:cursor-pointer hover:bg-slate-800"
                        >
                            <FaAngleDoubleLeft className="hidden sm:block text-white size-4 stroke-[5]" />
                            <FaAngleDoubleUp className="sm:hidden text-white size-4 stroke-[5" />
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <div className="hidden sm:block text-lg text-white px-3 py-2 hover:cursor-default">
                            Topics
                        </div>
                        {TopicList.map((topic) => (
                            <TopicButton topic={topic} key={topic} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex justify-between sm:justify-start items-center p-2 pb-0 sm:p-0">
                    <Link
                        href="/"
                        className="sm:hidden text-white text-xl sm:pl-0 sm:text-2xl font-medium"
                    >
                        Crescendo
                    </Link>
                    <button
                        onClick={handleShrinkButtonClick}
                        className="p-2 rounded-lg sm:mt-4 hover:cursor-pointer hover:bg-slate-800"
                    >
                        <FaAngleDoubleRight className="hidden sm:block text-white size-4 stroke-[5]" />
                        <FaAngleDoubleDown className="sm:hidden text-white size-4 stroke-[5]" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
