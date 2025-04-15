const cheerio = require('cheerio');
const cache = new Map();

export async function fetchPosts() {
  if (cache.has('posts')) {
    return cache.get('posts');
  }

  const blogToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const blogID = process.env.NEXT_PUBLIC_API_ID;

  try {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${blogID}/posts?key=${blogToken}`
    );
    if (!res.ok) {
      throw new Error('Error fetching data');
    }
    const data = await res.json();
    cache.set('posts', data.items || []);
    return data.items || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}


// Función para obtener una noticia específica por su ID
export const fetchPostById = async (id) => {
  const blogToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const blogID = process.env.NEXT_PUBLIC_API_ID;

  try {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${blogID}/posts/${id}?key=${blogToken}`
    );
    if (!res.ok) {
      throw new Error('Error fetching post');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};

export const extractImageFromContent = (content) => {
  const $ = cheerio.load(content);
  const imgElement = $('img').first();
  return imgElement.attr('src') || null;
};

export const extractTextFromContent = (content) => {
  const $ = cheerio.load(content);
  return $.text().trim();
};
