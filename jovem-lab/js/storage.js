/**
 * ============================================================
 * JOVEM LAB - storage.js
 * Módulo de Banco de Dados Local (LocalStorage)
 * Responsabilidade: toda leitura/escrita de dados persistidos
 * ============================================================
 */

const DB = {
  // Chaves usadas no LocalStorage
  KEYS: {
    USUARIOS:  'jovemlab_usuarios',
    CONTEUDOS: 'jovemlab_conteudos',
    INICIADO:  'jovemlab_db_init'
  },

  // ----------------------------------------------------------
  // INICIALIZAÇÃO
  // Popula o banco com dados exemplo se ainda não existir
  // ----------------------------------------------------------
  init() {
    // 🔥 MODO DESENVOLVIMENTO (sempre atualiza)
    this._salvarConteudos(this._dadosIniciais());
    this._salvarUsuarios([]);
  
    console.log('[JovemLab DB] Atualizado automaticamente.');
  },

  // ----------------------------------------------------------
  // USUÁRIOS
  // ----------------------------------------------------------

  /** Retorna lista de todos os usuários */
  getUsuarios() {
    return JSON.parse(localStorage.getItem(this.KEYS.USUARIOS) || '[]');
  },

  /** Cadastra novo usuário. Retorna {ok, msg} */
  cadastrarUsuario({ nome, email, senha }) {
    const usuarios = this.getUsuarios();
    if (usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, msg: 'Este e-mail já está cadastrado.' };
    }
    const novoUsuario = {
      id:      Date.now(),
      nome:    nome.trim(),
      email:   email.trim().toLowerCase(),
      // Em produção, NUNCA armazene senha em texto claro — use hash
      senha:   btoa(senha),
      dataCadastro: new Date().toISOString()
    };
    usuarios.push(novoUsuario);
    this._salvarUsuarios(usuarios);
    return { ok: true, msg: 'Cadastro realizado com sucesso!', usuario: novoUsuario };
  },

  /** Busca usuário por email */
  buscarUsuarioPorEmail(email) {
    return this.getUsuarios().find(u => u.email === email.toLowerCase()) || null;
  },

  _salvarUsuarios(lista) {
    localStorage.setItem(this.KEYS.USUARIOS, JSON.stringify(lista));
  },

  // ----------------------------------------------------------
  // CONTEÚDOS
  // ----------------------------------------------------------

  /** Retorna todos os conteúdos */
  getConteudos() {
    return JSON.parse(localStorage.getItem(this.KEYS.CONTEUDOS) || '[]');
  },

  /** Filtra conteúdos por categoria. '' ou 'todos' retorna todos */
  getConteudosPorCategoria(categoria) {
    const todos = this.getConteudos();
    if (!categoria || categoria === 'todos') return todos;
    return todos.filter(c => c.categoria.toLowerCase() === categoria.toLowerCase());
  },

  /** Busca conteúdo por ID */
  getConteudoPorId(id) {
    return this.getConteudos().find(c => c.id === Number(id)) || null;
  },

  /** Busca textual em título e descrição */
  buscarConteudos(termo) {
    const t = termo.toLowerCase();
    return this.getConteudos().filter(c =>
      c.titulo.toLowerCase().includes(t) ||
      c.descricao.toLowerCase().includes(t) ||
      c.categoria.toLowerCase().includes(t)
    );
  },

  _salvarConteudos(lista) {
    localStorage.setItem(this.KEYS.CONTEUDOS, JSON.stringify(lista));
  },

  // ----------------------------------------------------------
  // DADOS INICIAIS DE EXEMPLO
  // ----------------------------------------------------------
  _dadosIniciais() {
    return [
      // ---- VAGAS E TRABALHOS --------------------------------
      {
        id: 1,
        titulo: 'Mentir no Curriculo vale a pena?',
        descricao: 'Há casos em que mentir no currículo é crime, mas não é a regra.',
        categoria: 'Curriculo',
        icone: '📄',
        cor: 'cat-azul',
        destaque: true,
        dataPublicacao: '',
        tempoLeitura: '5 min',
        conteudo: `
          <p>"Mentir no currículo pode parecer uma saída rápida, mas os riscos são altos. Entenda por que a honestidade é sempre a melhor estratégia e como valorizar suas habilidades sem precisar inventar experiências."</p>

          <h3>Porque mentir no curriculo pode ser prejudicial<\h3>
          
          <p>Mentir no currículo pode parecer, à primeira vista, uma solução rápida para aumentar as chances de conseguir um emprego, mas essa prática traz consequências sérias, tanto do ponto de vista ético quanto profissional. Em um mercado de trabalho cada vez mais competitivo e transparente, a honestidade deixou de ser apenas uma virtude moral e passou a ser um requisito estratégico para construir uma carreira sólida e sustentável.</p>
        

          <div class="destaque-box"><p>💡 <strong>Dica:</strong> Em primeiro lugar, é importante entender que o currículo é, essencialmente, um retrato profissional.</p></div>

          <h2>Por que eu não mentiria no curriculo?</h2>
          <p>Ele representa não apenas suas experiências e habilidades, mas também sua credibilidade. Quando alguém inclui informações falsas — como cursos que nunca fez, cargos que nunca ocupou ou habilidades que não domina — está criando uma base frágil para sua trajetória. Mesmo que a mentira ajude a conquistar uma vaga inicialmente, ela dificilmente se sustenta ao longo do tempo. Processos seletivos modernos frequentemente incluem etapas de verificação, como checagem de referências, testes práticos e validação de certificados, o que aumenta significativamente o risco de a falsidade ser descoberta.</p>
        
          <h2>E se eu conseguir o emprego?</h2>
          <p>Outro ponto relevante é o impacto interno dessa prática. Sustentar uma mentira exige esforço constante: a pessoa precisa lembrar do que disse, evitar contradições e, muitas vezes, lidar com tarefas para as quais não está preparada. Isso gera ansiedade, insegurança e estresse, prejudicando o desempenho e o bem-estar no ambiente de trabalho. Em contraste, a honestidade permite que o profissional atue com mais confiança, reconhecendo suas limitações e buscando aprendizado real.</p>
          <img src="assets/images/slideLucas.jpg" alt="curriculo" style="width:100%; border-radius:10px; margin:20px 0;">
          `
      },
      {
        id: 2,
        titulo: 'Currículo para primeiro emprego: guia completo',
        descricao: 'Aprenda a criar um currículo atrativo mesmo sem experiência profissional anterior.',
        categoria: 'Vagas',
        icone: '📄',
        cor: 'cat-azul',
        destaque: false,
        dataPublicacao: '2024-12-05',
        tempoLeitura: '7 min',
        videoId: 'Yw3T3xh6r8E',
        conteudo: `
          <p>Criar um currículo para o primeiro emprego é um desafio comum: como mostrar seu valor se você não tem experiência profissional formal? A resposta está em valorizar tudo o que você já fez — e apresentar isso de forma estratégica.</p>

          <h2>Estrutura recomendada</h2>
          <ul>
            <li><strong>Dados pessoais:</strong> nome, cidade, telefone, e-mail profissional</li>
            <li><strong>Objetivo profissional:</strong> uma frase clara sobre o que você busca</li>
            <li><strong>Formação acadêmica</strong></li>
            <li><strong>Cursos e certificados</strong></li>
            <li><strong>Habilidades</strong></li>
            <li><strong>Experiências voluntárias / projetos pessoais</strong></li>
            <li><strong>Idiomas</strong></li>
          </ul>

          <div class="destaque-box"><p>✅ Mantenha o currículo em <strong>uma página</strong> para vagas de primeiro emprego. Objetividade é sua melhor amiga.</p></div>

          <h2>E se eu não tiver experiência?</h2>
          <p>Coloque tudo que demonstre responsabilidade e aprendizado: trabalhos voluntários, participação em projetos escolares, cursos online, trabalhos de bairro. Recrutadores de primeiro emprego buscam atitude, não histórico.</p>

          <h2>Erros que custam entrevistas</h2>
          <ul>
            <li>Foto inadequada ou sem foto</li>
            <li>Email inapropriado (ex: gatinhofofinhoo@...)</li>
            <li>Erros de ortografia</li>
            <li>Currículo com mais de 2 páginas</li>
            <li>Informações falsas ou exageradas</li>
          </ul>
        `
      },

      // ---- DICAS PARA ENTREVISTAS ---------------------------
      {
        id: 3,
        titulo: '10 perguntas clássicas de entrevista e como respondê-las',
        descricao: 'Prepare-se para as perguntas mais frequentes nas entrevistas e se destaque na seleção.',
        categoria: 'Entrevistas',
        icone: '🎯',
        cor: 'cat-laranja',
        destaque: true,
        dataPublicacao: '2024-12-10',
        tempoLeitura: '8 min',
        videoId: 'HG68Ymazo18',
        conteudo: `
          <p>A maioria das entrevistas de emprego seguem um roteiro previsível. Ao preparar respostas claras para as perguntas mais comuns, você entra na sala com mais confiança e naturalidade.</p>

          <h2>As 10 perguntas mais frequentes</h2>

          <h3>1. "Fale um pouco sobre você"</h3>
          <p>Esta não é uma autobiografia — é seu pitch profissional. Mencione formação, interesses ligados à vaga e o que você busca profissionalmente. Seja breve (1–2 minutos).</p>

          <h3>2. "Quais são seus pontos fortes?"</h3>
          <p>Escolha 2–3 qualidades diretamente relacionadas à vaga e dê exemplos concretos de cada uma.</p>

          <h3>3. "Qual é o seu maior ponto fraco?"</h3>
          <p>Seja honesto, mas mostre que você está trabalhando para melhorar. Ex.: "Costumava ter dificuldade com prazos, então comecei a usar lista de tarefas e melhorei muito."</p>

          <h3>4. "Por que quer trabalhar aqui?"</h3>
          <p>Pesquise a empresa antes! Mencione valores, projetos ou produtos que você admira. Demonstra interesse genuíno.</p>

          <h3>5. "Onde você se vê em 5 anos?"</h3>
          <p>Mostre ambição realista e alinhada à área. Não precisa ter a resposta exata — demonstre desejo de crescer.</p>

          <div class="destaque-box"><p>🎯 <strong>Técnica STAR:</strong> responda perguntas comportamentais descrevendo a <strong>S</strong>ituação, a <strong>T</strong>arefa, a <strong>A</strong>ção que você tomou e o <strong>R</strong>esultado obtido.</p></div>

          <h3>6. "Tem experiência com...?"</h3>
          <p>Se não tem, seja honesto e mostre disposição para aprender. Lembre-se: empresas que contratam jovens esperam curva de aprendizado.</p>

          <h3>7. "Por que deixou o emprego anterior?" (se aplicável)</h3>
          <p>Nunca fale mal de empregadores anteriores. Foque no que você busca, não no que fugia.</p>

          <h3>8. "Qual sua pretensão salarial?"</h3>
          <p>Pesquise a faixa do mercado antes. Você pode responder com uma faixa ou dizer que está aberto a negociar conforme os benefícios.</p>

          <h3>9. "Tem alguma dúvida para nós?"</h3>
          <p>SEMPRE tenha perguntas! Demonstra interesse. Pergunte sobre cultura, equipe, próximos passos.</p>

          <h3>10. "Por que devemos te contratar?"</h3>
          <p>Conecte suas habilidades e motivação diretamente às necessidades da vaga. Este é seu momento de brilhar!</p>
        `
      },
      {
        id: 4,
        titulo: 'Como se vestir para uma entrevista de emprego',
        descricao: 'A primeira impressão conta muito. Saiba o que usar em cada tipo de processo seletivo.',
        categoria: 'Entrevistas',
        icone: '👔',
        cor: 'cat-laranja',
        destaque: false,
        dataPublicacao: '2024-12-12',
        tempoLeitura: '4 min',
        videoId: '5MgBikgcWnY',
        conteudo: `
          <p>A roupa que você escolhe para uma entrevista comunica muito antes mesmo de você dizer uma palavra. Não se trata de gastar muito, mas de escolher com inteligência.</p>

          <h2>Leia a cultura da empresa</h2>
          <p>Cada empresa tem um perfil diferente:</p>
          <ul>
            <li><strong>Corporativo / banco / jurídico:</strong> social clássico — camisa, calça social, sapato</li>
            <li><strong>Startup / tech:</strong> smart casual — calça jeans sem rasgo, camisa polo ou camisa social sem gravata</li>
            <li><strong>Varejo / atendimento:</strong> limpo e arrumado — roupas simples mas bem cuidadas</li>
          </ul>

          <div class="destaque-box"><p>👁️ Uma boa regra: vista-se <strong>um nível acima</strong> do que você imagina ser o dia a dia da empresa. Melhor pecar pelo excesso do que pelo descuido.</p></div>

          <h2>Regras gerais</h2>
          <ul>
            <li>Roupa limpa, passada e sem manchas</li>
            <li>Evite perfumes fortes</li>
            <li>Cabelo arrumado</li>
            <li>Unhas limpas</li>
            <li>Menos é mais em acessórios</li>
            <li>Sapatos limpos e conservados</li>
          </ul>

          <h2>Entrevista online: também importa!</h2>
          <p>Mesmo em chamadas de vídeo, a aparência conta. Além da roupa, cuide do fundo da câmera — limpo, neutro — e da iluminação. Um fundo bagunçado ou iluminação ruim transmite descuido.</p>
        `
      },

      // ---- PRIMEIRO EMPREGO --------------------------------
      {
        id: 5,
        titulo: 'Seus direitos no primeiro emprego: o que saber',
        descricao: 'Conheça a CLT, carteira assinada, FGTS e tudo que você precisa saber antes de assinar.',
        categoria: 'Primeiro Emprego',
        icone: '⚖️',
        cor: 'cat-verde',
        destaque: true,
        dataPublicacao: '2024-12-15',
        tempoLeitura: '6 min',
        videoId: 'lJIrF4YjHfQ',
        conteudo: `
          <p>Antes de assinar qualquer contrato, conhecer seus direitos trabalhistas é fundamental. Muitos jovens entram no mercado sem saber o básico — e acabam aceitando condições desvantajosas sem perceber.</p>

          <h2>Tipos de contrato de trabalho</h2>
          <ul>
            <li><strong>CLT (carteira assinada):</strong> o mais completo, com todos os direitos previstos em lei</li>
            <li><strong>Estágio:</strong> regido pela Lei nº 11.788/2008 — bolsa, não salário; direito a recesso e seguro</li>
            <li><strong>Jovem Aprendiz:</strong> para jovens de 14 a 24 anos, com carteira assinada e jornada reduzida</li>
            <li><strong>PJ (Pessoa Jurídica):</strong> terceirizado, sem vínculo empregatício — atenção aos riscos</li>
          </ul>

          <h2>Direitos garantidos pela CLT</h2>
          <ul>
            <li>Salário mínimo (ou piso da categoria)</li>
            <li>Carteira de Trabalho (CTPS) assinada</li>
            <li>FGTS — 8% do salário depositado mensalmente</li>
            <li>13º salário</li>
            <li>Férias remuneradas (30 dias + ⅓ a mais)</li>
            <li>Hora extra (mínimo 50% a mais)</li>
            <li>Seguro desemprego (em casos de demissão sem justa causa)</li>
            <li>INSS — garantia de aposentadoria futura</li>
          </ul>

          <div class="destaque-box"><p>⚠️ <strong>Atenção:</strong> a carteira de trabalho deve ser assinada no primeiro dia de trabalho ou antes. Trabalhar "na experiência" sem registro é ilegal e você pode buscar seus direitos na Justiça do Trabalho.</p></div>

          <h2>Jovem Aprendiz: vale a pena?</h2>
          <p>O programa Jovem Aprendiz é uma excelente porta de entrada. Você trabalha, aprende, tem carteira assinada e ainda faz cursos profissionalizantes. Muitas empresas efetivam seus aprendizes ao final do contrato.</p>
        `
      },
      {
        id: 6,
        titulo: 'Como se comportar nos primeiros dias de trabalho',
        descricao: 'Impressões iniciais são duradouras. Veja como causar um ótimo impacto desde o começo.',
        categoria: 'Primeiro Emprego',
        icone: '🚀',
        cor: 'cat-verde',
        destaque: false,
        dataPublicacao: '2024-12-18',
        tempoLeitura: '5 min',
        videoId: 'FEGu5EuD4JM',
        conteudo: `
          <p>Os primeiros dias em um novo emprego são decisivos. As pessoas ao redor estão formando uma opinião sobre você — e você está formando uma sobre elas. Aqui estão atitudes que fazem toda a diferença.</p>

          <h2>Antes do primeiro dia</h2>
          <ul>
            <li>Confirme horário, local e o que deve levar</li>
            <li>Pesquise sobre a empresa, seus produtos e cultura</li>
            <li>Planeje sua rota com antecedência (e saia mais cedo!)</li>
            <li>Durma bem na véspera</li>
          </ul>

          <h2>Comportamentos que constroem reputação positiva</h2>
          <ul>
            <li>Chegue sempre no horário — ou antes</li>
            <li>Ouça mais do que fala nos primeiros dias</li>
            <li>Anote tudo que aprender (não confie só na memória)</li>
            <li>Pergunte quando tiver dúvida — é esperado de quem está começando</li>
            <li>Trate todos com o mesmo respeito — da faxineira ao diretor</li>
            <li>Evite usar o celular pessoal em excesso</li>
          </ul>

          <div class="destaque-box"><p>🤝 <strong>Relacionamentos importam:</strong> fazer boas amizades no trabalho torna o dia a dia mais leve e abre portas para o futuro. Seja genuíno e gentil.</p></div>

          <h2>Erros comuns a evitar</h2>
          <ul>
            <li>Fingir que sabe o que não sabe</li>
            <li>Falar mal de colegas ou chefes</li>
            <li>Atrasar entregas ou tarefas sem avisar</li>
            <li>Ignorar feedbacks, mesmo os críticos</li>
            <li>Reclamar de tudo nos primeiros dias</li>
          </ul>
        `
      }
    ];
  }
};

// Exporta como variável global (sem módulos ES, para compatibilidade pura)
window.DB = DB;
