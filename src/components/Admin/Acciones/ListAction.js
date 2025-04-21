import React, { useContext, useState, useRef } from "react"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FaSync } from "react-icons/fa";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export default function SplitButton({ row, contexto, options, tipo }) {
    const { disableReproceso, handleClickMenuOption } = useContext(contexto);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        switch (tipo) {
            case 'cliente':
                handleClickMenuOption(index, row.hash, row.correo_cliente)
                break;
            case 'prestador':
                // selectedIndex
                if(index === 2){
                    handleClickMenuOption(index, row.hash, row.correo_ejecutivo)
                }else{
                    handleClickMenuOption(index, row.hash, row.correo_prestador)
                }
                break;
            case 'empleado':
                if(index === 2){
                    handleClickMenuOption(index, row.hash, row.correo_ejecutivo)
                }else{
                    handleClickMenuOption(index, row.hash, row.correo_empleado)
                }
                break;
            default:
                break;
        }
        // 
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleDisableMenuItem = (index) => {
        const { steep, estado } = row
        return disableReproceso(index, steep, estado)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <FaSync />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={handleDisableMenuItem(index)}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}