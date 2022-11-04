import React from 'react'
import { FC } from 'react';

import { Slide } from 'react-slideshow-image';

import style from "./ProductsSlideshow.module.css"

interface Props {
    images: string[]
}


export const ProductsSlideshow: FC<Props> = ({ images }) => {
    return (
        <Slide easing="ease" duration={7000} indicators>
            {
                images.map(image => {
                    const url = `/products/${image}`
                    return (
                        <div className={style["each-slide"]} key={image}>
                            <div style={{
                                backgroundImage: `url (${url})`,
                                backgroundSize: 'cover'
                            }}>

                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    )
}
