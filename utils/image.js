import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const urlForThumbnail = (source) => {
  return imageUrlBuilder(client).image(source).width(300).url();
};

const urlFor = (source) => {
  return imageUrlBuilder(client).image(source).width(580).url();
};

export { urlFor, urlForThumbnail };
