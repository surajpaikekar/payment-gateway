import { Component } from 'react';
import sharedImage from './profile.jpg';
import coverImage from './phonePeCoverImage.png';

export default class AboutMe extends Component {
    render() {
        return (
            <div className="max-w-[1200px] mx-auto p-5">
                <div className='relative mb-15'>
                    <img 
                        src={coverImage} 
                        alt="cover image"
                        className='w-full h-[400px] object-cover rounded-[20px]' 
                    />
                    <img 
                        src={sharedImage}
                        alt="profile image" 
                        className='w-[150px] h-[150px] left-[38%] rounded-full border-4 border-white absolute bottom-[-50px] translate-x-1/2 shadow-md'
                    />
                </div>

                <div className='text-center py-16'>
                    <h1 className='text-2xl text-gray-800 mb-2.5'>Suraj Paikekar</h1>
                    <p className='text-lg text-gray-600 mb-7'>sbppaikekar@gmail.com</p>
                </div>

                <div className='max-w-[800px] mx-auto p-5 -mt-10 mb-10 bg-gray-100 rounded-2xl'>
                    <h2 className='text-center text-xl font-medium text-black mb-2'>
                        About Me
                    </h2>

                    <p className='text-center leading-[1.6] text-gray-700'>
                        Welcome to my portfolio! I am a passionate developer dedicated to creating 
                        amazing web experiences. With expertise in modern web technologies, 
                        I focus on building efficient and user-friendly applications.
                    </p>
                </div>
            </div>
        );
    }
}
