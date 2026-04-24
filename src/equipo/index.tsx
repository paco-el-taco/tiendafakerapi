import { useParams } from 'react-router';

function Equipo() {
    const { equipo } = useParams<{ equipo: string }>()
  return (
    <>
      <p>{equipo}</p>
    </>
  )
}

export default Equipo