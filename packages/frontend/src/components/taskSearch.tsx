import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
  query: z.string(),
})

type SearchForm = z.infer<typeof formSchema>

const TaskSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  })

  const queryWatcher = form.watch('query')

  useEffect(() => {
    const newUrl = new URLSearchParams(searchParams.toString())
    newUrl.set('q', queryWatcher)

    setSearchParams(newUrl.toString())
  }, [queryWatcher])

  return (
    <div className="pt-4">
      <Form {...form}>
        <form
          className="flex gap-2"
          onSubmit={(e) => e.preventDefault()}
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
        </form>
      </Form>
    </div>
  )
}

export default TaskSearch
