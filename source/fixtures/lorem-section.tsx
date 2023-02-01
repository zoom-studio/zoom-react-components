import React, { FC, RefObject, useRef } from 'react'

import { faker } from '@faker-js/faker'

import { Button, Col, Container, Image, Row, Text, Title } from '../components'

import { color } from '../utils'
import { lorem } from './lorem'

export const createLoremSection = (
  reverse?: boolean,
  imgRef?: RefObject<HTMLImageElement>,
  titleRef?: RefObject<HTMLHeadingElement>,
  descriptionRef?: RefObject<HTMLParagraphElement>,
  buttonRef?: RefObject<HTMLButtonElement>,
) => (
  <Row
    style={{
      flexDirection: reverse ? 'row-reverse' : 'row',
      color: color({ source: 'text', tone: 2 }),
    }}
  >
    <Col md={12} sm={24} xs={24}>
      <Title reference={titleRef}>{lorem(1)}</Title>
      <Text reference={descriptionRef}>{lorem(6)}</Text>
      <Button reference={buttonRef}>Sample button</Button>
    </Col>
    <Col md={12} sm={24} xs={24}>
      <Image
        src={faker.image.image(500, 400)}
        withImageViewer
        reference={imgRef}
        width="100%"
        height={400}
      />
    </Col>
  </Row>
)

export const useCreateLoremSectionRefs = () => {
  const imageRef1 = useRef<HTMLImageElement | null>(null)
  const imageRef2 = useRef<HTMLImageElement | null>(null)
  const imageRef3 = useRef<HTMLImageElement | null>(null)
  const imageRef4 = useRef<HTMLImageElement | null>(null)
  const imageRef5 = useRef<HTMLImageElement | null>(null)
  const imageRef6 = useRef<HTMLImageElement | null>(null)

  const titleRef1 = useRef<HTMLHeadingElement | null>(null)
  const titleRef2 = useRef<HTMLHeadingElement | null>(null)
  const titleRef3 = useRef<HTMLHeadingElement | null>(null)
  const titleRef4 = useRef<HTMLHeadingElement | null>(null)
  const titleRef5 = useRef<HTMLHeadingElement | null>(null)
  const titleRef6 = useRef<HTMLHeadingElement | null>(null)

  const descriptionRef1 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef2 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef3 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef4 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef5 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef6 = useRef<HTMLParagraphElement | null>(null)

  const buttonRef1 = useRef<HTMLButtonElement | null>(null)
  const buttonRef2 = useRef<HTMLButtonElement | null>(null)
  const buttonRef3 = useRef<HTMLButtonElement | null>(null)
  const buttonRef4 = useRef<HTMLButtonElement | null>(null)
  const buttonRef5 = useRef<HTMLButtonElement | null>(null)
  const buttonRef6 = useRef<HTMLButtonElement | null>(null)

  return {
    img1: imageRef1,
    img2: imageRef2,
    img3: imageRef3,
    img4: imageRef4,
    img5: imageRef5,
    img6: imageRef6,

    ttl1: titleRef1,
    ttl2: titleRef2,
    ttl3: titleRef3,
    ttl4: titleRef4,
    ttl5: titleRef5,
    ttl6: titleRef6,

    dcp1: descriptionRef1,
    dcp2: descriptionRef2,
    dcp3: descriptionRef3,
    dcp4: descriptionRef4,
    dcp5: descriptionRef5,
    dcp6: descriptionRef6,

    btn1: buttonRef1,
    btn2: buttonRef2,
    btn3: buttonRef3,
    btn4: buttonRef4,
    btn5: buttonRef5,
    btn6: buttonRef6,
  }
}

export const LoremPage: FC<{ refs: ReturnType<typeof useCreateLoremSectionRefs> }> = ({ refs }) => {
  return (
    <Container>
      {createLoremSection(true, refs.img1, refs.ttl1, refs.dcp1, refs.btn1)}
      {createLoremSection(false, refs.img2, refs.ttl2, refs.dcp2, refs.btn2)}
      {createLoremSection(true, refs.img3, refs.ttl3, refs.dcp3, refs.btn3)}
      {createLoremSection(false, refs.img4, refs.ttl4, refs.dcp4, refs.btn4)}
      {createLoremSection(true, refs.img5, refs.ttl5, refs.dcp5, refs.btn5)}
      {createLoremSection(false, refs.img6, refs.ttl6, refs.dcp6, refs.btn6)}
    </Container>
  )
}
