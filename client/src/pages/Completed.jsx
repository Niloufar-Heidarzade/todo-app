import React from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux';

function Completed() {
  const data = useSelector((store) => store.tasks);
  return (
    <div className='flex gap-4 flex-wrap'>
      {data.filter(task => task.isCompleted).map((task , index) => 
      <Card data={task} index={index}/>
      )}
    </div>
  )
}

export default Completed