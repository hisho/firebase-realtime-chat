import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard/AuthGuard'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider/AuthProvider'
import { Box, Button, chakra, Flex, Text } from '@chakra-ui/react'
import { UserAvatar } from '@src/component/Avatar/UserAvatar/UserAvatar'
import { Spacer } from '@src/component/Spacer/Spacer'
import { InputControl } from '@src/component/Form/InputControl/InputControl'
import { useForm } from '@src/lib/from/useForm/useForm'
import type { CreateRoomInput } from '@src/feature/rooms/model/Room'
import {
  createRoomDefaultValues,
  createRoomSchema,
} from '@src/feature/rooms/model/Room'
import { FormControl } from '@src/component/Form/FormControl/FormControl'
import { __DEV__ } from '@src/constant/env'
import { addDoc } from 'firebase/firestore'
import { roomsDatabaseCollectionRef } from '@src/feature/rooms/constant/roomDatabaseRef'
import { useNavigate } from '@src/hooks/useNavigate/useNavigate'
import { useLoading } from '@src/hooks/useLoading/useLoading'

const CreateRoom = () => {
  const { user } = useAuthContext()
  const { push } = useNavigate()

  const form = useForm<CreateRoomInput>({
    schema: createRoomSchema,
    defaultValues: createRoomDefaultValues(user),
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form
  const { startLoading, stopLoading, isLoading } = useLoading()

  const handleCreateRoom = async (input: CreateRoomInput) => {
    startLoading()
    try {
      const db = roomsDatabaseCollectionRef()
      await addDoc(db, input)
      reset()
      await push((path) => path.rooms.$url())
    } catch (e) {
      __DEV__ && console.log(e)
    } finally {
      stopLoading()
    }
  }

  return (
    <chakra.form onSubmit={handleSubmit(handleCreateRoom)}>
      <FormControl label={'ルーム名'} errorMessages={errors.name?.message}>
        <InputControl control={control} name={'name'} />
      </FormControl>
      <FormControl label={'説明文'} errorMessages={errors.description?.message}>
        <InputControl control={control} name={'description'} />
      </FormControl>
      <Button type={'submit'} isLoading={isLoading}>
        ルームを作成する
      </Button>
    </chakra.form>
  )
}

const Page: NextPageWithLayout = () => {
  const { user } = useAuthContext()

  return (
    <Box pt={2} pb={10}>
      <Flex px={4} py={8} rounded={'md'} bgColor={'blue.50'}>
        <UserAvatar
          name={user?.displayName ?? '未設定'}
          size={'lg'}
          isVerified={user?.emailVerified ?? false}
        />
        <Flex ml={2} justifyContent={'center'} flexDirection={'column'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>
            {user?.displayName}
          </Text>
          <Box>{user?.email}</Box>
        </Flex>
      </Flex>
      <Spacer h={2} />
      <CreateRoom />
    </Box>
  )
}

Page.getLayout = (page) => {
  return (
    <BaseLayout>
      <AuthGuard>{page}</AuthGuard>
    </BaseLayout>
  )
}

export default Page
