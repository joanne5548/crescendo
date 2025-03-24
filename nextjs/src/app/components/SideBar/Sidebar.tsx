"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { SelectedTopicAtom } from "../../lib/atoms";
import { TopicList } from "@/app/lib/types";
import TopicButton from "./TopicButton";

const Sidebar = () => {
    const [shrink, setShrink] = useState<boolean>(true);

    // Maybe also do animation! (ease-in-out and duration-300?)
    const handleShrinkButtonClick = () => {
        setShrink(!shrink);
    };

    return (
        <div className="flex flex-col shrink-0 gap-8 h-full p-2 ease-in-out duration-300">
            {shrink ? (
                <>
                    <div className="flex flex-row items-center gap-3 mt-4">
                        <Image
                            src={"/images/logo.png"}
                            className="rounded-xl"
                            alt="logo"
                            width={36}
                            height={36}
                        />
                        <Link
                            href="/"
                            className="text-white text-2xl font-medium"
                        >
                            Crescendo
                        </Link>
                        <button
                            onClick={handleShrinkButtonClick}
                            className="p-2 rounded-lg hover:cursor-pointer hover:bg-slate-800"
                        >
                            <FaAngleDoubleLeft className="text-white size-4 stroke-[5]" />
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg text-white px-3 py-2 hover:cursor-default">
                            Topics
                        </div>
                        {TopicList.map((topic) => (
                            <TopicButton topic={topic} key={topic} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={handleShrinkButtonClick}
                        className="p-2 rounded-lg mt-4 hover:cursor-pointer hover:bg-slate-800"
                    >
                        <FaAngleDoubleRight className="text-white size-4 stroke-[5]" />
                    </button>
                </>
            )}
        </div>
    );
};

export default Sidebar;
