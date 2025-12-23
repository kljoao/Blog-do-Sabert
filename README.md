# App de Blogging Educacional

Aplicativo mobile desenvolvido em React Native (Expo) para gerenciamento de um sistema de blogging educacional, permitindo que professores criem e gerenciem conteúdo enquanto estudantes podem visualizar e consumir esse conteúdo.

## Tecnologias Utilizadas

- **Expo SDK 51** - Framework para desenvolvimento React Native
- **React Native 0.74** - Framework mobile
- **React Navigation 6** - Navegação entre telas (Stack e Bottom Tabs)
- **Zustand 4** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para requisições à API
- **AsyncStorage** - Persistência local de dados (token, usuário)
- **Expo Vector Icons** - Ícones do Ionicons

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm`
- **Expo CLI** - `npm install -g expo-cli`
- **Backend API** rodando em `http://localhost:3000`

### Para desenvolvimento mobile:

- **Expo Go** (app no celular) - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- OU Android Studio / Xcode para emuladores

## Setup Inicial

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd native
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure a URL da API

Edite o arquivo `src/api/axios.config.js` e ajuste a URL base se necessário:

```javascript
const API_BASE_URL = 'http://localhost:3000'; // ou URL do seu backend
```

**Importante:** Se você estiver testando em um dispositivo físico, substitua `localhost` pelo IP da sua máquina na rede local (ex: `http://192.168.1.10:3000`).

### 4. Inicie o servidor Expo

```bash
pnpm start
```

### 5. Execute no dispositivo/emulador

- Pressione `i` para iOS (requer macOS + Xcode)
- Pressione `a` para Android (requer Android Studio)
- Escaneie o QR code com o app Expo Go no seu celular

## Estrutura do Projeto

```
native/
├── src/
│   ├── api/                      # Configuração e serviços de API
│   │   ├── axios.config.js       # Configuração do Axios + interceptors
│   │   ├── auth.api.js           # Endpoints de autenticação
│   │   ├── posts.api.js          # Endpoints de posts
│   │   ├── teachers.api.js       # Endpoints de professores
│   │   └── students.api.js       # Endpoints de estudantes
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Button.jsx            # Botão customizado
│   │   ├── Input.jsx             # Campo de input
│   │   ├── PostCard.jsx          # Card de post
│   │   ├── SearchBar.jsx         # Barra de busca
│   │   ├── Loading.jsx           # Indicador de loading
│   │   └── Header.jsx            # Header de navegação
│   │
│   ├── navigation/               # Navegação
│   │   ├── AppNavigator.jsx      # Navegador raiz (auth/main switch)
│   │   ├── AuthNavigator.jsx     # Stack de autenticação
│   │   └── AdminNavigator.jsx    # Stack administrativo (professores)
│   │
│   ├── screens/                  # Telas da aplicação
│   │   ├── auth/
│   │   │   └── LoginScreen.jsx
│   │   ├── posts/
│   │   │   ├── PostListScreen.jsx
│   │   │   ├── PostDetailScreen.jsx
│   │   │   ├── CreatePostScreen.jsx
│   │   │   ├── EditPostScreen.jsx
│   │   │   └── AdminPostsScreen.jsx
│   │   ├── teachers/
│   │   │   ├── TeacherListScreen.jsx
│   │   │   ├── CreateTeacherScreen.jsx
│   │   │   └── EditTeacherScreen.jsx
│   │   └── students/
│   │       ├── StudentListScreen.jsx
│   │       ├── CreateStudentScreen.jsx
│   │       └── EditStudentScreen.jsx
│   │
│   ├── store/                    # Zustand stores
│   │   ├── authStore.js          # Estado de autenticação
│   │   ├── postsStore.js         # Estado de posts
│   │   ├── teachersStore.js      # Estado de professores
│   │   └── studentsStore.js      # Estado de estudantes
│   │
│   ├── styles/                   # Estilos
│   │   ├── theme.js              # Tema (cores, fontes, espaçamentos)
│   │   └── globalStyles.js       # Estilos globais reutilizáveis
│   │
│   └── utils/                    # Utilitários
│       ├── constants.js          # Constantes (endpoints, storage keys)
│       └── validators.js         # Validações de formulários
│
├── assets/                       # Recursos estáticos
├── App.js                        # Ponto de entrada
├── app.json                      # Configuração do Expo
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## Arquitetura

### Fluxo de Autenticação

1. **Login** (`LoginScreen`) → usuário insere email/senha
2. **API** (`auth.api.js`) → faz POST para `/auth/login`
3. **Store** (`authStore`) → salva token + dados do usuário no AsyncStorage
4. **Navegação** (`AppNavigator`) → detecta `isAuthenticated = true` e exibe MainTabs

### Gerenciamento de Estado (Zustand)

Cada domínio (auth, posts, teachers, students) possui seu próprio store com:

- **Estado**: dados, loading, error, etc
- **Ações**: métodos para atualizar o estado (login, logout, setPosts, etc)

```javascript
// Exemplo de uso
import useAuthStore from './store/authStore';

