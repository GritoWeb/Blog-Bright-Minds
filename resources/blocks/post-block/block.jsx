import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';

registerBlockType('meutema/post-block', {
  title: 'Listagem Posts',
  icon: 'admin-post',
  category: 'blocos-personalizados',
  description: 'Bloco que mostra os últimos 6 posts em formato de cards.',

  attributes: {},

  supports: { html: false },

  edit() {
    const blockProps = useBlockProps({ className: 'post-block w-full' });

    const posts = useSelect((select) => {
      return select('core').getEntityRecords('postType', 'post', {
        per_page: 6,
        status: 'publish',
        orderby: 'date',
        order: 'desc',
        _embed: true,
      });
    }, []);

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    const getPostImage = (post) => {
      if (!post._embedded || !post._embedded['wp:featuredmedia']) return null;
      const media = post._embedded['wp:featuredmedia'][0];
      return media?.source_url || null;
    };

    if (!posts) {
      return (
        <div {...blockProps}>
          <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <p>Carregando posts...</p>
          </div>
        </div>
      );
    }

    return (
      <div {...blockProps}>
        <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="post-block__inner flex flex-wrap -mx-4">
            {posts.slice(0, 6).map((post, index) => (
              <div key={post.id} className="post-item w-full md:w-1/2 px-4 mb-8">
                <div className="post-card block overflow-hidden group">
                  {getPostImage(post) && (
                    <img 
                      src={getPostImage(post)} 
                      alt={decodeEntities(post.title.rendered)}
                      className="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110"
                      style={{ height: '256px' }}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-heading text-h4 mb-2">
                      {decodeEntities(post.title.rendered)}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      {formatDate(post.date)}
                    </div>
                    <p className="text-base text-gray-800 line-clamp-3">
                      {decodeEntities(post.excerpt.rendered.replace(/<[^>]*>/g, ''))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },

  save() {
    // Save function returns null because the block will be rendered server-side in PHP
    return null;
  }
});
