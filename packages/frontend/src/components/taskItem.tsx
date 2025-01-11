import { CircleCheckBig, EllipsisVertical, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Task from '@/@types/task'

type TaskItemProps = {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="flex items-center border rounded p-4">
      <span className="flex-1">{task.name}</span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <CircleCheckBig />
            Finalizar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TaskItem
