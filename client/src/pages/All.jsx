import React from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux';

function All() {
  const data = useSelector((store) => store.tasks);
  return (
    <div className='flex gap-2 sm:gap-3 md:gap-4 flex-wrap'>
      {data.map((task , index) => {
        return (
          <Card data={task} index={index}/>
        )
      })}
    </div>
  )
}

export default All