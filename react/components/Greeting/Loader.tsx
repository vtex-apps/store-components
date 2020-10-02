import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-content-loader` if i... Remove this comment to see the full error message
import ContentLoader from 'react-content-loader'

const GreetingLoading = (props: any) => (
  <ContentLoader
    height={32}
    width={300}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    className="v-mid"
    data-testid="greeting-loader"
    {...props}
  >
    <rect rx="1" ry="1" width="300" height="32" />
  </ContentLoader>
)

export default GreetingLoading
