import { Box, Skeleton, Spacer, Text } from '@chakra-ui/react'
import type { Room } from '@src/feature/rooms/model/Room'

type Props = {
  room: Room
}

export const RoomCard = ({ room }: Props) => {
  return (
    <Box px={4} py={2} bgColor={'blue.50'} h={'full'}>
      <Text fontSize={'18px'} fontWeight={'bold'} noOfLines={1}>
        {room.name}
      </Text>
      <Text noOfLines={3} fontSize={'14px'}>
        {room.description}
      </Text>
    </Box>
  )
}

const RoomCardSkeleton = () => {
  return (
    <Box px={4} py={2} bgColor={'blue.50'} h={'full'}>
      <Skeleton h={'24px'} />
      <Spacer h={'5px'} />
      <Skeleton h={'18px'} />
    </Box>
  )
}

RoomCard.Skeleton = RoomCardSkeleton
