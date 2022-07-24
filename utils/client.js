import sanityClient from '@sanity/client';
import config from './config';

export const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: '2021-10-21',
  useCdn: true,
  token: process.env.TOKEN,
});
