import CreateTaskDialog from './components/createTaskDialog'
import TaskList from './components/taskList'
import TaskSearch from './components/taskSearch'
import UpdateTaskDialog from './components/updateTaskDialog'

const App = () => {
  return (
    <div className="max-w-96 h-dvh m-auto pt-8 bg-background">
      <h1 className="text-2xl text-center font-semibold">Minhas Tarefas</h1>
      <TaskSearch />
      <div className="pt-8">
        <div className="flex items-center justify-between">
          <h2>Tarefas</h2>
          <CreateTaskDialog />
        </div>
        <TaskList />
      </div>
      <UpdateTaskDialog />
    </div>
  )
}

export default App
