import {useNavigate}from 'react-router-dom'
import {useState} from 'react'
//CSS
import '../../Views/Global.css';


const searchForm = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const handleSubmit = (e) =>{
    e.preventDefault();

    navigate('/search?q=' + query);
  }

  return (
    <div className='ContainerSearch'>
      <form onSubmit={handleSubmit}>
        <div className="serchRow">
        <span className="material-symbols-outlined">search</span>
          <input type='text' onChange={(e) => setQuery(e.target.value)} />
          <input type='submit' value="Buscar" />
        </div>
      </form>
    </div>
  )
}

export default searchForm