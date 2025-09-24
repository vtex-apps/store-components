# VTEX Store Components - AI Coding Guide

## Project Overview
This is a **VTEX IO app** providing reusable React components for e-commerce stores. Components are distributed as blocks in the VTEX IO platform's block architecture.

## Key Architecture Patterns

### Component Structure
- **Entry point pattern**: Each component has a root file in `react/` (e.g., `ProductPrice.js`) that imports from `react/components/[ComponentName]/index.js`
- **Component directory**: `react/components/[ComponentName]/` contains:
  - `index.js` - Main component implementation
  - `styles.css` - Component-specific styles  
  - `propTypes.js` - PropTypes definitions (for JS components)
  - Optional: `constants/`, `utils/`, `queries/`, `mutations/`, `components/` subdirectories

### VTEX IO Integration
- **CSS Handles**: Use `useCssHandles()` hook with predefined handle arrays for styling customization
- **Store builder**: Components are registered in `store/interfaces.json` with their block names
- **Content schemas**: Configuration UI defined in `store/contentSchemas.json`
- **Dependencies**: VTEX platform dependencies in `manifest.json` (not npm packages)

### Code Conventions
- **Mixed languages**: Legacy components in JavaScript, newer ones in TypeScript
- **Import patterns**: 
  - VTEX modules: `import { useCssHandles } from 'vtex.css-handles'`
  - Internal: `import ProductPrice from './components/ProductPrice/index'`
- **GraphQL**: Apollo client setup for VTEX APIs, queries in `react/graphql/`

## Development Workflows

### Testing
- **Command**: `cd react && yarn test` (not from root)
- **Framework**: `@vtex/test-tools` with React Testing Library
- **Mocks**: Extensive mocks in `react/__mocks__/` for VTEX platform APIs
- **Pattern**: Snapshot testing + unit tests in `react/__tests__/components/`

### Linting & Formatting
- **Root commands**: `yarn lint`, `yarn format`, `yarn verify`
- **Config**: ESLint with `eslint-config-vtex-react`, Prettier with VTEX config
- **Pre-commit**: Husky + lint-staged for automated checks

### Building & Deployment
- **No build step**: VTEX IO platform handles compilation
- **Manifest**: Version in `manifest.json` controls app releases
- **Dependencies**: Platform dependencies in `manifest.json`, React deps in `react/package.json`

## Critical Integration Points

### VTEX Platform APIs
- **Product Context**: `vtex.product-context` for product data
- **CSS Handles**: `vtex.css-handles` for customizable styling
- **Format Currency**: `vtex.format-currency` for price formatting
- **Runtime**: `vtex.render-runtime` for routing and page context

### External Dependencies
- **React ecosystem**: Standard React patterns with hooks
- **Apollo GraphQL**: For VTEX API queries
- **Ramda**: Functional utilities (`ramda`)
- **UI libraries**: Specific to component needs (Swiper, Slick carousel, etc.)

## Common Patterns to Follow

### CSS Handles Implementation
```javascript
const CSS_HANDLES = ['componentContainer', 'componentTitle'] as const
const handles = useCssHandles(CSS_HANDLES)
// Use: className={handles.componentContainer}
```

### Component Export Pattern
```javascript
// react/ComponentName.js
import ComponentName from './components/ComponentName/index'
export default ComponentName
```

### VTEX IO Block Definition
```json
// store/interfaces.json
"block-name": {
  "component": "ComponentName",
  "content": { "$ref": "app:vtex.store-components#/definitions/ComponentName" }
}
```

### Testing Setup
```javascript
// Use @vtex/test-tools/react for rendering
import { render } from '@vtex/test-tools/react'
// Mock VTEX dependencies in __mocks__
```

## Deprecated Components
**Warning**: These blocks are deprecated but still supported:
`Animation`, `Categories Highlights`, `Collection Badges`, `Container`, `Discount Badge`, `Gradient Collapse`, `Greeting`, `Slider`

## Quick Start for New Components
1. Create `react/components/NewComponent/index.js`
2. Add root export in `react/NewComponent.js`
3. Register block in `store/interfaces.json`
4. Add content schema in `store/contentSchemas.json` (if configurable)
5. Add dependencies to `react/package.json`
6. Write tests in `react/__tests__/components/NewComponent.test.js`
