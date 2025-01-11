import Task from '@/@types/task'
import axiosClient from '@/lib/axios'

type CreateTaskApiParams = {
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

const CreateTaskApi = async ({
  name,
}: CreateTaskApiParams): Promise<ApiResp> => {
  try {
    const { data } = await axiosClient.post<ApiResp>('/tasks', { name })

    return data
  } catch (err) {
    console.log('CreateTaskApi.err: ', err)
    return {
      isSuccess: false,
      error: 'Unexpected error',
    }
  }
}

export default CreateTaskApi
