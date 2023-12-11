import React from "react";

export const noPage = () => {
    return (
        <div class={`h-screen flex items-center justify-center`}>
            <div class={` h-screen flex flex-col items-center justify-center`}>
                <div class="tracking-widest mt-4 text-center">
                    <span class="text-gray-500 text-6xl block">
                        <span>4 0 4</span>
                    </span>
                    <span class="text-gray-500 text-xl">Sorry, We couldn't find what you are looking for!</span>
                </div>
                <div class="mt-6">
                    <a href="/" class="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
                        Go back
                    </a>
                </div>
            </div>
        </div>
    );
};

export default noPage;
