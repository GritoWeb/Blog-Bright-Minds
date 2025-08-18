/**
 * Main file to register all custom blocks
 * 
 * Blocks will be automatically imported when created via:
 * lando wp acorn make:block block-name --with-js --with-css
 * or
 * wp acorn make:block block-name --with-js --with-css
 */

// Import global styles for blocks in editor
import '../css/blocks.css';

// Block imports will be automatically added here
// Example:
// import '../blocks/my-block/block.jsx';

// AUTO-IMPORTS: Created blocks are automatically imported below this line
import '../blocks/page-title/block.jsx';
import '../blocks/cta-video/block.jsx';
import '../blocks/newsletter/block.jsx';
import '../blocks/post-block/block.jsx';

console.log('🎨 Auto Blocks - System loaded!');