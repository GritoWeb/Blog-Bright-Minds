<?php
/**
 * Server-side rendering for the Latest Posts Block
 */

// Get the latest 6 posts
$latest_posts = get_posts([
    'numberposts' => 6,
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
]);

if (empty($latest_posts)) {
    return '<p>Nenhum post encontrado.</p>';
}

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'post-block w-full']);
?>

<div <?php echo $wrapper_attributes; ?>>
    <style>
        .post-card img {
            width: 100%;
            height: 256px;
            object-fit: cover;
        }
        @media (min-width: 768px) {
            .post-card img {
                height: 370px !important;
            }
        }
    </style>
    
    <div class="mx-auto px-4" style="max-width: 1200px;">
        <div class="post-block__inner flex flex-wrap -mx-4">
            <?php foreach ($latest_posts as $post) : 
                $post_id = $post->ID;
                $post_title = get_the_title($post_id);
                $post_excerpt = get_the_excerpt($post_id);
                $post_date = get_the_date('j \d\e F \d\e Y', $post_id);
                $post_link = get_permalink($post_id);
                $featured_image = get_the_post_thumbnail_url($post_id, 'large');
            ?>
                <div class="post-item w-full md:w-1/2 px-4 mb-8">
                    <a href="<?php echo esc_url($post_link); ?>" 
                       class="post-card block overflow-hidden group no-underline" 
                       style="text-decoration: none;">
                        
                        <?php if ($featured_image) : ?>
                            <img src="<?php echo esc_url($featured_image); ?>" 
                                 alt="<?php echo esc_attr($post_title); ?>"
                                 class="w-full object-cover transition duration-150 ease-in-out group-hover:brightness-110" />
                        <?php endif; ?>
                        
                        <div class="p-4">
                            <h3 class="font-heading text-h4 mb-2 no-underline">
                                <?php echo esc_html($post_title); ?>
                            </h3>
                            
                            <div class="text-sm text-gray-600 mb-3 no-underline">
                                <?php echo esc_html($post_date); ?>
                            </div>
                            
                            <p class="text-base text-gray-800 no-underline line-clamp-3">
                                <?php echo esc_html(wp_strip_all_tags($post_excerpt)); ?>
                            </p>
                        </div>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
