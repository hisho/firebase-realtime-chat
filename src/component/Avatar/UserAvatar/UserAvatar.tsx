import { Avatar, AvatarBadge, AvatarProps } from '@chakra-ui/react'
import { VerifiedIcon } from '@src/component/Icon/VerifiedIcon/VerifiedIcon'

type Props = AvatarProps & {
  isVerified?: boolean
}

export const UserAvatar = (props: Props) => {
  const { isVerified, ...avatarProps } = props

  return (
    <Avatar {...avatarProps}>
      {isVerified && (
        <AvatarBadge
          border={'none'}
          bgColor={'white'}
          insetEnd={1}
          bottom={1}
          color={'blue.500'}
        >
          <VerifiedIcon stroke={'white'} />
        </AvatarBadge>
      )}
    </Avatar>
  )
}
