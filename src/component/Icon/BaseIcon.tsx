import { Icon, IconProps } from '@chakra-ui/icon'
import type { IconType } from 'react-icons'

type Props = {
  icon: IconType
} & IconProps

export const BaseIcon = ({ icon, ...props }: Props) => {
  return <Icon as={icon} {...props} />
}

export type BaseIconProps = Omit<Props, 'icon'>
