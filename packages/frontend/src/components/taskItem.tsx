import { CircleCheckBig, EllipsisVertical, Trash2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Task from '@/@types/task'
import DoneTaskApi from '@/api/doneTask'
import DeleteTaskApi from '@/api/deleteTask'
import { cn } from '@/lib/utils'

type TaskItemProps = {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleDone = async () => {
    await DoneTaskApi({ id: task.id })
  }

  const handleDelete = async () => {
    await DeleteTaskApi({ id: task.id })
  }

  const handleOnItemClick = () => {
    const newUrl = new URLSearchParams(searchParams.toString())
    newUrl.set('task_id', task.id)

    setSearchParams(newUrl.toString())
  }

  return (
    <div
      className="flex items-center border rounded p-4 hover:bg-primary hover:text-primary-foreground cursor-pointer active:bg-primary/80"
      onClick={handleOnItemClick}
    >
      <span className={cn('flex-1', task.isDone && 'line-through')}>
        {task.name}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!task.isDone && (
            <DropdownMenuItem onClick={handleDone}>
              <CircleCheckBig />
              Finalizar
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TaskItem
