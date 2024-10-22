# Projeto de Dashboard Financeiro

Este projeto é um dashboard financeiro desenvolvido com Next.js e Chakra UI. O objetivo é permitir que os usuários analisem saldos, receitas, despesas, transações pendentes e o histórico de transações.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **Chakra UI**: Biblioteca de componentes React para estilização.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
/src
  /app
    /dashboard        # Página do Dashboard
      /page.tsx
    /login            # Página de Login
      /page.tsx
    /layout.tsx       # Layout global da aplicação
  /components         # Componentes reutilizáveis
    /AuthContext.tsx  # Contexto de autenticação
  /styles             # Estilos globais
    /global.css       # CSS global da aplicação
```

## Instruções de Instalação

Siga as etapas abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone <URL do repositório>
   cd financeiro
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse o aplicativo:**

   Abra seu navegador e vá para `http://localhost:3000`.

## Instruções de Uso

1. **Login:** Acesse a página de login em `http://localhost:3000/login` e use as seguintes credenciais para testar:

   - Nome de Usuário: `user`
   - Senha: `password`

2. **Dashboard:** Após o login, você será redirecionado para a página do dashboard, onde poderá visualizar as informações financeiras.

## Observações

- Este projeto utiliza um sistema de autenticação simulado com estado local. A autenticação real pode ser implementada conforme necessário.
- Você pode expandir o projeto adicionando mais funcionalidades, como a persistência de dados e gráficos dinâmicos.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Para isso, faça um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.