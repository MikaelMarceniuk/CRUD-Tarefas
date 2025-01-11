import Task from '@/@types/task'
import axiosClient from '@/lib/axios'

type UpdateTaskApiParams = {
  id: string
  name: string
}

type SuccessApiResp = {
  isSuccess: true
  data: Task
}

type ErrroApiResp = {
  isSuccess: false
  error: string
}

type ApiResp = SuccessApiResp | ErrroApiResp

const UpdateTaskApi = async ({
  id,
  name,
}: UpdateTaskApiParams): Promise<ApiResp> => {
  try {
    const { data } = await axiosClient.patch<ApiResp>(`/tasks/${id}`, { name })

    return data
  } catch (err) {
    console.log('UpdateTaskApi.err: ', err)
    return {
      isSuccess: false,
      error: 'Unexpected error',
    }
  }
}

export default UpdateTaskApi
