const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0mjeop5f';

const YYYY_MM_DD = new Date().toLocaleDateString('fr-CA');
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || YYYY_MM_DD;

export { dataset, projectId, apiVersion };
