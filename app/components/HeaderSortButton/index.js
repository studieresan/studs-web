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
        <span className='text-xl text-white pl-1'>
          <i className='fas fa-sort' />
        </span>
      )}
      {sortStatus.property === attribute && sortStatus.direction === 'ASC' && (
        <span className='text-xl text-white pl-1'>
          <i className='fas fa-sort-up' />
        </span>
      )}
      {sortStatus.property === attribute && sortStatus.direction === 'DESC' && (
        <span className='text-xl text-white pl-1'>
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
  sortStatus: PropTypes.func.isRequired,
}
