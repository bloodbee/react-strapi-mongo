import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import axios from 'axios';
const slugify = require('slugify')

export default function VideoEditDialog(props) {
  const cancelButtonRef = useRef(null);

  // base datas
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    // initialize datas
    if (props.video) {
      setTitle(props.video.title);
      setUrl(props.video.url);
      setIsPublic(props.video.isPublic);
      setSlug(props.video.slug);
    }
  }, [props.video])

  const handleUpdateTitle = (event) => {
    // update the slug according to the new title
    setSlug(slugify(event.target.value, {
      lower: true,
      remove: /[*+~.()'"!:@]/g
    }))
    // update the title
    setTitle(event.target.value);
  }

  const handleUpdate = () => {
    // use strapi api to update video
    axios
    .put(`http://localhost:1337/videos/${props.video.id}`, {
      title,
      url,
      isPublic: JSON.parse(isPublic)
    })
    .then(response => {
      // close the dialog and invoke parent callback
      props.closeVideoDialog();
    });
    
  }

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      { props.video && (
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.closeVideoDialog}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="mb-10 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center w-full mx-auto">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 w-full mx-auto">
                      Edit Video
                    </Dialog.Title>
                    <div className="mt-2 h-96">
                    <form action="#" className="">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div className="grid grid-cols-1 gap-6">
                            <div className="sm:col-span-1">
                              <label htmlFor="id" className="font-extrabold block text-sm text-gray-700">
                                ID
                              </label>
                              <input
                                type="text"
                                name="id"
                                id="id"
                                autoComplete="id"
                                disabled
                                value={props.video.id}
                                className="bg-gray-300 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label htmlFor="slug" className="font-extrabold block text-sm text-gray-700">
                                Slug
                              </label>
                              <input
                                type="text"
                                name="slug"
                                id="slug"
                                autoComplete="slug"
                                disabled
                                value={slug}
                                className="bg-gray-300 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label htmlFor="title" className="font-extrabold block text-sm text-gray-700">
                                Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                autoComplete="title"
                                value={title}
                                onChange={handleUpdateTitle}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label htmlFor="url" className="font-extrabold block text-sm text-gray-700">
                                Url
                              </label>
                              <input
                                type="text"
                                name="url"
                                id="url"
                                autoComplete="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="sm:col-span-1">
                              <label className="font-extrabold block text-sm text-center text-gray-700">
                                Is public
                              </label>
                              <div className="flex flex-row justify-around w-full">
                                <div className="flex flex-row">
                                  <input
                                    type="radio"
                                    name="isPublic"
                                    id="isPublicTrue"
                                    value="true"
                                    checked={isPublic}
                                    onChange={() => setIsPublic(true)}
                                    className="mr-4 mt-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                  True
                                </div>
                                <div className="flex flex-row">
                                  <input
                                    type="radio"
                                    name="isPublic"
                                    id="isPublicFalse"
                                    value="false"
                                    checked={!isPublic}
                                    onChange={() => setIsPublic(false)}
                                    className="mr-4 mt-1 focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                  False
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={props.closeVideoDialog}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      )}
    </Transition.Root>
  )
}