const { user, login, logout } = useAuthStore();
```

### Sistema de Navegação

```
AppNavigator (root)
├── AuthNavigator (não autenticado)
│   └── LoginScreen
│
└── MainTabs (autenticado)
    ├── PostsTab (Stack Navigator)
    │   ├── PostListScreen
    │   ├── PostDetailScreen
    │   ├── CreatePostScreen (só professor)
    │   └── EditPostScreen (só professor)
    │
    ├── AdminTab (só professor, Stack Navigator)
    │   ├── AdminPostsScreen
    │   ├── TeacherListScreen → CreateTeacher / EditTeacher
    │   └── StudentListScreen → CreateStudent / EditStudent
    │
    └── ProfileTab
        └── ProfileScreen (logout)
```

## Funcionalidades

### Para Estudantes (role: 'student')

- Login no sistema
- Visualizar lista de posts
- Buscar posts por palavras-chave
- Ler conteúdo completo de posts
- Visualizar perfil e fazer logout

### Para Professores (role: 'teacher')

**Todas as funcionalidades de estudantes +**

#### Gerenciamento de Posts
- Criar novos posts
- Editar posts existentes
- Excluir posts
- Visualizar lista administrativa de todos os posts

#### Gerenciamento de Professores
- Listar professores (paginado)
- Criar novos professores
- Editar dados de professores
- Excluir professores

#### Gerenciamento de Estudantes
- Listar estudantes (paginado)
- Criar novos estudantes
- Editar dados de estudantes
- Excluir estudantes

## Guia de Uso

### Login

1. Abra o aplicativo
2. Insira email e senha
3. Clique em "Entrar"
4. Você será redirecionado para a tela principal

**Credenciais de teste** (configure no seu backend):
- Professor: `professor@exemplo.com` / senha
- Estudante: `estudante@exemplo.com` / senha

### Navegação

- **Posts Tab**: Lista de posts, busca e leitura
- **Admin Tab** (só professores): Gerenciamento completo
- **Perfil Tab**: Informações do usuário + logout

### Criar um Post (Professor)

1. Na aba "Posts", toque no ícone `+` no canto superior direito
2. Preencha título, autor e conteúdo
3. Clique em "Criar Post"
4. O post será adicionado à lista

### Editar/Excluir Post (Professor)

**Opção 1:** Dentro do post
- Toque no post para ver detalhes
- Use os botões "Editar" ou "Excluir"

**Opção 2:** Na tela administrativa
- Vá para "Admin" → primeira opção (Gerenciar Posts)
- Use os ícones de editar/excluir em cada post

### Gerenciar Professores/Estudantes (Professor)

1. Vá para a aba "Admin"
2. Escolha "Professores" ou "Estudantes"
3. Use o ícone `+` para adicionar novo
4. Use os ícones de editar/excluir em cada item

## API Endpoints Utilizados

### Autenticação
```
POST   /auth/login          # Login de usuário
GET    /auth/me             # Obter usuário atual (opcional)
```

### Posts
```
GET    /posts               # Listar posts (query: ?search=termo)
GET    /posts/:id           # Obter post por ID
POST   /posts               # Criar post
PUT    /posts/:id           # Atualizar post
DELETE /posts/:id           # Deletar post
```

### Professores
```
GET    /teachers            # Listar professores (query: ?page=1&limit=10)
GET    /teachers/:id        # Obter professor por ID
POST   /teachers            # Criar professor
PUT    /teachers/:id        # Atualizar professor
DELETE /teachers/:id        # Deletar professor
```

### Estudantes
```
GET    /students            # Listar estudantes (query: ?page=1&limit=10)
GET    /students/:id        # Obter estudante por ID
POST   /students            # Criar estudante
PUT    /students/:id        # Atualizar estudante
DELETE /students/:id        # Deletar estudante
```

## Validações Implementadas

### Login
- Email obrigatório e formato válido
- Senha obrigatória (mínimo 6 caracteres)

### Posts
- Título obrigatório
- Conteúdo obrigatório
- Autor obrigatório

### Professores
- Nome obrigatório
- Email obrigatório e formato válido
- Disciplina obrigatória

### Estudantes
- Nome obrigatório
- Email obrigatório e formato válido
- Matrícula obrigatória

## Tratamento de Erros

- **Erros de rede**: Exibidos via Alert nativo
- **Erros de validação**: Destacados em vermelho abaixo dos campos
- **Token expirado (401)**: Logout automático
- **Sem permissão (403)**: Mensagem de erro

## Persistência de Dados

Os seguintes dados são salvos localmente no AsyncStorage:

- `@auth_token`: JWT token de autenticação
- `@user_data`: Dados do usuário (nome, email, etc)
- `@user_type`: Tipo do usuário ('teacher' ou 'student')

Ao abrir o app, ele verifica automaticamente se há um token válido e faz login automático.

## Troubleshooting

### Problema: Não consegue conectar à API

**Solução:**
- Verifique se o backend está rodando em `http://localhost:3000`
- Se estiver em dispositivo físico, use o IP da máquina (ex: `http://192.168.1.10:3000`)
- Edite `src/api/axios.config.js` com a URL correta

