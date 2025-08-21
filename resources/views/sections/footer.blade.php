<footer class="content-info">
  <div class="bg-black" style="background-color: #121218;">
    <div class="container mx-auto px-5 py-12 footer-container" style="max-width: 1200px; margin: 0 auto; padding: 3rem 1.25rem;">
      <div class="footer-grid grid grid-cols-1 md:grid-cols-3 gap-8 text-white" style="display: grid; grid-template-columns: 1fr; gap: 4rem; color: white;">
        <div>
          <a href="/">
            <img src="{{ get_template_directory_uri() }}/resources/images/logobm.png" alt="Logo BrightMinds" style="margin-bottom: 1rem; width: auto; height: 72px;" class="logo">
          </a>
          <p>Bem-vindo ao meu Blog! Compartilhando histórias, insights e inspiração para despertar sua criatividade e curiosidade. Participe da conversa e mantenha-se conectado.</p>
        </div>
        <div>
          <h2 style="margin-bottom: 2.3rem; font-size: 1.5rem; font-weight: bold;">Mais lidos</h2>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none;">Tendências de 2020 em decoração de interiores</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none;">Dicas de blog para iniciantes</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none;">Participe do sorteio global da Zabibas</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none;">Por que a cor coral viva é a cor do ano?</a></li>
            <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none;">Venice Stay & Thoughts</a></li>
          </ul>
        </div>
        <div>
          <h2 style="margin-bottom: 2.3rem; font-size: 1.5rem; font-weight: bold;">Redes Sociais</h2>
        </div>
      </div>
    </div>
    
    <!-- Copyright Section -->
    <div style="padding: 1rem 0;">
      <div class="container mx-auto px-5" style="max-width: 1200px; margin: 0 auto; padding: 0 1.25rem;">
        <p style="text-align: left; color: white; margin: 0;" class="copyright">Copyright © 2025</p>
      </div>
    </div>
  </div>
  
  <style>
    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
    
    .footer-grid ul li a:hover {
      text-decoration: underline !important;
    }
    
    @media (max-width: 767px) {
      .logo {
        margin-top: 0 !important;
        margin-bottom: 2.3rem !important;
      }
      
      .footer-container {
        padding-top: 0 !important;
      }
      
      .copyright {
        text-align: center !important;
      }
    }
  </style>
</footer>
