import TuilesSingleCard from './TuilesSingleCard';

const TuilesCard = ({ tuiles }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {tuiles.map((item) => (
        <TuilesSingleCard key={item._id} tuile={item} />
      ))}
    </div>
  )
}

export default TuilesCard