### Problema: Erro ao fazer login

**Soluções possíveis:**
- Verifique as credenciais
- Confirme que o backend está respondendo
- Verifique os logs do backend para erros
- Teste o endpoint `/auth/login` via Postman/Insomnia

### Problema: App não atualiza após mudanças no código

**Solução:**
- Pressione `r` no terminal do Expo para reload
- Ou shake o dispositivo e escolha "Reload"
- Limpe o cache: `pnpm start --clear`

### Problema: Ícones não aparecem

**Solução:**
- Aguarde o download completo das fontes
- Reinicie o app
- Verifique a conexão com internet

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
pnpm start

# Executar no Android
pnpm android

# Executar no iOS
pnpm ios

# Executar no navegador
pnpm web
```

## Melhorias Futuras (Opcional)

- [ ] Adicionar comentários em posts
- [ ] Implementar sistema de busca avançada
- [ ] Adicionar fotos de perfil
- [ ] Notificações push
- [ ] Modo offline com sincronização
- [ ] Tema escuro (dark mode)
- [ ] Filtros e ordenação nas listagens
- [ ] Testes automatizados (Jest + React Native Testing Library)
- [ ] CI/CD para builds automáticos

## Contribuidores

- [Seu Nome / Nome do Grupo]

## Licença

Este projeto foi desenvolvido para fins educacionais como parte do Tech Challenge - FIAP.

---

**Desenvolvido com Expo + React Native**
