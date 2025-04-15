import React from 'react';
import { fetchPostById, extractImageFromContent } from '@/app/(front-end)/noticiasposts';
import Image from 'next/image';
import './noticias.css';

const NoticiaIndividual = async ({ params }) => {
  const { id } = params; // Obtiene el ID desde los parámetros
  const post = await fetchPostById(id); // Llama a la función con el ID

  if (!post) {
    return <p>Noticia no encontrada.</p>;
  }

  const imageSrc = extractImageFromContent(post.content);

  return (
    <div>
      <div className="banner-nosotros">
        <Image
          src={imageSrc}
          width={1500}
          height={800}
          className="hidden md:block"
          alt={post.title || 'Noticia'}
        />
      </div>
      <div className="news-container">
        <h1>{post.title}</h1>
        <p>
          <strong>Publicado el:</strong> {new Date(post.published).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
};

export default NoticiaIndividual;