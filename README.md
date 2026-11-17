# Lista de Tarefas

Aplicativo mobile desenvolvido com React Native, Expo e TypeScript para
adicionar tarefas e marcar as que foram concluídas.

## Executar

```bash
npm install
npm start
```

Use o Expo Go para abrir o aplicativo no celular ou execute `npm run android`
ou `npm run ios` para iniciar no emulador correspondente.

## Estrutura

- `src/features/tasks/screens`: tela e gerenciamento do estado da tarefa.
- `src/features/tasks/components`: formulário, lista e item de tarefa.
- `src/features/tasks/hooks`: reducer e hook para as tarefas.
- `src/features/tasks/types`: tipo compartilhado da tarefa.

O texto do formulário usa `useState`; a lista de tarefas usa `useReducer` com
ações explícitas para adicionar e concluir itens. `React.memo` evita
renderizações desnecessárias dos componentes da lista e do formulário; `useCallback`
mantém estáveis os callbacks e `useMemo` calcula a quantidade de tarefas
pendentes.

Execute `npm run typecheck` para verificar os tipos TypeScript.