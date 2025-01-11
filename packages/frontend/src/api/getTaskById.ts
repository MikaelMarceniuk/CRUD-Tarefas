import Task from '@/@types/task'
import axiosClient from '@/lib/axios'

type GetTaskByIdApiParams = {
  id: string
}

type SuccessApiResp = {
  isSuccess: true
  data: Task | null
}

type ErrroApiResp = {
  isSuccess: false
  error: string
}

type ApiResp = SuccessApiResp | ErrroApiResp

const GetTaskByIdApi = async ({
  id,
}: GetTaskByIdApiParams): Promise<Task | null> => {
  try {
    const { data } = await axiosClient.get<ApiResp>(`/tasks/${id}`)
    return data.isSuccess ? data.data : null
  } catch (err) {
    console.log('GetTaskByIdApi.err: ', err)
    return null
  }
}

export default GetTaskByIdApi
