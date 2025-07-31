<?php
// Server-side rendering for Newsletter block

$content = $attributes['content'] ?? '';
$block_data = [
    'title' => 'Newsletter',
    'content' => $content,
    'slug' => 'newsletter'
];

echo view('blocks.newsletter', $block_data)->render();