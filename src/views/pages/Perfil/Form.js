import React, { useState, useEffect, useContext } from "react"
import { useFormContext } from "react-hook-form"
// COMPONENTES DE MATERIAL UI
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
// CONTEXT
import { PerfilContext } from "@context/PerfilContext"
//ICONOS
import { FaSave } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"
// NUEVOS CONTROLES
import { Card } from "@components/ui/Card"
import Input from "@components/ui/_Input"
import SelectOption from "@components/ui/_Select"
// AXIOS
import { useAxiosPrivate } from "@hooks/useAxiosPrivate"
// Service
import logsService from "@services/LogsService"
// sweetalert
import swal from "sweetalert"

import { estadoCatalogo } from "@utils/estadoCatalogo"

const initialState = {
  id: "",
  descripcion: "",
  estado: "A",
}

const Form = () => {
  // hooks
  const axiosPrivate = useAxiosPrivate()

  // Context
  const {
    editionMode,
    setEditionMode,
    disabled,
    setDisabled,
    loadData
  } = useContext(PerfilContext)

  // FormContext
  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext({ defaultValues: initialState })

  useEffect(() => {
    setDisabled({ id: true, descripcion: false, estado: false })

    clearData()
  }, [])

  // Eventos
  const handleSave = (data) => {
    const {
      id,
      descripcion ,
      estado,
    } = data

    saveData({ descripcion, estado }, id)
  }

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosPrivate.delete(`/perfil/${id}`)
      
      swal("registro eliminado!", {
        icon: "success",
      })

      logsService.register(`Eliminación de perfil con id: ${id}`, 'Perfil')
      
      clearData()
      loadData()
    } catch (error) {
      swal({
        title: "Formulario Online",
        text: `Error ${error}`,
        icon: "error",
        button: "Aceptar"
        // timer: "2000",
      })
    }
  }

  const handleClickDelete = () => {
    const id = getValues("id")

    if(id === 1){
      swal({
        title: 'Formulario Online',
        text: `El perfil id ${id} no se puede eliminar`,
        icon: 'error',
        buttons: 'Aceptar'
        // timer: '2000'
      })

      return
    }
    
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado, no podrá recuperar este registro!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(id)
      }
    })
  }

  const handleChangeEstado = async (e) => {
    setValue("estado", e.target.value)
  }
  
  // Funciones
  const saveData = async (param, id) => {
    try {
      if (!editionMode) {
        const { data } = await axiosPrivate.post("/perfil/", param)

        swal({
          title: "Formulario Online",
          text: `Registrado con exito`,
          icon: "success",
          button: "Aceptar"
          // timer: "2000",
        })

        logsService.register(`Registro de perfil: ${JSON.stringify(data)}`, 'Perfil')

        loadData()
      } else {
        const { data } = await axiosPrivate.patch(
          `/perfil/${id}`,
          param
        )

        swal({
          title: "Formulario Online",
          text: `Actualizado con exito`,
          icon: "success",
          button: "Aceptar"
          // timer: "2000",
        })

        logsService.register(`Actualización de perfil: ${JSON.stringify(data)}`, 'Perfil')

        loadData()
      }

      // LIMPIAMOS LOS CAMPOS
      clearData()
    } catch (error) {
      swal({
        title: "Formulario Online",
        text: `Error ${error}`,
        icon: "error",
        button: "Aceptar"
        // timer: "2000",
      })
    }
  }
  
  const clearData = () => {
    setEditionMode(false)
    reset(initialState)
  }

  return (
    <Card>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>Datos de Perfil</p>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Input
              name="id"
              label="ID"
              fullWidth
              disabled={disabled.id}
            />
          </Grid>
          <Grid item xs={8} md={6} lg={6}>
            <Input
              name="descripcion"
              label="Descripción"
              fullWidth
              disabled={disabled.descripcion}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <SelectOption
              name="estado"
              label="Estado"
              onChange={handleChangeEstado}
              disabled={disabled.estado}
              >
              {estadoCatalogo.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </SelectOption>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSubmit(handleSave)}
              >
                <FaSave />
              </Button>
              {/* SOLO SI ESTA ACTIVADO EL MODO EDICION */}
              {editionMode && (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClickDelete}
                  >
                    <FaTrashAlt />
                  </Button>
                </>
              )}
              <Button variant="contained" color="warning" onClick={clearData}>
                <AiOutlineClose />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default Form
