import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", pt: 2 }}>
        {/* <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          variant="contained"
          color="secondary"
          sx={{ mr: 1 }}
        >
          {cellMode === "edit" ? "Grabar" : "Editar"}
        </Button> */}
{/* 
        <Button
          onClick={handleCancel}
          onMouseDown={handleMouseDown}
          disabled={cellMode === "view"}
          variant="contained"
          color="primary"
          sx={{ ml: 1 }}
        >
          Cancelar
        </Button> */}

        <Box sx={{ flex: "1 1 auto" }} />

        {/* <Button variant="contained" sx={{ mr: 1 }} color="info">
          +
        </Button> */}
      </Box>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
        }}
      />
    </>
  );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(["edit", "view"]).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};


export default function StartEditButtonGrid({rows, columns}) {
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);
  const [cellModesModel, setCellModesModel] = React.useState({});

  const handleCellFocus = React.useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    setSelectedCellParams({ id, field });
  }, []);

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return "view";
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || "view";
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = React.useCallback(
    (params, event) => {
      if (cellMode === "edit") {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode]
  );

  return (
    <div style={{ height: 220, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        // onCellKeyDown={handleCellKeyDown}
        // cellModesModel={cellModesModel}
        // onCellModesModelChange={(model) => setCellModesModel(model)}
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        // componentsProps={{
        //   toolbar: {
        //     cellMode,
        //     selectedCellParams,
        //     setSelectedCellParams,
        //     cellModesModel,
        //     setCellModesModel,
        //   },
        //   cell: {
        //     onFocus: handleCellFocus,
        //   },
        // }}
        // experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}