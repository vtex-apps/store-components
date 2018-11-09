# Account
Account is a bundle of canonical components that can be used to create new tabs to be inserted on the `vtex.my-account` app.

To import it into your code: 
```js
import { ContentWrapper, BaseLoading, GenericError } from 'vtex.store-components/Account'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ContentWrapper>`. 
```jsx
<ContentWrapper  
  title={`${orderTitle} ${orderNumber}`}
  backButton={backButton}> 
  {({ handleError }) => children}
</ContentWrapper>
```

```jsx
<BaseLoading queryData={data} headerConfig={object}>
  {children}
</BaseLoading>
```

```jsx
<GenericError onDismiss={handleError} errorId={error} />
```

TODO


