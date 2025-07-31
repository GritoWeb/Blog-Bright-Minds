import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType('doctailwind/page-title', {
    title: 'Page Title',
    icon: 'heading',
    category: 'design',
    description: 'Título de página centralizado e editável com cor primária',
    
    attributes: {
        title: {
            type: 'string',
            default: 'Título da Página'
        }
    },
    
    edit: ({ attributes, setAttributes }) => {
        const { title } = attributes;
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps} className="page-title-block-editor">
                <div className="bg-primary py-[90px] text-center">
                    <RichText
                        tagName="h1"
                        value={title}
                        onChange={(newTitle) => setAttributes({ title: newTitle })}
                        placeholder="Digite o título da página..."
                        className="text-h1 font-heading text-black m-0"
                        allowedFormats={[]}
                    />
                </div>
            </div>
        );
    },
    
    save: () => null // Server-side rendering
});