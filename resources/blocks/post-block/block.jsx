import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

registerBlockType('meutema/post-block', {
  title: 'Post Block',
  icon: 'admin-post',
  category: 'layout',
  description: 'Bloco que mostra dois posts lado a lado. Cada lado é editável e permite selecionar imagem da biblioteca.',

  attributes: {
    leftTitle: { type: 'string', source: 'html', selector: '.post-left h2', default: 'Título de exemplo' },
    leftDate: { type: 'string', source: 'html', selector: '.post-left .post-date', default: '30/02/2500' },
    leftExcerpt: { type: 'string', source: 'html', selector: '.post-left .post-excerpt', default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    leftImageUrl: { type: 'string', default: '' },
    leftImageId: { type: 'number', default: 0 },

    rightTitle: { type: 'string', source: 'html', selector: '.post-right h2', default: 'Título de exemplo' },
    rightDate: { type: 'string', source: 'html', selector: '.post-right .post-date', default: '30/02/2500' },
    rightExcerpt: { type: 'string', source: 'html', selector: '.post-right .post-excerpt', default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    rightImageUrl: { type: 'string', default: '' },
    rightImageId: { type: 'number', default: 0 },
  },

  supports: { html: false },

  edit({ attributes, setAttributes }) {
    const {
      leftTitle, leftDate, leftExcerpt, leftImageUrl, leftImageId,
      rightTitle, rightDate, rightExcerpt, rightImageUrl, rightImageId
    } = attributes;

    const blockProps = useBlockProps({ className: 'post-block w-full' });

    const onSelectLeftImage = (media) => setAttributes({ leftImageUrl: media.url, leftImageId: media.id });
    const onSelectRightImage = (media) => setAttributes({ rightImageUrl: media.url, rightImageId: media.id });

    return (
      <div {...blockProps}>
        <div className="post-block__inner flex flex-wrap -mx-4">
          {/* Left post */}
          <div className="post-item post-left w-1/2 px-4">
            <div className="post-image mb-4">
              <MediaUpload
                onSelect={onSelectLeftImage}
                allowedTypes={[ 'image' ]}
                value={leftImageId}
                render={({ open }) => (
                  <div>
                    {leftImageUrl ? (
                      <img src={leftImageUrl} alt="preview" className="w-full h-auto object-cover rounded" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">Imagem do post (clique para selecionar)</div>
                    )}
                    <Button type="button" onClick={(e) => { e.preventDefault(); open(); }} className="mt-2" isSecondary>Selecionar imagem</Button>
                  </div>
                )}
              />
            </div>

            <RichText tagName="h2" value={leftTitle} onChange={(value) => setAttributes({ leftTitle: value })} placeholder="Título do post" className="post-title text-h3 font-heading mb-2" allowedFormats={['core/bold','core/italic']} />
            <RichText tagName="div" value={leftDate} onChange={(value) => setAttributes({ leftDate: value })} placeholder="Data do post" className="post-date text-sm text-gray-600 mb-3" allowedFormats={[]} />
            <RichText tagName="p" value={leftExcerpt} onChange={(value) => setAttributes({ leftExcerpt: value })} placeholder="Resumo do post" className="post-excerpt text-base text-gray-800" allowedFormats={['core/bold']} />
          </div>

          {/* Right post */}
          <div className="post-item post-right w-1/2 px-4">
            <div className="post-image mb-4">
              <MediaUpload
                onSelect={onSelectRightImage}
                allowedTypes={[ 'image' ]}
                value={rightImageId}
                render={({ open }) => (
                  <div>
                    {rightImageUrl ? (
                      <img src={rightImageUrl} alt="preview" className="w-full h-auto object-cover rounded" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">Imagem do post (clique para selecionar)</div>
                    )}
                    <Button type="button" onClick={(e) => { e.preventDefault(); open(); }} className="mt-2" isSecondary>Selecionar imagem</Button>
                  </div>
                )}
              />
            </div>

            <RichText tagName="h2" value={rightTitle} onChange={(value) => setAttributes({ rightTitle: value })} placeholder="Título do post" className="post-title text-h3 font-heading mb-2" allowedFormats={['core/bold','core/italic']} />
            <RichText tagName="div" value={rightDate} onChange={(value) => setAttributes({ rightDate: value })} placeholder="Data do post" className="post-date text-sm text-gray-600 mb-3" allowedFormats={[]} />
            <RichText tagName="p" value={rightExcerpt} onChange={(value) => setAttributes({ rightExcerpt: value })} placeholder="Resumo do post" className="post-excerpt text-base text-gray-800" allowedFormats={['core/bold']} />
          </div>
        </div>
      </div>
    );
  },

  save({ attributes }) {
    const {
      leftTitle, leftDate, leftExcerpt, leftImageUrl,
      rightTitle, rightDate, rightExcerpt, rightImageUrl
    } = attributes;

    const blockProps = useBlockProps.save({ className: 'post-block w-full' });

    return (
      <div {...blockProps}>
        <div className="post-block__inner flex flex-wrap -mx-4">
          <div className="post-item post-left w-1/2 px-4">
            {leftImageUrl && (
              <div className="post-image mb-4"><img src={leftImageUrl} alt="" className="w-full h-auto object-cover rounded" /></div>
            )}
            <h2 className="post-title text-h3 font-heading mb-2">{leftTitle}</h2>
            <div className="post-date text-sm text-gray-600 mb-3">{leftDate}</div>
            <p className="post-excerpt text-base text-gray-800">{leftExcerpt}</p>
          </div>

          <div className="post-item post-right w-1/2 px-4">
            {rightImageUrl && (
              <div className="post-image mb-4"><img src={rightImageUrl} alt="" className="w-full h-auto object-cover rounded" /></div>
            )}
            <h2 className="post-title text-h3 font-heading mb-2">{rightTitle}</h2>
            <div className="post-date text-sm text-gray-600 mb-3">{rightDate}</div>
            <p className="post-excerpt text-base text-gray-800">{rightExcerpt}</p>
          </div>
        </div>
      </div>
    );
  },
});
