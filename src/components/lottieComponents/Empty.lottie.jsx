import React from 'react'
import Lottie from "lottie-react"
import EmptyJson from "../../lottie/Empty.json"

const EmptyLottie = () => {
  return (
    <div>
        <Lottie className='w-[300px]' animationData={EmptyJson} loop={true}/>
    </div>
  )
}

export default EmptyLottie