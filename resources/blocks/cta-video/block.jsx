import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

registerBlockType('doctailwind/cta-video', {
    title: 'Video',
    icon: 'video-alt3',
    category: 'blocos-personalizados',
    description: 'Bloco de call-to-action com vídeo do YouTube',
    
    attributes: {
        title: {
            type: 'string',
            default: 'Título do Vídeo'
        },
        description: {
            type: 'string',
            default: 'Descrição do vídeo ou call-to-action'
        },
        videoUrl: {
            type: 'string',
            default: ''
        }
    },
    
    edit: ({ attributes, setAttributes }) => {
        const { title, description, videoUrl } = attributes;
        const blockProps = useBlockProps();
        
        // Função para extrair o ID do YouTube da URL
        const getYouTubeVideoId = (url) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        };
        
        const videoId = getYouTubeVideoId(videoUrl);
        
        return (
            <div {...blockProps} className="cta-video-block-editor">
                <div className="bg-black text-white py-[50px] px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Título */}
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(newTitle) => setAttributes({ title: newTitle })}
                            placeholder="Digite o título..."
                            className="text-h3 font-heading text-white mb-4"
                            allowedFormats={[]}
                        />
                        
                        {/* Descrição */}
                        <RichText
                            tagName="p"
                            value={description}
                            onChange={(newDescription) => setAttributes({ description: newDescription })}
                            placeholder="Digite a descrição..."
                            className="text-lg text-white mb-8"
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                        
                        {/* URL do YouTube */}
                        <div className="mb-6">
                            <TextControl
                                label="URL do vídeo do YouTube"
                                value={videoUrl}
                                onChange={(newUrl) => setAttributes({ videoUrl: newUrl })}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="mb-4"
                            />
                        </div>
                        
                        {/* Preview do vídeo */}
                        {videoId ? (
                            <div className="video-container relative overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%', height: 0 }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="YouTube video player"
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-200 text-black p-8 rounded-lg">
                                <p>Insira uma URL válida do YouTube para ver o preview do vídeo</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    },
    
    save: () => null // Server-side rendering
});