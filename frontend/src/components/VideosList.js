import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './VideosList.css';

import VideoPlayDialog from './VideoPlayDialog';
import VideoEditDialog from './VideoEditDialog';

export default function VideosList() {

  const [videos, setVideos] = useState([]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [video, setVideo] = useState(null);

  /**
   * Call strapi api to load all videos from database
   */
  const loadVideos = () => {
    // search for public videos only
    axios.get('http://localhost:1337/videos').then(response => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    loadVideos();
  }, []);

  /**
   * Handle the open of the play dialog
   * @param {Video} video 
   */
  const handleVideoDialogOpen = (video) => {
    setVideo(video);
    setVideoOpen(true);
  }

  /**
   * Handle the open of the edit dialog
   * @param {Event} event 
   * @param {Video} video 
   */
  const handleVideoEditOpen = (event, video) => {
    event.stopPropagation();
    setVideo(video);
    setEditOpen(true);
  }

  /**
   * Close the dialog and use reload to jknow if we need to load videos fron strapi api again
   * @param {Boolean} reload 
   */
  const handleDialogClose = (reload) => {
    setVideoOpen(false);
    setEditOpen(false);
    // to prevent an error on the fragment rendering in the dialogs
    setTimeout(() => {
      setVideo(null);
      if (reload) loadVideos();
    }, 500)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 mx-0 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block w-full sm:w-4/5 sm:min-w-full max-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table data-testid="videos-table" id="videos-list" className="table-auto max-w-full divide-y divide-gray-200">
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Public
                  </th>
                  <th scope="col" className="w-1/4 relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {videos.length > 0 && videos.map((video) => (
                  <tr data-testid="videos-table-row" key={video.id} onClick={() => handleVideoDialogOpen(video)}>
                    <td className="w-1/4 sm:w-1/2 px-2 sm:px-6 py-4 whitespace-prewrap">
                      <div className="text-left text-sm text-gray-900">{video.title}</div>
                    </td>
                    <td className="w-1/4 sm:w-1/2 px-2 sm:px-6 py-4 whitespace-prewrap">
                      <div className="text-left text-sm text-gray-900">{video.slug}</div>
                    </td>
                    <td className="w-1/4 sm:w-1/4 px-2 sm:px-6 py-4 whitespace-prewrap">
                      <div className="text-left text-sm text-gray-900">{video.isPublic ? 'Yes' : 'No'}</div>
                    </td>
                    <td className="z-10 w-1/4 sm:w-1/3 px-2 sm:px-6 py-4 whitespace-prewrap text-right text-sm font-medium">
                      <button onClick={(event) => handleVideoEditOpen(event, video)} type="button" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <VideoPlayDialog isOpen={videoOpen && video.isPublic === true} video={video} closeVideoDialog={() => handleDialogClose(false)}></VideoPlayDialog>
      <VideoEditDialog isOpen={editOpen} video={video} closeVideoDialog={() => handleDialogClose(true)}></VideoEditDialog>
    </div>
  )
}
