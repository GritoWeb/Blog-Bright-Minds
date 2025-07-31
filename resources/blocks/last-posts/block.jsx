import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('meutema/latest-posts', {
  title: 'Últimos Posts',
  icon: 'grid-view',
  category: 'widgets',
  
  attributes: {},
  
  edit() {
    // Display placeholder content in editor
    const placeholderPosts = [
      {
        id: 1,
        title: 'Título do Post 1',
        excerpt: 'Este é um exemplo de excerpt para o primeiro post. Lorem ipsum dolor sit amet.',
        featured_image: null
      },
      {
        id: 2,
        title: 'Título do Post 2',
        excerpt: 'Este é um exemplo de excerpt para o segundo post. Lorem ipsum dolor sit amet.',
        featured_image: null
      },
      {
        id: 3,
        title: 'Título do Post 3',
        excerpt: 'Este é um exemplo de excerpt para o terceiro post. Lorem ipsum dolor sit amet.',
        featured_image: null
      }
    ];

    return (
      <div {...useBlockProps()}>
        <div className="latest-posts-block">
          <p className="text-gray-500 mb-4">Preview: Últimos Posts (os dados reais aparecerão no frontend)</p>
          <div className="flex flex-col gap-6">
            {placeholderPosts.map((post, index) => {
              
              return (
                <div key={post.id || index} className="post-card w-[1170px] bg-white overflow-hidden md:flex md:flex-row md:h-[480px]">
                  {/* Featured Image - Left Half on Desktop */}
                  <div className="post-image h-48 md:h-full md:w-1/2 bg-gray-200 bg-cover bg-center">
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Imagem do Post
                    </div>
                  </div>
                  
                  {/* Content - Right Half on Desktop */}
                  <div className="post-content p-6 h-48 md:h-full md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h2 
                        className="post-title font-heading text-h4 text-black mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      <p 
                        className="post-excerpt text-gray line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  
  save() {
    // Server-side rendering will be handled by PHP
    return null;
  },
});
