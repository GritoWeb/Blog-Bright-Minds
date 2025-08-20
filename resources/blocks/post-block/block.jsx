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
    leftLink: { type: 'string', default: '' },

    rightImageUrl: { type: 'string', default: '' },
    rightTitle: { type: 'string', default: '' },
    rightDate: { type: 'string', default: '' },
    rightExcerpt: { type: 'string', default: '' },
    rightLink: { type: 'string', default: '' },
  },

  supports: { html: false },

  edit({ attributes, setAttributes }) {
    const {
      leftImageUrl, leftTitle, leftDate, leftExcerpt, leftLink,
      rightImageUrl, rightTitle, rightDate, rightExcerpt, rightLink
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
            <div className="post-item w-full md:w-1/2 px-4">
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
                            <img src={leftImageUrl} className="w-full aspect-square object-cover rounded transition duration-150 ease-in-out group-hover:brightness-110" alt="" />
                          ) : (
                            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-500">Sem imagem</div>
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
                <label className="block mt-2 mb-1">Link (esquerda)</label>
                <TextControl
                  value={leftLink}
                  onChange={(val) => setAttributes({ leftLink: val })}
                  placeholder="https://"
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

            <div className="post-item w-full md:w-1/2 px-4">
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
                            <img src={rightImageUrl} className="w-full aspect-square object-cover rounded transition duration-150 ease-in-out group-hover:brightness-110" alt="" />
                          ) : (
                            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-500">Sem imagem</div>
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
                <label className="block mt-2 mb-1">Link (direita)</label>
                <TextControl
                  value={rightLink}
                  onChange={(val) => setAttributes({ rightLink: val })}
                  placeholder="https://"
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
      leftImageUrl, leftTitle, leftDate, leftExcerpt, leftLink,
      rightImageUrl, rightTitle, rightDate, rightExcerpt, rightLink
    } = attributes;

    const blockProps = useBlockProps.save({ className: 'post-block w-full' });

    const cardStyle = {
      textDecoration: 'none'
    };

    const imageStyleDesktop = `
      .post-card img {
        width: 384px;
        height: 256px;
        object-fit: cover;
      }
      @media (min-width: 768px) {
        .post-card img {
          width: 555px !important;
          height: 370px !important;
        }
      }
    `;

    return (
      <div {...blockProps}>
        <style dangerouslySetInnerHTML={{ __html: imageStyleDesktop }} />
        <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="post-pair__inner flex flex-wrap -mx-4">
            <div className="post-item w-full md:w-1/2 px-4">
              {leftLink ? (
                <a href={leftLink} className="post-card block overflow-hidden group no-underline" target="_self" rel="noopener noreferrer" style={cardStyle}>
                  {leftImageUrl ? <img src={leftImageUrl} alt="" className="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110"/> : null}
                  <div className="p-4">
                    {leftTitle ? <h3 className="font-heading text-h4 mb-2 no-underline"><RichText.Content value={leftTitle} /></h3> : null}
                    {leftDate ? <div className="text-sm text-gray-600 mb-3 no-underline">{leftDate}</div> : null}
                    {leftExcerpt ? <p className="text-base text-gray-800 no-underline"><RichText.Content value={leftExcerpt} /></p> : null}
                  </div>
                </a>
              ) : (
                <div className="post-card block overflow-hidden group no-underline" style={cardStyle}>
                  {leftImageUrl ? <img src={leftImageUrl} alt="" className="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110"/> : null}
                  <div className="p-4">
                    {leftTitle ? <h3 className="font-heading text-h4 mb-2 no-underline"><RichText.Content value={leftTitle} /></h3> : null}
                    {leftDate ? <div className="text-sm text-gray-600 mb-3 no-underline">{leftDate}</div> : null}
                    {leftExcerpt ? <p className="text-base text-gray-800 no-underline"><RichText.Content value={leftExcerpt} /></p> : null}
                  </div>
                </div>
              )}
             </div>

             <div className="post-item w-full md:w-1/2 px-4">
              {rightLink ? (
                <a href={rightLink} className="post-card block overflow-hidden group no-underline" target="_self" rel="noopener noreferrer" style={cardStyle}>
                  {rightImageUrl ? <img src={rightImageUrl} alt="" className="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110"/> : null}
                  <div className="p-4">
                    {rightTitle ? <h3 className="font-heading text-h4 mb-2 no-underline"><RichText.Content value={rightTitle} /></h3> : null}
                    {rightDate ? <div className="text-sm text-gray-600 mb-3 no-underline">{rightDate}</div> : null}
                    {rightExcerpt ? <p className="text-base text-gray-800 no-underline"><RichText.Content value={rightExcerpt} /></p> : null}
                  </div>
                </a>
              ) : (
                <div className="post-card block overflow-hidden group no-underline" style={cardStyle}>
                  {rightImageUrl ? <img src={rightImageUrl} alt="" className="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110"/> : null}
                  <div className="p-4">
                    {rightTitle ? <h3 className="font-heading text-h4 mb-2 no-underline"><RichText.Content value={rightTitle} /></h3> : null}
                    {rightDate ? <div className="text-sm text-gray-600 mb-3 no-underline">{rightDate}</div> : null}
                    {rightExcerpt ? <p className="text-base text-gray-800 no-underline"><RichText.Content value={rightExcerpt} /></p> : null}
                  </div>
                </div>
              )}
             </div>
          </div>
        </div>
      </div>
    );
  }
});
