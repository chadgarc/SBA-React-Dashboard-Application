import { Dashboard } from './components/Dashboard/Dashboard'

/**
 * Main application component. Manages global task state, filter state,
 * and delegates rendering to TaskFilter and TaskList. All business logic
 * (update, delete, filter) lives here.
 *
 * @component
 */
function App() {

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
