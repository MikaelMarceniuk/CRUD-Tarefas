import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from './components/ui/form'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Search } from 'lucide-react'
import CreateTaskDialog from './components/createTaskDialog'

const formSchema = z.object({
  query: z.string(),
})

type SearchForm = z.infer<typeof formSchema>

const App = () => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  })

  const handleOnSubmit = form.handleSubmit(({ query }) => {
    console.log(`Searching for ${query}`)
  })

  return (
    <div className="max-w-96 h-dvh m-auto pt-8 bg-background">
      <h1 className="text-2xl text-center font-semibold">Minhas Tarefas</h1>
      <div className="pt-4">
        <Form {...form}>
          <form
            className="flex gap-2"
            onSubmit={handleOnSubmit}
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Procurar por tarefas..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button>
              <Search strokeWidth={4} />
            </Button>
          </form>
        </Form>
      </div>
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <h2>Tarefas</h2>
          <CreateTaskDialog />
        </div>
      </div>
    </div>
  )
}

export default App
