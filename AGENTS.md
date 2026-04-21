# AGENTS.md

## Project overview
This repo is an interactive book-branch narrative product.
The architecture must preserve separation of concerns:

- useNarrativeStore = narrative business truth only
- useWorldStore = world state truth only
- useGraphStore = graph visualization state only
- useSessionStore = session/book/meta only
- graphBuilder = pure mapping from narrative nodes to graph nodes/edges

## Product goals
Implement a complete front-end shell for:
- left panel: book/session input
- center panel: branch graph
- right panel: narrative/chat panel
- optional bottom tray: world state panel

## Hard constraints
- Do not collapse all logic into page.tsx
- Do not move business truth into graph store
- Do not duplicate state across stores
- Do not rewrite store contracts unless strictly necessary
- Prefer incremental, reviewable changes
- Preserve TypeScript correctness
- Prefer reusable components over monolithic files

## Required components
- AppShell
- BookInputPanel
- GraphStage
- NarrativePanel
- NodeDetailsOverlay
- WorldStatePanel

## Interaction requirements
- selecting a graph node highlights it
- current narrative node stays in sync with graph highlight
- choices in chat can advance narrative
- world state updates render in panel
- layout must be responsive

## Verification
Before considering work done:
- project builds successfully
- no TypeScript errors
- no broken imports
- page renders without runtime crash
- components are split into logical files