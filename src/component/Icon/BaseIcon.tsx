import { Icon } from '@chakra-ui/icon'
import type { IconType } from 'react-icons'

type Props = {
  icon: IconType
}

export const BaseIcon = ({ icon, ...props }: Props) => {
  return <Icon as={icon} {...props} />
}

export type BaseIconProps = Omit<Props, 'icon'>
