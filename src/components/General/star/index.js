const Star = ({ start, end, scaleStart, scaleMid, scaleEnd }) => {
  return (
    <div className="star" style={{ 
      '--x-start': start + 'vw',
      '--x-end': end + 'vw',
      '--scale-25': scaleStart.toFixed(1),
      '--scale-50': scaleMid.toFixed(1),
      '--scale-75': scaleEnd.toFixed(1)
    }} />
  )
}

export default Star;