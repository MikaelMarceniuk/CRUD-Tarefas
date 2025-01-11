import axiosClient from '@/lib/axios'

type DeleteTaskApiParams = {
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

const DeleteTaskApi = async ({ id }: DeleteTaskApiParams): Promise<ApiResp> => {
  try {
    const { data } = await axiosClient.delete<ApiResp>(`/tasks/${id}`)
    return data
  } catch (err) {
    console.log('DeleteTaskApi.err: ', err)
    return {
      isSuccess: false,
      error: 'Unexpected error',
    }
  }
}

export default DeleteTaskApi
