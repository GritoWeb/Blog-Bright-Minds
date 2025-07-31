import { registerBlockType } from '@wordpress/blocks';
import { 
  useBlockProps, 
  RichText, 
  MediaUpload,
  MediaUploadCheck 
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

registerBlockType('meutema/newsletter', {
  title: 'Newsletter',
  icon: 'email',
  category: 'custom blocks',
  
  attributes: {
    backgroundImage: {
      type: 'string',
      default: '',
    },
    backgroundImageId: {
      type: 'number',
      default: 0,
    },
    mainTitle: {
      type: 'string',
      default: 'Seu Título Principal Aqui',
    },
    formTitle: {
      type: 'string',
      default: 'Assine Nossa Newsletter',
    },
    formDescription: {
      type: 'string',
      default: 'Receba as últimas novidades diretamente no seu email.',
    },
  },
  
  edit({ attributes, setAttributes }) {
    const { backgroundImage, backgroundImageId, mainTitle, formTitle, formDescription } = attributes;
    
    return (
      <div {...useBlockProps()}>
        {/* Background Image Selector */}
        <div className="mb-4 p-4 border-2 border-dashed border-gray-300">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => 
                setAttributes({
                  backgroundImage: media.url,
                  backgroundImageId: media.id,
                })
              }
              allowedTypes={['image']}
              value={backgroundImageId}
              render={({ open }) => (
                <Button onClick={open} isPrimary>
                  {backgroundImage ? 'Trocar Imagem de Fundo' : 'Selecionar Imagem de Fundo'}
                </Button>
              )}
            />
          </MediaUploadCheck>
          
          {backgroundImage && (
            <div className="mt-2">
              <img src={backgroundImage} alt="Preview" className="max-w-xs h-20 object-cover rounded" />
            </div>
          )}
        </div>
        
        {/* Block Preview */}
        <div 
          className="relative min-h-96 bg-cover bg-center bg-gray-200 rounded-lg overflow-hidden"
          style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex">
            {/* Left half - Main title */}
            <div className="w-1/2 flex items-center justify-center p-8">
              <RichText
                tagName="h1"
                className="newsletter-main-title text-white font-heading color-white"
                value={mainTitle}
                onChange={(value) => setAttributes({ mainTitle: value })}
                placeholder="Digite o título principal..."
                allowedFormats={[]}
              />
            </div>
            
            {/* Right half - Form */}
            <div className="w-1/2 flex items-center justify-center p-8">
              <div className="bg-white bg-opacity-95 p-6 rounded-lg max-w-sm w-full">
                <RichText
                  tagName="h2"
                  className="newsletter-form-title text-white mb-4 font-heading text-h4"
                  value={formTitle}
                  onChange={(value) => setAttributes({ formTitle: value })}
                  placeholder="Título do formulário..."
                  allowedFormats={[]}
                />
                
                <RichText
                  tagName="p"
                  className="newsletter-form-description mb-4 text-white"
                  value={formDescription}
                  onChange={(value) => setAttributes({ formDescription: value })}
                  placeholder="Descrição do formulário..."
                  allowedFormats={[]}
                />
                
                {/* Form preview (non-editable) */}
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled
                  />

                  <input 
                    type="email" 
                    placeholder="Seu email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled
                  />
                  <button 
                    type="button" 
                    className="w-full bg-primary text-black py-2 px-4 rounded-md font-medium"
                    disabled
                  >
                    Assinar Newsletter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  
  save({ attributes }) {
    const { backgroundImage, mainTitle, formTitle, formDescription } = attributes;
    
    return (
      <div>
        <div 
          className="relative min-h-96 bg-cover bg-center bg-gray-200 overflow-hidden"
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            minHeight: '400px'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col lg:flex-row">
            {/* Left half - Main title */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
              <h1 className="newsletter-main-title text-white text-center font-heading text-h1">
                {mainTitle}
              </h1>
            </div>
            
            {/* Right half - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
              <div className="bg-white bg-opacity-95 p-6 rounded-lg max-w-sm w-full">
                <h2 className="newsletter-form-title text-black mb-4 font-heading text-h4">
                  {formTitle}
                </h2>
                
                <p className="newsletter-form-description mb-4 text-gray">
                  {formDescription}
                </p>
                
                {/* Functional form */}
                <form className="space-y-3" method="post" action="">
                  <input 
                    type="text" 
                    name="newsletter_name"
                    placeholder="Seu nome" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input 
                    type="email" 
                    name="newsletter_email"
                    placeholder="Seu email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-500 text-black py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    Assinar Newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});