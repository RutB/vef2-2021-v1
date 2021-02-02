const fs = require('fs');
const util = require('util');
const express = require('express');

const router = express.Router();

const readFileAsync = util.promisify(fs.readFile);

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const getVideos = async (url) => readFileAsync(url);

const getVideoById = async (url, id) => {
  const data = await getVideos(url);
  const { videos } = JSON.parse(data);
  const video = videos.filter((x) => parseInt(x.id, 10) === parseInt(id, 10));
  if (video.length === 0) throw new Error('Fannst ekki');
  return video[0];
};

function videoByIdList(req, res) {
  const title = 'Fræðslumyndbandleigan';
  const { id } = req.params;
  getVideoById('./videos.json', id).then((v) => {
    res.render('video', { title, video: v });
  }).catch((err) => {
    res.status(404);
    res.render('error', { title: err.message });
  });
}

async function list(req, res) {
  const title = 'Fræðslumyndbandleigan';
  let videos = getVideos('./videos.json').then((data) => {
    videos = JSON.parse(data);
    res.render('index', { title, videos });
  }).catch(() => {
    videos = false;
    res.render('index', { title, videos });
  });
}

router.get('/', catchErrors(list));
router.get('/:id', videoByIdList);

module.exports = router;
