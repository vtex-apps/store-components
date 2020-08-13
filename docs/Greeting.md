# Greeting

## Description

`Greeting` is a VTEX component that renders a default welcome message with the user first name, if it is available in the orderForm. This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage
You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code: 
```js
import { Greeting } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<Greeting />`. 
```jsx
<Greeting />
```

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Greeting`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `greetingContainer` | The container wrapping the `message` and the `firstName` | [index](/react/components/Greeting/index.js) |
| `message` | The default greeting message | [index](/react/components/Greeting/index.js) |
| `firstName` | The user first name | [index](/react/components/Greeting/index.js) |