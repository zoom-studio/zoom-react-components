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
  const titleRef1 = useRef<HTMLHeadingElement | null>(null)
  const titleRef2 = useRef<HTMLHeadingElement | null>(null)
  const titleRef3 = useRef<HTMLHeadingElement | null>(null)
  const titleRef4 = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef1 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef2 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef3 = useRef<HTMLParagraphElement | null>(null)
  const descriptionRef4 = useRef<HTMLParagraphElement | null>(null)
  const buttonRef1 = useRef<HTMLButtonElement | null>(null)
  const buttonRef2 = useRef<HTMLButtonElement | null>(null)
  const buttonRef3 = useRef<HTMLButtonElement | null>(null)
  const buttonRef4 = useRef<HTMLButtonElement | null>(null)
  return {
    imgRef1: imageRef1,
    imgRef2: imageRef2,
    imgRef3: imageRef3,
    imgRef4: imageRef4,
    ttlRef1: titleRef1,
    ttlRef2: titleRef2,
    ttlRef3: titleRef3,
    ttlRef4: titleRef4,
    dcpRef1: descriptionRef1,
    dcpRef2: descriptionRef2,
    dcpRef3: descriptionRef3,
    dcpRef4: descriptionRef4,
    btnRef1: buttonRef1,
    btnRef2: buttonRef2,
    btnRef3: buttonRef3,
    btnRef4: buttonRef4,
  }
}

export const LoremPage: FC<{ refs: ReturnType<typeof useCreateLoremSectionRefs> }> = ({ refs }) => {
  return (
    <Container>
      {createLoremSection(true, refs.imgRef1, refs.ttlRef1, refs.dcpRef1, refs.btnRef1)}
      {createLoremSection(false, refs.imgRef2, refs.ttlRef2, refs.dcpRef2, refs.btnRef2)}
      {createLoremSection(true, refs.imgRef3, refs.ttlRef3, refs.dcpRef3, refs.btnRef3)}
      {createLoremSection(false, refs.imgRef4, refs.ttlRef4, refs.dcpRef4, refs.btnRef4)}
    </Container>
  )
}
