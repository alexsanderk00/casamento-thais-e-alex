document.addEventListener('DOMContentLoaded', () => {

  // ===================== COUNTDOWN =====================
  const weddingDate = new Date('2026-10-10T16:00:00-03:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===================== HERO SLIDESHOW =====================
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  setInterval(nextSlide, 5000);

  // ===================== NAVBAR SCROLL =====================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===================== MOBILE MENU =====================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ===================== LIGHTBOX =====================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const photos = [];
  let currentIndex = 0;

  document.querySelectorAll('.galeria-item').forEach(item => {
    const img = item.querySelector('img');
    photos.push(img.src);

    item.addEventListener('click', () => {
      currentIndex = parseInt(item.dataset.index);
      lightboxImg.src = photos[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    lightboxImg.src = photos[currentIndex];
  });

  document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    lightboxImg.src = photos[currentIndex];
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
      lightboxImg.src = photos[currentIndex];
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % photos.length;
      lightboxImg.src = photos[currentIndex];
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===================== PRESENTES DATA =====================
  const presentes = [
    { nome: 'Colher de Pau', img: 'https://images.pexels.com/photos/5507645/pexels-photo-5507645.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'O utensílio mais versátil da cozinha — e da educação familiar.', valor: 'R$ 80', categoria: 'essenciais' },
    { nome: 'Conjunto de Toalhas', img: 'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=400&h=400&fit=crop', desc: 'Para os dois enxugarem as lágrimas de emoção nos primeiros dias.', valor: 'R$ 90', categoria: 'essenciais' },
    { nome: 'Tapete para Banheiro', img: 'https://images.pexels.com/photos/12273900/pexels-photo-12273900.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Pezinhos quentes de manhã cedo. Pequeno luxo, grande diferença.', valor: 'R$ 95', categoria: 'essenciais' },
    { nome: 'Cobertor Casal', img: 'https://images.unsplash.com/photo-1564019472231-4586c552dc27?w=400&h=400&fit=crop', desc: 'Para as noites frias de Santa Rosa. Sem mais comentários.', valor: 'R$ 110', categoria: 'especiais' },
    { nome: 'Jogo de Cama', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', desc: 'Para começar bem cada manhã juntos — 300 fios, por favor.', valor: 'R$ 120', categoria: 'essenciais' },
    { nome: 'Jogo de Pratos e Talheres', img: 'https://images.pexels.com/photos/290524/pexels-photo-290524.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Para receber os amigos com estilo — ou comer miojo com elegância.', valor: 'R$ 130', categoria: 'essenciais' },
    { nome: 'Ferro de Passar', img: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400&h=400&fit=crop', desc: 'Roupas impecáveis para todos os compromissos da nova vida a dois.', valor: 'R$ 140', categoria: 'eletro' },
    { nome: 'Liquidificador', img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop', desc: 'Vitaminas, sucos, vitaminas, sucos... e talvez uma caipirinha.', valor: 'R$ 160', categoria: 'eletro' },
    { nome: 'Netflix por 1 Ano', img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=400&fit=crop', desc: 'Para as noites no sofá com pipoca. O plano do casal perfeito.', valor: 'R$ 170', categoria: 'especiais' },
    { nome: 'Conjunto de Panelas', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', desc: 'Para cozinhar com amor (e sem fumaça nem fundo queimado).', valor: 'R$ 180', categoria: 'essenciais' },
    { nome: 'Kit de Ferramentas', img: 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: '"Para o Alex não comprar mais coisa errada." — disse alguém da família.', valor: 'R$ 190', categoria: 'especiais' },
    { nome: 'Cafeteira', img: 'https://images.pexels.com/photos/302893/pexels-photo-302893.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Porque nenhum casamento sobrevive sem café. Fato científico.', valor: 'R$ 210', categoria: 'eletro' },
    { nome: 'Aspirador de Pó', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop', desc: 'Para manter a casa tão limpa quanto a intenção do casal.', valor: 'R$ 230', categoria: 'eletro' },
    { nome: 'Ventilador', img: 'https://images.pexels.com/photos/13983948/pexels-photo-13983948.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Para os dias quentes — e para secar a louça quando der preguiça.', valor: 'R$ 250', categoria: 'eletro' },
    { nome: 'Air Fryer', img: 'https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?w=400&h=400&fit=crop', desc: 'O eletrodoméstico que vai mudar a vida do casal. E a dieta.', valor: 'R$ 280', categoria: 'eletro' },
    { nome: 'Micro-ondas', img: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop', desc: 'Sobras de ontem, almoço de hoje. O casamento moderno funciona assim.', valor: 'R$ 320', categoria: 'eletro' },
    { nome: 'Lua de Mel — Contribuição P', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop', desc: 'Ajude o casal a realizar a viagem dos sonhos. Cada real conta!', valor: 'R$ 100', categoria: 'luademel' },
    { nome: 'Lua de Mel — Contribuição M', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop', desc: 'Uma diária a mais no paraíso — presente e remetente serão lembrados.', valor: 'R$ 200', categoria: 'luademel' },
    { nome: 'Lua de Mel — Contribuição G', img: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Um jantar romântico inesquecível na viagem deles. Que luxo!', valor: 'R$ 450', categoria: 'luademel' },
    { nome: 'Fogão', img: 'https://images.pexels.com/photos/3722212/pexels-photo-3722212.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'O coração da cozinha deles. Onde o amor vai ser temperado.', valor: 'R$ 500', categoria: 'eletro' },
    { nome: 'Smart TV', img: 'https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Filmes, séries e, inevitavelmente, canais de esporte no domingo.', valor: 'R$ 700', categoria: 'eletro' },
    { nome: 'Geladeira', img: 'https://images.pexels.com/photos/6593607/pexels-photo-6593607.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', desc: 'Para gelar a cerveja e guardar o amor — e as marmitas da semana.', valor: 'R$ 800', categoria: 'eletro' },
    { nome: 'Fundo para Casa Própria', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=400&fit=crop', desc: 'O maior sonho do casal. Cada tijolo começa com um real. Obrigado!', valor: 'R$ 1.000', categoria: 'luademel' },
  ];

  const presentesGrid = document.getElementById('presentesGrid');

  function renderPresentes(filter) {
    const filtered = filter === 'all' ? presentes : presentes.filter(p => p.categoria === filter);
    presentesGrid.innerHTML = '';

    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'presente-card fade-in';
      card.innerHTML = `
        <div class="presente-img"><img src="${p.img}" alt="${p.nome}" loading="lazy"></div>
        <div class="presente-info">
          <h3>${p.nome}</h3>
          <p class="presente-desc">${p.desc}</p>
          <p class="presente-valor">${p.valor}</p>
          <button class="btn-presentear" data-nome="${p.nome}" data-valor="${p.valor}">Quero Presentear</button>
        </div>
      `;
      presentesGrid.appendChild(card);
      setTimeout(() => card.classList.add('visible'), 50 * i);
    });
  }

  renderPresentes('all');

  // ===================== PRESENTES FILTERS =====================
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      renderPresentes(btn.dataset.filter);
    });
  });

  // ===================== PIX PAYLOAD GENERATOR =====================
  function pixTLV(id, val) {
    const len = val.length.toString().padStart(2, '0');
    return id + len + val;
  }

  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  function gerarPixPayload(chave, nome, cidade, valor) {
    const gui = pixTLV('00', 'br.gov.bcb.pix');
    const chaveField = pixTLV('01', chave);
    const merchantAccount = pixTLV('26', gui + chaveField);
    let payload =
      pixTLV('00', '01') +
      merchantAccount +
      pixTLV('52', '0000') +
      pixTLV('53', '986') +
      pixTLV('54', valor) +
      pixTLV('58', 'BR') +
      pixTLV('59', nome) +
      pixTLV('60', cidade) +
      pixTLV('62', pixTLV('05', '***'));
    payload += '6304';
    payload += crc16(payload);
    return payload;
  }

  function gerarQRCode(valor) {
    const valorNum = valor.replace('R$ ', '').replace('.', '').replace(',', '.').trim();
    const valorFormatado = parseFloat(valorNum).toFixed(2);
    const payload = gerarPixPayload('05191996933', 'THAIS OU ALEX', 'SANTA ROSA', valorFormatado);
    const qr = qrcode(0, 'M');
    qr.addData(payload);
    qr.make();
    return qr.createImgTag(5, 16);
  }

  // ===================== MODAL PIX =====================
  const pixModal = document.getElementById('pixModal');
  const modalGiftName = document.getElementById('modalGiftName');
  const modalAmount = document.getElementById('modalAmount');
  const modalQr = document.getElementById('modalQr');
  let currentPixPayload = '';

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-presentear')) {
      modalGiftName.textContent = e.target.dataset.nome;
      modalAmount.textContent = e.target.dataset.valor;
      const valorStr = e.target.dataset.valor;
      const valorNum = valorStr.replace('R$ ', '').replace('.', '').replace(',', '.').trim();
      const valorFormatado = parseFloat(valorNum).toFixed(2);
      currentPixPayload = gerarPixPayload('05191996933', 'THAIS OU ALEX', 'SANTA ROSA', valorFormatado);
      modalQr.innerHTML = gerarQRCode(valorStr);
      pixModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  pixModal.addEventListener('click', (e) => {
    if (e.target === pixModal) closeModal();
  });

  function closeModal() {
    pixModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('btnCopy').addEventListener('click', () => {
    const pixKey = document.getElementById('pixKey').textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
      const btn = document.getElementById('btnCopy');
      btn.textContent = 'Copiado!';
      setTimeout(() => { btn.textContent = 'Copiar Chave PIX'; }, 2000);
    });
  });

  document.getElementById('btnCopyPayload').addEventListener('click', () => {
    navigator.clipboard.writeText(currentPixPayload).then(() => {
      const btn = document.getElementById('btnCopyPayload');
      btn.textContent = 'Copiado!';
      setTimeout(() => { btn.textContent = 'Copiar PIX Copia e Cola'; }, 2000);
    });
  });

  // ===================== RSVP =====================
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('rsvpName').value.trim();
    const phone = document.getElementById('rsvpPhone').value.trim();
    const guests = document.getElementById('rsvpGuests').value;
    const attending = document.getElementById('rsvpAttending').value;
    const message = document.getElementById('rsvpMessage').value.trim();

    if (!nome || !phone || !guests || !attending) return;

    let mensagem;
    if (attending === 'sim') {
      mensagem = `Olá! Sou *${nome}* e *confirmo presença* no casamento de Thais e Alex! 💒\n`;
      mensagem += `📱 Meu WhatsApp: ${phone}\n`;
      mensagem += `👥 Total de pessoas: *${guests}*\n`;
    } else {
      mensagem = `Olá! Sou *${nome}* e infelizmente *não poderei comparecer* ao casamento de Thais e Alex. Desejo toda felicidade ao casal! 💕\n`;
      mensagem += `📱 Meu WhatsApp: ${phone}\n`;
    }

    if (message) {
      mensagem += `\n💌 Mensagem: ${message}`;
    }

    const encoded = encodeURIComponent(mensagem);
    window.open(`https://wa.me/555584549532?text=${encoded}`, '_blank');

    rsvpForm.hidden = true;
    rsvpSuccess.hidden = false;
    document.querySelector('.rsvp-deadline').style.display = 'none';

    if (attending === 'nao') {
      document.getElementById('rsvpSuccessMsg').textContent = 'Sentiremos sua falta! Desejamos tudo de bom. 💛';
    }
  });

  // ===================== SCROLL ANIMATIONS =====================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  document.querySelectorAll('.cerimonia-item, .historia-text, .historia-image, .galeria-item, .rsvp-form, .padrinho-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

});
