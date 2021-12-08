'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const datas = [
  {
    title: "Video presentation Stella",
    url: "http://localhost:3000/video-stella-presentation.mp4",
    isPublic: true
  },
  {
    title: "Rick Astley",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublic: true
  },
  {
    title: "Darude Sandstorm",
    url: "https://www.dailymotion.com/video/x2xnps",
    isPublic: true
  },
]

module.exports = () => {
  // add videos
  datas.forEach((data) => {
    strapi.query("videos").create(data);
  })

};
