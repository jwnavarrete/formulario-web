import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useAxiosPrivate } from "@hooks/useAxiosPrivate";

export default function ImageOne(props) {
  const axiosPrivate = useAxiosPrivate();

  const labelText = (action) => {
    return action ? "Archivo cargado" : "Subir archivo";
  };

  const colorInputFile = (action) => {
    return action ? "success" : "primary";
  };

  const descargarArchivos = () => {
    hanleDownload(props)
  }
  const hanleDownload = async (props) => {
    const API = props.api ? props.api : "file"
    
    const response = await axiosPrivate.get(`${API}/?hash=${props.hash}&name=${props.name}`, {
      responseType: 'blob', cache: {
        readHeaders: false,
      }
    });
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;

    const fileNameHeader = "content-type";
    const suggestedFileName = response.headers[fileNameHeader];
    const extension = suggestedFileName.split('/')[1]

    link.setAttribute('download', `${props.name}.${extension}`); //or any other extension
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return (
    <>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>

        <Button
          variant="contained"
          component="label"
          fullWidth
          size="small"
          color={colorInputFile(props.cargado)}
        >
          {labelText(props.cargado)}
          <input
            type="file"
            hidden
            onChange={props.onChange}
          />
        </Button>

        {props.cargado && <>
          <Button
            variant="contained"
            component="label"
            color="warning"
            onClick={descargarArchivos}
            size="small"
            sx={{ width: 20 }}
          >
            <FaCloudDownloadAlt size={20} />
          </Button>
        </>}
      </ButtonGroup>
    </>
  );
}
