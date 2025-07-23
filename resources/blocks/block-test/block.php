<?php
// Server-side rendering for Block Test block

$content = $attributes['content'] ?? '';
$block_data = [
    'title' => 'Block Test',
    'content' => $content,
    'slug' => 'block-test'
];

echo view('blocks.block-test', $block_data)->render();