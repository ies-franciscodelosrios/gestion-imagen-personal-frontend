// ** Third Party Components
import Proptypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

const TimelineDashboard = props => {
  // ** Props
  const { data, tag, className } = props

  // ** Custom Tagg
  const Tag = tag ? tag : 'ul'

  if (!data || data == []) {
    return (<></>)
  }
  return (
    <Tag
      className={classnames('timeline', {
        [className]: className
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : 'li'

        return (
          <ItemTag
            key={i}
            className={classnames('timeline-item', {
              [item.className]: className
            })}
          >
            <span
              className={classnames('timeline-point', {
                [`timeline-point-${item.color}`]: item.color,
                'timeline-point-indicator': !item.icon
              })}
            >
              {item.icon ? item.icon : null}
            </span>
            <div className='timeline-event'>
              <div
                className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                  'mb-sm-0 mb-1': item.date
                })}
              >
                <h6>{item.protocol}</h6>
                {item.date ? (
                  <span
                    className={classnames('timeline-event-time', {
                      [item.metaClassName]: item.metaClassName
                    })}
                  >
                    {moment(item.date).format('DD/MM/YYYY HH:mm')}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  'mb-0': i === data.length - 1 && !item.customContent
                })}
              >
                {item.consultancy}
              </p>
              {item.customContent ? item.customContent : null}
            </div>
          </ItemTag>
        )
      })}
    </Tag>
  )
}

export default TimelineDashboard

// ** PropTypes
TimelineDashboard.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array
}
