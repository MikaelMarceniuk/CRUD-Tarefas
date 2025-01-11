import Task from '@/@types/task'
import axiosClient from '@/lib/axios'

type GetTasksApiParams = {
  query?: string
}

type SuccessApiResp = {
  isSuccess: true
  data: Task[]
}

type ErrroApiResp = {
  isSuccess: false
  error: string
}

type ApiResp = SuccessApiResp | ErrroApiResp

const GetTasksApi = async ({ query }: GetTasksApiParams): Promise<Task[]> => {
  try {
    const { data } = await axiosClient.get<ApiResp>('/tasks')
    return data.isSuccess ? data.data : []
  } catch (err) {
    console.log('GetTasksApi.err: ', err)
    return []
  }
}

export default GetTasksApi
