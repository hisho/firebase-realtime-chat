import { useEffect, useState } from 'react'
import { Room, roomSchema } from '@src/feature/rooms/model/Room'
import { roomsDatabaseCollectionRef } from '@src/feature/rooms/constant/roomDatabaseRef'
import {
  getDocs,
  orderBy,
  query,
  limit as QueryLimit,
} from 'firebase/firestore'
import { __DEV__ } from '@src/constant/env'
import { isNullish } from '@src/util/isNullish/isNullish'
import { useLoading } from '@src/hooks/useLoading/useLoading'

type Args = {
  limit?: number
}

export const useRooms = ({ limit }: Partial<Args> = {}) => {
  const { startLoading, stopLoading, isLoading } = useLoading()
  const [rooms, setRooms] = useState<Room[]>([])
  useEffect(() => {
    ;(async () => {
      startLoading()
      try {
        const db = roomsDatabaseCollectionRef()
        const roomsQuery = await query(
          db,
          orderBy('createdAt', 'desc'),
          QueryLimit(isNullish(limit) ? 999 : limit)
        )
        const querySnapshots = await getDocs(roomsQuery)
        const parsedRooms = roomSchema.array().safeParse(
          querySnapshots.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
        )
        setRooms(parsedRooms.success ? parsedRooms.data : [])
      } catch (e) {
        __DEV__ && console.log(e)
      } finally {
        stopLoading()
      }
    })()
  }, [limit, startLoading, stopLoading])

  return { rooms, isLoading } as const
}
