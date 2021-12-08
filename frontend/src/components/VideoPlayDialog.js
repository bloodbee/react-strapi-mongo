import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function VideoPlayDialog(props) {
  const cancelButtonRef = useRef(null);

  // first check video type
  let type = 'classic';
  if (props.video) {
    if (props.video.url.match(/youtube/m)) {
      type = 'youtube'
    } else if (props.video.url.match(/dailymotion/m)) {
      type = 'dailymotion'
    }
  }

  const getVideoSrcFormatted = () => {
    switch (type) {
      case 'youtube':
        return props.video.url.replace(/youtube\.com\/watch\?v=/m, 'youtube.com/embed/')
      case 'dailymotion':
        return props.video.url.replace(/dailymotion\.com/m, 'dailymotion.com/embed')
      case 'classic':
        return props.video.url;
      default:
        return props.video.url;
    }
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center w-full mx-auto">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 w-full mx-auto">
                      {props.video.title}
                    </Dialog.Title>
                    <div className="mt-2 h-96">
                      {type === 'youtube' && (
                        <iframe className="mx-auto" width="100%" height="400" src={getVideoSrcFormatted() + '?autoplay=1'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                      )}
                      {type === 'dailymotion' && (
                        <iframe title="Dailymotion video player" className="mx-auto h-full" frameBorder="0" type="text/html" src={ getVideoSrcFormatted() + '?autoplay=1'} width="100%" height="400" allow="autoplay"></iframe>
                      )}
                      {type === 'classic' && (
                        <video className="mx-auto h-full" width="100%" height="400" controls autoPlay>
                          <source src={getVideoSrcFormatted()} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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