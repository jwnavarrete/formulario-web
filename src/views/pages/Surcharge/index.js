import React from 'react'
import './Surcharge.css'
import Title from '@components/ui/Title'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import styled from '@emotion/styled'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: minmax(100px, max-content);
  gap: 5px;
`

const index = () => {
  return (
    <>
      <div className='container'>
        <div className='contact'>
          <h3>Formulario de recargo</h3>
          <form>
            <Grid>
              <div className='form-group'>
                <label className='label'>Seguridad</label>
                <Input placeholder={0} type='number' tabIndex={1} />
              </div>
              <div className='form-group'>
                <label className='label'>Utilidad</label>
                <Input placeholder={0} type='number' tabIndex={2} />
              </div>
              <div className='form-group'>
                <label className='label'>Formulario Online</label>
                <Input placeholder={0} type='number' tabIndex={3} />
              </div>
              <div className='form-group'>
                <label className='label'>Administrativo</label>
                <Input placeholder={0} type='number' tabIndex={3} />
              </div>
              <div className='form-group'>
                <label className='label'>Total del recargo</label>
                <Input placeholder={0} type='number' tabIndex={3} />
              </div>
            </Grid>
            <div className='aliner_boton'>
              <Button
                name='submit'
                type='submit'
                id='contact-submit'
                data-submit='...Sending'
                color='primary'
              >
                Guardar
              </Button>
              <Button
                name='cancelar'
                type='cancelar'
                id='contact-cancelar'
                data-submit='...Sending'
                color='secondary'
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default index
