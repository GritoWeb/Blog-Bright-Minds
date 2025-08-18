import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

registerBlockType('meutema/post-block', {
  title: 'Post Block',
  icon: 'admin-post',
  category: 'layout',
  description: 'Bloco que mostra dois cards de post lado a lado. Personalize imagem, título, data e excerpt.',

  attributes: {
    leftImageUrl: { type: 'string', default: '' },
    leftTitle: { type: 'string', default: '' },
    leftDate: { type: 'string', default: '' },
    leftExcerpt: { type: 'string', default: '' },

    rightImageUrl: { type: 'string', default: '' },
    rightTitle: { type: 'string', default: '' },
    rightDate: { type: 'string', default: '' },
    rightExcerpt: { type: 'string', default: '' },
  },

  supports: { html: false },

  edit({ attributes, setAttributes }) {
    const {
      leftImageUrl, leftTitle, leftDate, leftExcerpt,
      rightImageUrl, rightTitle, rightDate, rightExcerpt
    } = attributes;

    const blockProps = useBlockProps({ className: 'post-block w-full' });

    const onSelectImage = (side, media) => {
      const url = media?.url || '';
      if (side === 'left') {
        setAttributes({ leftImageUrl: url });
      } else {
        setAttributes({ rightImageUrl: url });
      }
    };

    return (
      <div {...blockProps}>
        <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="post-block__inner flex flex-wrap -mx-4">
            <div className="post-item w-1/2 px-4">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Imagem (esquerda)</label>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => onSelectImage('left', media)}
                    allowedTypes={[ 'image' ]}
                    value={leftImageUrl}
                    render={({ open }) => (
                      <div>
                        <div className="mb-2">
                          {leftImageUrl ? (
                            <img src={leftImageUrl} className="w-full h-48 object-cover rounded" alt="" />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">Sem imagem</div>
                          )}
                        </div>
                        <Button onClick={(e) => { e.preventDefault(); open(); }} variant="secondary">Selecionar imagem</Button>
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>

              <div className="mb-4">
                <label className="block mt-3 mb-1">Título (esquerda)</label>
                <RichText
                  tagName="h3"
                  className="font-heading text-h4 mb-2"
                  value={leftTitle}
                  onChange={(val) => setAttributes({ leftTitle: val })}
                  placeholder="Título do card"
                />
              </div>

              <div className="mb-4">
                <label className="block mt-2 mb-1">Data (esquerda)</label>
                <TextControl
                  value={leftDate}
                  onChange={(val) => setAttributes({ leftDate: val })}
                  placeholder="01 de janeiro de 2025"
                />
              </div>

              <div className="mb-4">
                <label className="block mt-2 mb-1">Resumo (esquerda)</label>
                <RichText
                  tagName="p"
                  className="text-base text-gray-800 line-clamp-3"
                  value={leftExcerpt}
                  onChange={(val) => setAttributes({ leftExcerpt: val })}
                  placeholder="Resumo do post..."
                />
              </div>
            </div>

            <div className="post-item w-1/2 px-4">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Imagem (direita)</label>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => onSelectImage('right', media)}
                    allowedTypes={[ 'image' ]}
                    value={rightImageUrl}
                    render={({ open }) => (
                      <div>
                        <div className="mb-2">
                          {rightImageUrl ? (
                            <img src={rightImageUrl} className="w-full h-48 object-cover rounded" alt="" />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">Sem imagem</div>
                          )}
                        </div>
                        <Button onClick={(e) => { e.preventDefault(); open(); }} variant="secondary">Selecionar imagem</Button>
                      </div>
                    )}
                  />
                </MediaUploadCheck>
              </div>

              <div className="mb-4">
                <label className="block mt-3 mb-1">Título (direita)</label>
                <RichText
                  tagName="h3"
                  className="font-heading text-h4 mb-2"
                  value={rightTitle}
                  onChange={(val) => setAttributes({ rightTitle: val })}
                  placeholder="Título do card"
                />
              </div>

              <div className="mb-4">
                <label className="block mt-2 mb-1">Data (direita)</label>
                <TextControl
                  value={rightDate}
                  onChange={(val) => setAttributes({ rightDate: val })}
                  placeholder="01 de janeiro de 2025"
                />
              </div>

              <div className="mb-4">
                <label className="block mt-2 mb-1">Resumo (direita)</label>
                <RichText
                  tagName="p"
                  className="text-base text-gray-800 line-clamp-3"
                  value={rightExcerpt}
                  onChange={(val) => setAttributes({ rightExcerpt: val })}
                  placeholder="Resumo do post..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  save({ attributes }) {
    const {
      leftImageUrl, leftTitle, leftDate, leftExcerpt,
      rightImageUrl, rightTitle, rightDate, rightExcerpt
    } = attributes;

    const blockProps = useBlockProps.save({ className: 'post-block w-full' });

    return (
      <div {...blockProps}>
        <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="post-pair__inner flex flex-wrap -mx-4">
            <div className="post-item w-1/2 px-4">
              <div className="post-card block overflow-hidden hover:shadow-lg transition-shadow">
                {leftImageUrl ? <img src={leftImageUrl} alt="" className="w-full h-48 object-cover"/> : null}
                <div className="p-4">
                  {leftTitle ? <h3 className="font-heading text-h4 mb-2"><RichText.Content value={leftTitle} /></h3> : null}
                  {leftDate ? <div className="text-sm text-gray-600 mb-3">{leftDate}</div> : null}
                  {leftExcerpt ? <p className="text-base text-gray-800"><RichText.Content value={leftExcerpt} /></p> : null}
                </div>
              </div>
            </div>

            <div className="post-item w-1/2 px-4">
              <div className="post-card block overflow-hidden hover:shadow-lg transition-shadow">
                {rightImageUrl ? <img src={rightImageUrl} alt="" className="w-full h-48 object-cover"/> : null}
                <div className="p-4">
                  {rightTitle ? <h3 className="font-heading text-h4 mb-2"><RichText.Content value={rightTitle} /></h3> : null}
                  {rightDate ? <div className="text-sm text-gray-600 mb-3">{rightDate}</div> : null}
                  {rightExcerpt ? <p className="text-base text-gray-800"><RichText.Content value={rightExcerpt} /></p> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
