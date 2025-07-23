import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType('doctailwind/block-test', {
    edit: ({ attributes, setAttributes }) => {
        const { content } = attributes;
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps} className="block-test-block-editor p-4 border-2 border-dashed border-gray-300 rounded">
                <h3 className="text-lg font-bold mb-2">Block Test</h3>
                <RichText
                    tagName="div"
                    value={content}
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    placeholder="Enter your content..."
                />
            </div>
        );
    },
    
    save: () => null // Server-side rendering
});