function igdbCoverImgSrcForId(igdb_cover_img_id) {
  let baseUrl = 'https://images.igdb.com/igdb/image/upload/t_';
  let imageType = 'cover_small';
  let fileType = '.jpg';
  const src = `${baseUrl}${imageType}/${igdb_cover_img_id}${fileType}`;

  return src;
}

function igdbHeroImgSrcForId(igdb_cover_img_id) {
  let baseUrl = 'https://images.igdb.com/igdb/image/upload/t_';
  let imageType = 'screenshot_big';
  let fileType = '.jpg';
  const src = `${baseUrl}${imageType}/${igdb_cover_img_id}${fileType}`;

  return src;
}

export {
  igdbCoverImgSrcForId,
  igdbHeroImgSrcForId,
}
