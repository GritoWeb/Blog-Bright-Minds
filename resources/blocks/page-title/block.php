<?php
// Server-side rendering for Page Title block

$title = $attributes['title'] ?? 'Título da Página';

?>
<div class="page-title-block">
    <div class="bg-primary py-[90px] text-center">
        <h1 class="text-h1 font-heading text-black m-0">
            <?php echo wp_kses_post($title); ?>
        </h1>
    </div>
</div>