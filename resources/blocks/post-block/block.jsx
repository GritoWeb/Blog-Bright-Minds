import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

registerBlockType('meutema/post-block', {
  title: 'Post Block',
  icon: 'admin-post',
  category: 'layout',
  description: 'Bloco que mostra dois posts lado a lado. Escolha os posts a serem exibidos.',

  attributes: {
    leftPostId: { type: 'number', default: 0 },
    leftTitle: { type: 'string', default: '' },
    leftDate: { type: 'string', default: '' },
    leftExcerpt: { type: 'string', default: '' },
    leftImageUrl: { type: 'string', default: '' },
    leftPostUrl: { type: 'string', default: '' },

    rightPostId: { type: 'number', default: 0 },
    rightTitle: { type: 'string', default: '' },
    rightDate: { type: 'string', default: '' },
    rightExcerpt: { type: 'string', default: '' },
    rightImageUrl: { type: 'string', default: '' },
    rightPostUrl: { type: 'string', default: '' },
  },

  supports: { html: false },

  edit({ attributes, setAttributes }) {
    const {
      leftPostId, leftTitle, leftDate, leftExcerpt, leftImageUrl, leftPostUrl,
      rightPostId, rightTitle, rightDate, rightExcerpt, rightImageUrl, rightPostUrl
    } = attributes;

    const blockProps = useBlockProps({ className: 'post-block w-full' });

    const [postsOptions, setPostsOptions] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
      let mounted = true;
      setLoadingPosts(true);
      apiFetch({ path: '/wp/v2/posts?per_page=50&_fields=id,title,excerpt,date,featured_media,link' })
        .then((posts) => {
          if (!mounted) return;
          const opts = posts.map((p) => ({ value: p.id, label: (p.title && p.title.rendered) ? p.title.rendered : `Post ${p.id}`, raw: p }));
          setPostsOptions(opts);
        })
        .catch(() => setPostsOptions([]))
        .finally(() => mounted && setLoadingPosts(false));
      return () => { mounted = false; };
    }, []);

    const fetchFeaturedImage = (mediaId) => {
      if (!mediaId) return Promise.resolve(null);
      return apiFetch({ path: `/wp/v2/media/${mediaId}?_fields=media_details,source_url` })
        .then((m) => m.source_url)
        .catch(() => null);
    };

    const onSelectPost = async (side, postId) => {
      if (!postId) {
        if (side === 'left') {
          setAttributes({ leftPostId: 0, leftTitle: '', leftExcerpt: '', leftDate: '', leftImageUrl: '', leftPostUrl: '' });
        } else {
          setAttributes({ rightPostId: 0, rightTitle: '', rightExcerpt: '', rightDate: '', rightImageUrl: '', rightPostUrl: '' });
        }
        return;
      }

      const postRaw = postsOptions.find((o) => o.value === postId)?.raw;
      const post = postRaw || await apiFetch({ path: `/wp/v2/posts/${postId}?_fields=id,title,excerpt,date,featured_media,link` });
      const imageUrl = post.featured_media ? await fetchFeaturedImage(post.featured_media) : '';

      if (side === 'left') {
        setAttributes({
          leftPostId: post.id,
          leftTitle: post.title && post.title.rendered ? post.title.rendered : '',
          leftExcerpt: post.excerpt && post.excerpt.rendered ? stripTags(post.excerpt.rendered) : '',
          leftDate: post.date ? new Date(post.date).toLocaleDateString() : '',
          leftImageUrl: imageUrl || '',
          leftPostUrl: post.link || ''
        });
      } else {
        setAttributes({
          rightPostId: post.id,
          rightTitle: post.title && post.title.rendered ? post.title.rendered : '',
          rightExcerpt: post.excerpt && post.excerpt.rendered ? stripTags(post.excerpt.rendered) : '',
          rightDate: post.date ? new Date(post.date).toLocaleDateString() : '',
          rightImageUrl: imageUrl || '',
          rightPostUrl: post.link || ''
        });
      }
    };

    const stripTags = (html) => html ? html.replace(/<[^>]*>/g, '') : '';

    // Editor preview: selection + read-only preview (no manual edits)
    return (
      <div {...blockProps}>
        <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="post-block__inner flex flex-wrap -mx-4">
            {/* Left post */}
            <div className="post-item post-left w-1/2 px-4">
              <SelectControl
                label="Selecionar post (esquerda)"
                value={leftPostId}
                options={[{ value: 0, label: '— Selecionar —' }, ...postsOptions]}
                onChange={(val) => onSelectPost('left', Number(val))}
                disabled={loadingPosts}
              />

              <div className="post-card border rounded overflow-hidden mt-3">
                {leftImageUrl ? (
                  <img src={leftImageUrl} alt="" className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">Sem imagem</div>
                )}

                <div className="p-4">
                  <h3 className="font-heading text-h4 mb-2" dangerouslySetInnerHTML={{ __html: leftTitle }} />
                  <div className="text-sm text-gray-600 mb-3">{leftDate}</div>
                  <p className="text-base text-gray-800 line-clamp-3">{leftExcerpt}</p>
                </div>

                <div className="card-link-overlay">
                  {/* visual only - link applied on frontend saved markup */}
                </div>
              </div>
            </div>

            {/* Right post */}
            <div className="post-item post-right w-1/2 px-4">
              <SelectControl
                label="Selecionar post (direita)"
                value={rightPostId}
                options={[{ value: 0, label: '— Selecionar —' }, ...postsOptions]}
                onChange={(val) => onSelectPost('right', Number(val))}
                disabled={loadingPosts}
              />

              <div className="post-card border rounded overflow-hidden mt-3">
                {rightImageUrl ? (
                  <img src={rightImageUrl} alt="" className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">Sem imagem</div>
                )}

                <div className="p-4">
                  <h3 className="font-heading text-h4 mb-2" dangerouslySetInnerHTML={{ __html: rightTitle }} />
                  <div className="text-sm text-gray-600 mb-3">{rightDate}</div>
                  <p className="text-base text-gray-800 line-clamp-3">{rightExcerpt}</p>
                </div>

                <div className="card-link-overlay">
                  {/* visual only - link applied on frontend saved markup */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  save({ attributes }) {
    // Server-side render — output handled by PHP. Return null so saved content is empty and WP will use render_callback.
    return null;
   },
});
