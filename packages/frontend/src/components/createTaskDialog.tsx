import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
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
import CreateTaskApi from '@/api/createTask'
import { Input } from './ui/input'

const formSchema = z.object({
  name: z.string().min(3),
})

type CreateTaskForm = z.infer<typeof formSchema>

const CreateTaskDialog = () => {
  const form = useForm<CreateTaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleOnSubmit = form.handleSubmit(async ({ name }) => {
    const apiResp = await CreateTaskApi({ name })

    if (apiResp.isSuccess) {
      form.reset()
    }
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'secondary'}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
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
              <Plus />
              Criar tarefa
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
