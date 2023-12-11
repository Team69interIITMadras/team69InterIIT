import React from "react";
import MODULE_ADDRESS from "../common/constants";
import { Provider, Network } from "aptos"; 
import { useWallet } from "@aptos-labs/wallet-adapter-react";


const SongDisplayCard = ({ title, imageSrc, starRating, genres }) => {
    
    return (
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
            <div class="flex">
                <div class="flex-shrink-0 w-1/4">
                    <img src={imageSrc} alt="song" class="w-full h-auto rounded-md" />
                </div>

                <div class="ml-4 flex-grow">
                    <div class="flex items-center mb-2">
                        <span class="text-yellow-400 text-xl">{starRating} stars</span>
                    </div>
                    <p class="text-gray-600">{title}</p>

                    <div class="mt-4">
                        <h3 class="text-lg font-semibold mb-2">Genre:</h3>
                        <div class="flex space-x-2 overflow-x-auto">
                            {genres?.map((genre, index) => (
                                <div key={index} class="px-2 py-1 bg-gray-200 rounded-md">
                                    {genre}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDisplayCard;
