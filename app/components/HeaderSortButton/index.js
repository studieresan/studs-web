import React from 'react'
import PropTypes from 'prop-types'

export const HeaderSortButton = ({
  text,
  attribute,
  setSortStatus,
  sortStatus,
}) => {
  return (
    <th
      onClick={() => {
        setSortStatus(attribute)
      }}
    >
      {text}
      {sortStatus.property !== attribute && (
        <span>
          <i className='fas fa-sort' />
        </span>
      )}
      {sortStatus.property === attribute && sortStatus.direction && (
        <span>
          <i className='fas fa-sort-up' />
        </span>
      )}
      {sortStatus.property === attribute && !sortStatus.direction && (
        <span>
          <i className='fas fa-sort-down' />
        </span>
      )}
    </th>
  )
}

HeaderSortButton.propTypes = {
  text: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
  setSortStatus: PropTypes.func.isRequired,
  sortStatus: PropTypes.object.isRequired,
}
