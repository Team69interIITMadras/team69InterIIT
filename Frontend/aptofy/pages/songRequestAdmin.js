import { React, useState } from "react";
import SongRequestCard from "../components/songRequestCard";
import axios from "axios";

export const songRequestAdmin = async () => {
    const [formData, setFormData] = useState({
        imageSrc: "",
        description: "",
        genres: [],
    });

    const handleRadioChange = (e) => {
        formData.filter = e.target.value;
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;

        if (e.target == "genres") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                genres: checked ? [...prevFormData.genres, id] : prevFormData.genres.filter((item) => item !== id),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                starRating: checked
                    ? [...prevFormData.starRating, id]
                    : prevFormData.starRating.filter((item) => item !== id),
            }));
        }
    };


    return (
        <div class="flex flex-col min-h-screen">
            <div class="flex flex-1 ">
                <div class="bg-[#A0BFE0] h-screen p-4 w-1/6">
                    <div class="max-w-xs">
                        <div class="mb-4">
                            <h2 class="text-lg font-semibold">Sort By</h2>
                            <div>
                                <label class="flex items-center">
                                    <input
                                        type="radio"
                                        name="fSort"
                                        value="popular"
                                        class="mr-2"
                                        onChange={handleRadioChange}
                                    />{" "}
                                    Popular artist first
                                </label>
                                <label class="flex items-center">
                                    <input
                                        type="radio"
                                        name="fRating"
                                        value="highest-rated"
                                        class="mr-2"
                                        onChange={handleRadioChange}
                                    />{" "}
                                    Artist
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h2 class="text-lg font-semibold">Artist Star Rating</h2>
                        <div>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2"
                                    value="5-star"
                                    id="5star"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                5 Star
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2"
                                    value="4-star"
                                    id="4star"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                4 Star
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2"
                                    value="3-star"
                                    id="3star"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                3 Star
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2"
                                    value="2-star"
                                    id="2star"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                2 Star
                            </label>
                            <label class="flex items-center">
                                <input
                                    type="checkbox"
                                    class="mr-2"
                                    value="1-star"
                                    id="1star"
                                    onChange={handleCheckboxChange}
                                />{" "}
                                1 Star
                            </label>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h2 class="text-lg font-semibold">Genres</h2>
                        <div>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="pop" id="" onChange={handleCheckboxChange} />{" "}
                                Pop
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="rock" onChange={handleCheckboxChange} /> Rock
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="Indie" onChange={handleCheckboxChange} />{" "}
                                Indie
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="soothing" onChange={handleCheckboxChange} />{" "}
                                Soothing
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2" value="metal" onChange={handleCheckboxChange} />{" "}
                                Metal
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="hover:shadow-form rounded-md bg-[#008000] py-3 px-8 text-base font-semibold text-white outline-none"
                            onClick={filter}
                        >
                            Apply
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto justify-center items-center bg-slate-600 mr-0">
                    <SongRequestCard
                        imageSrc={formData.imageSrc}
                        description={formData.description}
                        genres={formData.genres}
                    />
                </div>
            </div>

        </div>
    );
};

export default songRequestAdmin;
