<?php

/**
 * Theme setup.
 */

namespace App;

use Illuminate\Support\Facades\Vite;

/**
 * Inject styles into the block editor.
 *
 * @return array
 */
add_filter('block_editor_settings_all', function ($settings) {
    $style = Vite::asset('resources/css/editor.css');

    $settings['styles'][] = [
        'css' => "@import url('{$style}')",
    ];

    return $settings;
});

/**
 * Inject scripts into the block editor.
 *
 * @return void
 */
add_filter('admin_head', function () {
    if (! get_current_screen()?->is_block_editor()) {
        return;
    }

    $dependencies = json_decode(Vite::content('editor.deps.json'));

    foreach ($dependencies as $dependency) {
        if (! wp_script_is($dependency)) {
            wp_enqueue_script($dependency);
        }
    }

    echo Vite::withEntryPoints([
        'resources/js/editor.js',
    ])->toHtml();
});

/**
 * Use the generated theme.json file.
 *
 * @return string
 */
add_filter('theme_file_path', function ($path, $file) {
    return $file === 'theme.json'
        ? public_path('build/assets/theme.json')
        : $path;
}, 10, 2);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
     */
    add_theme_support('customize-selective-refresh-widgets');
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ];

    register_sidebar([
        'name' => __('Primary', 'sage'),
        'id' => 'sidebar-primary',
    ] + $config);

    register_sidebar([
        'name' => __('Footer', 'sage'),
        'id' => 'sidebar-footer',
    ] + $config);
});

/**
 * Render callback for latest posts block
 */
if (!function_exists('render_latest_posts_block')) {
    function render_latest_posts_block($attributes) {
        $posts = get_posts([
            'numberposts' => 3,
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC',
            'post_type' => 'post'
        ]);

        if (empty($posts)) {
            return '<div class="latest-posts-block"><p style="padding: 20px; background: #f0f0f0; border: 1px solid #ddd;">Nenhum post encontrado. Total de posts: ' . wp_count_posts()->publish . '</p></div>';
        }

        ob_start();
        ?>
        <div class="latest-posts-block">
            <div class="flex flex-col items-center justify-center">
                <?php foreach ($posts as $post): ?>
                    <?php
                    setup_postdata($post);
                    $featured_image = get_the_post_thumbnail_url($post->ID, 'medium_large');
                    $excerpt = get_the_excerpt($post->ID);
                    if (empty($excerpt)) {
                        $excerpt = wp_trim_words($post->post_content, 20, '...');
                    }
                    ?>
                    <div class="post-card w-[960px] bg-white overflow-hidden md:flex md:flex-row md:h-[480px] mb-6">
                        <!-- Featured Image - Left Half on Desktop -->
                        <div class="post-image h-48 md:h-full md:w-1/2 bg-gray-200" style="<?php echo $featured_image ? 'background-image: url(' . esc_url($featured_image) . '); background-size: cover; background-position: center;' : 'background: #f0f0f0;'; ?>">
                            <?php if (!$featured_image): ?>
                                <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: #666;">
                                    Sem imagem
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Content - Right Half on Desktop -->
                        <div class="post-content p-6 md:h-full md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h2 class="text-xl font-bold mb-3 text-black">
                                    <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="hover:text-primary transition-colors">
                                        <?php echo esc_html(get_the_title($post->ID)); ?>
                                    </a>
                                </h2>
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    <?php echo esc_html($excerpt); ?>
                                </p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
                <?php wp_reset_postdata(); ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

use App\Blocks\BlockManager;

/**
 * Register Auto Blocks system
 */
add_action('init', function () {
    $blockManager = new BlockManager();
    $blockManager->register();
});

if (! function_exists('render_post_pair_block')) {
    function render_post_pair_block($attributes) {
        $left_id = isset($attributes['leftPostId']) ? intval($attributes['leftPostId']) : 0;
        $right_id = isset($attributes['rightPostId']) ? intval($attributes['rightPostId']) : 0;

        // If neither side is configured, show a helpful hint to editors only and render nothing for public
        if ($left_id === 0 && $right_id === 0) {
            if (is_user_logged_in() && current_user_can('edit_posts')) {
                return '<div class="post-pair-block-empty p-4 border border-yellow-300 bg-yellow-50 text-sm">Post Block não configurado. No editor, selecione os posts esquerdo e direito e salve a página para ver o bloco no frontend.</div>';
            }

            return '';
        }

        ob_start();
        ?>
        <div class="post-pair-block" style="max-width:1200px;margin:0 auto;padding:0 1rem;">
            <div class="post-pair__inner flex flex-wrap -mx-4">
                <div class="post-item w-1/2 px-4">
                    <?php if ($left_id && ($post = get_post($left_id))): setup_postdata($post);
                        $featured = get_the_post_thumbnail_url($post->ID, 'medium_large');
                        $excerpt = get_the_excerpt($post->ID);
                        if (empty($excerpt)) {
                            $excerpt = wp_trim_words($post->post_content, 20, '...');
                        }
                        ?>
                        <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="post-card block overflow-hidden hover:shadow-lg transition-shadow">
                            <?php if ($featured): ?>
                                <img src="<?php echo esc_url($featured); ?>" alt="" class="w-full h-48 object-cover" />
                            <?php endif; ?>

                            <div class="p-4">
                                <h3 class="font-heading text-h4 mb-2"><?php echo esc_html(get_the_title($post->ID)); ?></h3>
                                <div class="text-sm text-gray-600 mb-3"><?php echo esc_html(get_the_date('', $post->ID)); ?></div>
                                <p class="text-base text-gray-800"><?php echo esc_html($excerpt); ?></p>
                            </div>
                        </a>
                    <?php else: ?>
                        <div class="post-card-empty">&nbsp;</div>
                    <?php endif; wp_reset_postdata(); ?>
                </div>

                <div class="post-item w-1/2 px-4">
                    <?php if ($right_id && ($post = get_post($right_id))): setup_postdata($post);
                        $featured = get_the_post_thumbnail_url($post->ID, 'medium_large');
                        $excerpt = get_the_excerpt($post->ID);
                        if (empty($excerpt)) {
                            $excerpt = wp_trim_words($post->post_content, 20, '...');
                        }
                        ?>
                        <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="post-card block overflow-hidden hover:shadow-lg transition-shadow">
                            <?php if ($featured): ?>
                                <img src="<?php echo esc_url($featured); ?>" alt="" class="w-full h-48 object-cover" />
                            <?php endif; ?>

                            <div class="p-4">
                                <h3 class="font-heading text-h4 mb-2"><?php echo esc_html(get_the_title($post->ID)); ?></h3>
                                <div class="text-sm text-gray-600 mb-3"><?php echo esc_html(get_the_date('', $post->ID)); ?></div>
                                <p class="text-base text-gray-800"><?php echo esc_html($excerpt); ?></p>
                            </div>
                        </a>
                    <?php else: ?>
                        <div class="post-card-empty">&nbsp;</div>
                    <?php endif; wp_reset_postdata(); ?>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}

// NOTE: Previously the post-block was server-side rendered via render_post_pair_block.
// The block was converted to client-side editable (image/title/date/excerpt) and now saves its own HTML.
// Therefore we no longer register a render_callback for the post-block here. Keep other block registrations as usual.
