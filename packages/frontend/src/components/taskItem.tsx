import { CircleCheckBig, EllipsisVertical, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Task from '@/@types/task'
import DoneTaskApi from '@/api/doneTask'
import { cn } from '@/lib/utils'
import DeleteTaskApi from '@/api/deleteTask'

type TaskItemProps = {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const handleDone = async () => {
    await DoneTaskApi({ id: task.id })
  }

  const handleDelete = async () => {
    await DeleteTaskApi({ id: task.id })
  }

  return (
    <div className="flex items-center border rounded p-4">
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
