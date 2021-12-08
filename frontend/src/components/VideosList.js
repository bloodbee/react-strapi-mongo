import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './VideosList.css';

import VideoDialog from './VideoDialog';

export default function VideosList() {

  const [videos, setVideos] = useState([]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // search for public videos only
    axios.get('http://localhost:1337/videos?isPublic=true').then(response => {
      setVideos(response.data);
    });
  }, []);

  const handleVideoDialogOpen = (video) => {
    setVideo(video);
    setVideoOpen(true);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 mx-0 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block w-full sm:w-4/5 sm:min-w-full max-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table id="videos-list" className="table-auto max-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slug
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Public
                  </th> */}
                  <th scope="col" className="w-1/4 relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.length > 0 && videos.map((video) => (
                  <tr key={video.id} onClick={() => handleVideoDialogOpen(video)}>
                    <td className="w-1/4 px-6 py-4 whitespace-prewrap">
                      <div className="text-left text-sm text-gray-900">{video.title}</div>
                    </td>
                    <td className="w-1/4 px-6 py-4 whitespace-prewrap">
                      <div className="text-left text-sm text-gray-900">{video.slug}</div>
                    </td>
                    <td className="w-1/4 px-6 py-4 whitespace-prewrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <VideoDialog isOpen={videoOpen} video={video} closeVideoDialog={() => setVideoOpen(false)}></VideoDialog>
    </div>
  )
}
