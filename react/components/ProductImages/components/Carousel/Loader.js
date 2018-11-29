import ContentLoader from 'react-content-loader'

export default (props) => {
  if(props.slidesAmount === 1)
    return (
      <div className="w-100 aspect-ratio aspect-ratio--1x1">
        <ContentLoader
          style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
          height="100%"
          width="100%">
          <rect
            width="100%"
            height="100%"
          />
        </ContentLoader>
      </div>)

  return (
    <div className="w-100 aspect-ratio aspect-ratio--1x1">
      <ContentLoader
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        height="100%"
        width="100%">
        <rect
          className="dn db-ns"
          width="20%"
          height="20%"
        />
        <rect
          className="dn db-ns"
          width="20%"
          height="20%"
          y="21%"
        />
        <rect
          className="dn db-ns"
          width="20%"
          height="20%"
          y="42%"
        />
        <rect
          className="dn db-ns"
          width="20%"
          height="20%"
          y="63%"
        />
        <rect
          className="dn db-ns"
          width="89%"
          height="89%"
          x="21%"
        />
        <rect
          className="db dn-ns"
          width="100%"
          height="100%"
        />
      </ContentLoader>
    </div>
  )
}
