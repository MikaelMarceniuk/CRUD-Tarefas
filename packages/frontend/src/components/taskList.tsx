import GetTasksApi from '@/api/getTasks'
import useSWR from 'swr'
import TaskItem from './taskItem'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'

const TaskList: React.FC = () => {
  const [searchParams] = useSearchParams()

  const qParam = searchParams.get('q') || ''
  const debouncedSearch = useDebounce(qParam, 1000)

  const { data } = useSWR(
    ['tasks', { q: debouncedSearch }],
    async () => await GetTasksApi({ query: debouncedSearch })
  )

  return (
    <ul className="space-y-2 pt-4">
      {data?.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
        />
      ))}
    </ul>
  )
}

export default TaskList
