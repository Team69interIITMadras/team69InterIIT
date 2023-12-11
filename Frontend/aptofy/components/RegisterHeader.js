import React from "react";

function Header() {
    return (
        <header class="bg-[#7776BC] p-4">
            <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center">
                    <img
                        src="logo.png" // Replace with logo
                        alt="Logo"
                        class="w-12 h-12 mr-4"
                    />
                </div>

                <div class="flex items-center space-x-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-white fill-current"
                        viewBox="0 0 24 24"
                    ></svg>
                    <a href="/login" class="text-white hover:text-gray-300">
                        Login
                    </a>
                    <a href="/signup" class="text-white hover:text-gray-300">
                        <span class="border border-blue-700 bg-blue-700 rounded-lg py-2 px-4">Signup</span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
