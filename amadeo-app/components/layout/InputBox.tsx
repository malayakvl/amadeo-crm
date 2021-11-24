import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import getConfig from "next/config";
import axios from 'axios';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/api`;

const InputBox: React.FC = ({} ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [imagePost, setImagePost] = useState<File>();

    async function sendPost (e: React.SyntheticEvent)  {
        e.preventDefault();

        if (!inputRef.current?.value) return;

        const formData = new FormData();
        formData.append('title', "Hello world!");
        if (imagePost) {
            formData.append('file', imagePost);
        }

        await axios.post(`${baseUrl}/upload`, formData, {
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
                console.log(res.statusText);
                inputRef.current && (inputRef.current.value = 'Data send successfully');
        });
    }

    const addImageToPost = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!filePickerRef.current?.files?.length) return;
        setImagePost(filePickerRef.current.files[0]);
    }

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <form className="flex flex-1">
                    <input type="text"
                       ref={inputRef}
                       className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                       placeholder="Something will be here"
                    />
                    <button type="submit" hidden onClick={sendPost} />
                </form>
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div onClick={() => filePickerRef.current?.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input ref={filePickerRef} type="file" onChange={addImageToPost} hidden/>
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox;
