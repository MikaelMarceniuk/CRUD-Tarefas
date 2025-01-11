import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Plus, RefreshCcw } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import GetTaskByIdApi from '@/api/getTaskById'
import { useEffect } from 'react'
import UpdateTaskApi from '@/api/updateTask'

const formSchema = z.object({
  name: z.string().min(3),
})

type CreateTaskForm = z.infer<typeof formSchema>

const UpdateTaskDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const form = useForm<CreateTaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })
  const taskId = searchParams.get('task_id')

  const { data } = useSWR(taskId ? ['task', taskId] : null, () =>
    GetTaskByIdApi({ id: taskId! })
  )

  const closeModal = () => {
    const newUrl = new URLSearchParams(searchParams.toString())
    newUrl.delete('task_id')

    setSearchParams(newUrl)
  }

  const handleOnSubmit = form.handleSubmit(async ({ name }) => {
    const apiResp = await UpdateTaskApi({ id: taskId!, name })

    if (apiResp.isSuccess) closeModal()
  })

  const handleOnOpenChange = (isOpen: boolean) => {
    if (isOpen) return
    closeModal()
  }

  useEffect(() => {
    if (!data) return

    form.setValue('name', data.name)
  }, [data])

  return (
    <Dialog
      open={Boolean(taskId)}
      onOpenChange={handleOnOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da tarefa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleOnSubmit}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
            >
              <RefreshCcw />
              Atualizar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTaskDialog
