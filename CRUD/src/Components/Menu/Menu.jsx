import React from 'react'
import '../Menu/Menu.css'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';


const Menu = () => {
  return (
    <div className='containerMenu'>
      <div className="options">
        <div className='option'>
          <Button variant="outlined" endIcon={<Icon>list</Icon>}>
            Listagem
          </Button>
        </div>
        <div className='option'>
          <Button variant="outlined" endIcon={<Icon>add</Icon>}>
            Cadastrar
          </Button>
        </div>
        <div className='option'>
          <Button variant="outlined" endIcon={<Icon>edit</Icon>}>
            Editar
          </Button>
        </div>
        <div className='option'>
          <Button variant="outlined" endIcon={<Icon>delete</Icon>}>
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Menu