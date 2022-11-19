import { FC, useState } from "react"


import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface Props {
    quantity: number
    maxQuantity: number
    //Methods
    onChangeQuantity: (quantity: number) => void
}

export const ItemCounter: FC<Props> = ({ quantity, maxQuantity, onChangeQuantity }) => {


    const addORemove = (value: number) => {
        if (value === -1) {
            if (quantity === 1) return
            return onChangeQuantity(quantity - 1)
        }

        if (quantity >= maxQuantity) return

        onChangeQuantity(quantity + 1)
    }


    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={() => addORemove(-1)}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{quantity}</Typography>
            <IconButton onClick={() => addORemove(+1)}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}

