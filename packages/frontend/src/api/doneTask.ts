import axiosClient from '@/lib/axios'

type DoneTaskApiParams = {
  id: string
}

type SuccessApiResp = {
  isSuccess: true
}

type ErrroApiResp = {
  isSuccess: false
  error: string
}

type ApiResp = SuccessApiResp | ErrroApiResp

const DoneTaskApi = async ({ id }: DoneTaskApiParams): Promise<ApiResp> => {
  try {
    const { data } = await axiosClient.put<ApiResp>(`/tasks/${id}`)
    return data
  } catch (err) {
    console.log('DoneTaskApi.err: ', err)
    return {
      isSuccess: false,
      error: 'Unexpected error',
    }
  }
}

export default DoneTaskApi
