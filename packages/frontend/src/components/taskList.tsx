import GetTasksApi from '@/api/getTasks'
import useSWR from 'swr'
import TaskItem from './taskItem'

const TaskList: React.FC = () => {
  const { data } = useSWR('tasks', GetTasksApi)

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
