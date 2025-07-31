<?php
// Server-side rendering for CTA Video block

$title = $attributes['title'] ?? 'Título do Vídeo';
$description = $attributes['description'] ?? 'Descrição do vídeo ou call-to-action';
$videoUrl = $attributes['videoUrl'] ?? '';

// Função para extrair o ID do YouTube da URL
if (!function_exists('getYouTubeVideoId')) {
    function getYouTubeVideoId($url) {
        preg_match('/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/', $url, $match);
        return (isset($match[2]) && strlen($match[2]) === 11) ? $match[2] : null;
    }
}

$videoId = getYouTubeVideoId($videoUrl);

?>
<div class="cta-video-block">
    <div class="bg-black text-white py-[80px] px-4 text-center">
        <div class="max-w-4xl mx-auto">
            <!-- Título -->
            <?php if (!empty($title)): ?>
                <h2 class="text-h3 font-heading text-white mb-4">
                    <?php echo wp_kses_post($title); ?>
                </h2>
            <?php endif; ?>
            
            <!-- Descrição -->
            <?php if (!empty($description)): ?>
                <p class="text-lg text-white mb-8">
                    <?php echo wp_kses_post($description); ?>
                </p>
            <?php endif; ?>
            
            <!-- Vídeo do YouTube -->
            <?php if ($videoId): ?>
                <div class="video-container relative overflow-hidden rounded-lg mx-auto max-w-3xl" style="padding-bottom: 56.25%; height: 0;">
                    <iframe
                        src="https://www.youtube.com/embed/<?php echo esc_attr($videoId); ?>"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                        frameborder="0"
                        allowfullscreen
                        title="YouTube video player"
                        loading="lazy">
                    </iframe>
                </div>
            <?php elseif (!empty($videoUrl)): ?>
                <div class="bg-gray-800 text-white p-8 rounded-lg max-w-3xl mx-auto">
                    <p>URL do vídeo inválida. Verifique se é uma URL válida do YouTube.</p>
                </div>
            <?php else: ?>
                <div class="bg-gray-800 text-white p-8 rounded-lg max-w-3xl mx-auto">
                    <p>Nenhum vídeo configurado.</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>