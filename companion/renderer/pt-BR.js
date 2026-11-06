(() => {
const dict={"Remember this for next time?":"Quer lembrar disso na próxima vez?","Keep":"Manter","Skip":"Pular","What should I do?":"O que devo fazer?","Live call":"Chamada ao vivo","Assist":"Ajudar","Say next":"Dizer próxima frase","Objection":"Objeção","Numbers":"Números","Follow-ups":"Perguntas de acompanhamento","Recap":"Resumo","Rehearsal":"Ensaio","Pre-call brief":"Resumo pré-reunião","Start rehearsal":"Começar ensaio","Score me":"Avaliar meu desempenho","Ask Nūs anything, or":"Pergunte qualquer coisa ao Nūs ou","for What should I do?":"para perguntar o que devo fazer","Nūs idle":"Nūs em espera","Quietly available":"Disponível quando precisar","Checking Nūs desktop context…":"Verificando contexto do aplicativo Nūs…","Smart answers":"Respostas inteligentes","Off by default. On: every reply uses the slower, stronger model.":"Desativado por padrão. Quando ativado, cada resposta usa um modelo mais potente e lento.","Ask shortcut":"Atalho para perguntar","runs \"What should I do?\" from anywhere":"faz a pergunta \"O que devo fazer?\" em qualquer janela","Ask":"Perguntar","Reset":"Redefinir","Click the shortcut, then press a new key combination.":"Clique no atalho e pressione uma nova combinação de teclas.","Models":"Modelos","fast = Smart off · smart = Smart on":"rápido = modo inteligente desligado · avançado = modo inteligente ligado","Fast":"Rápido","Smart":"Avançado","Privacy and sessions":"Privacidade e sessões","Let the Knot read your semester when answering with AI":"Permitir que o Knot consulte seu semestre ao responder com IA","Report answers back to the Nūs desktop brain":"Enviar respostas para o aplicativo Nūs","Save transcripts to history":"Salvar transcrições no histórico","Keep session audio":"Manter áudio das sessões","Full stealth when hidden":"Modo invisível ao ocultar","Rehearsal and briefing packs":"Ensaios e materiais de preparação","Speak replies":"Ler respostas em voz alta","Live pack":"Material da reunião","Spar pack":"Material de ensaio","No pack loaded.":"Nenhum material carregado.","Reload packs":"Recarregar materiais","Résumé":"Currículo","Résumé / professional background":"Currículo / experiência profissional","stored locally; sent to your selected provider with each request":"salvo localmente; enviado ao provedor escolhido em cada solicitação","Maximum 12,000 characters":"Máximo de 12.000 caracteres","Clear résumé":"Limpar currículo","Back":"Voltar","Next":"Avançar","Done":"Concluir","Settings":"Configurações"};
function tr(n){const raw=n.nodeValue;if(!raw||!raw.trim())return;const lead=raw.match(/^\s*/)[0],tail=raw.match(/\s*$/)[0],key=raw.trim();if(dict[key])n.nodeValue=lead+dict[key]+tail;}
function walk(el){for(const a of ['placeholder','title','aria-label']){const v=el.getAttribute&&el.getAttribute(a);if(v&&dict[v])el.setAttribute(a,dict[v]);}for(const n of el.childNodes||[]){if(n.nodeType===3)tr(n);else if(n.nodeType===1)walk(n);}}
function run(){document.documentElement.lang='pt-BR';walk(document.body);}
run();new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')tr(m.target);for(const n of m.addedNodes||[])if(n.nodeType===3)tr(n);else if(n.nodeType===1)walk(n);}}).observe(document.body,{subtree:true,childList:true,characterData:true});
})();
(() => {
const dict={
'Checking Nūs desktop context…':'Verificando o contexto do aplicativo Nūs…',
'Smart answers':'Respostas inteligentes',
'Off by default. On: every reply uses the slower, stronger model.':'Desativado por padrão. Ativado: cada resposta usa um modelo mais potente e lento.',
'Ask shortcut':'Atalho para perguntar',
'runs "What should I do?" from anywhere':'faz a pergunta "O que devo fazer?" em qualquer janela',
'Ask':'Perguntar','Reset':'Redefinir',
'Click the shortcut, then press a new key combination.':'Clique no atalho e pressione uma nova combinação de teclas.',
'Models':'Modelos','fast = Smart off · smart = Smart on':'rápido = modo inteligente desligado · avançado = modo inteligente ligado',
'Fast':'Rápido','Smart':'Avançado','Privacy and sessions':'Privacidade e sessões',
'Let the Knot read your semester when answering with AI':'Permitir que o Knot consulte seu semestre ao responder com IA',
'Off by default. On: your courses, tasks, and deadlines ride along to your chosen AI provider so answers can reference them. Off: the "What should I do?" tile still works fully on this machine.':'Desativado por padrão. Quando ativado, suas matérias, tarefas e prazos são enviados ao provedor de IA escolhido para contextualizar as respostas. Quando desativado, a função "O que devo fazer?" continua funcionando localmente.',
'Report answers back to the Nūs desktop brain':'Enviar respostas para o aplicativo Nūs',
'Off by default. Saves finished answers to a local file the Nūs desktop app reads. Stays on this machine.':'Desativado por padrão. Salva as respostas concluídas em um arquivo local lido pelo aplicativo Nūs. Os dados permanecem neste computador.',
'Save transcripts to history':'Salvar transcrições no histórico',
'On by default. Every capture session lands in the desktop app, searchable and uploadable to your Jarvis vault from the Knot section.':'Ativado por padrão. As sessões ficam disponíveis no aplicativo para pesquisa e envio ao seu cofre pela seção Knot.',
'Keep session audio':'Manter áudio das sessões',
'Off by default. Retains voice-activated WAV audio per session for 30 days. Audio is the storage-heavy part.':'Desativado por padrão. Mantém os arquivos de áudio WAV de cada sessão por 30 dias. Os áudios ocupam mais espaço.',
'Résumé':'Currículo','Résumé / professional background':'Currículo / experiência profissional',
'stored locally; sent to your selected provider with each request':'salvo localmente; enviado ao provedor escolhido em cada solicitação',
'Maximum 12,000 characters':'Máximo de 12.000 caracteres','Clear résumé':'Limpar currículo',
'Privacy':'Privacidade','Device-first knowledge':'Dados armazenados primeiro no dispositivo',
'Checking Nūs desktop context…':'Verificando o contexto do aplicativo Nūs…',
'Start listening':'Começar a ouvir','Turn off Companion':'Desativar Companion',
'Open in desktop':'Abrir no aplicativo','No pack loaded.':'Nenhum material carregado.'
};
function tr(node){const raw=node.nodeValue;if(!raw||!raw.trim())return;const lead=raw.match(/^\s*/)[0],tail=raw.match(/\s*$/)[0],key=raw.trim();if(dict[key])node.nodeValue=lead+dict[key]+tail;}
function walk(el){for(const a of ['placeholder','title','aria-label']){const v=el.getAttribute&&el.getAttribute(a);if(v&&dict[v])el.setAttribute(a,dict[v]);}for(const n of el.childNodes||[]){if(n.nodeType===3)tr(n);else if(n.nodeType===1)walk(n);}}
walk(document.body);new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')tr(m.target);for(const n of m.addedNodes||[])if(n.nodeType===3)tr(n);else if(n.nodeType===1)walk(n);}}).observe(document.body,{subtree:true,childList:true,characterData:true});
})();