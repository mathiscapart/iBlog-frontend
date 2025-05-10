import Route from "./route/Route.tsx"
import {AuthProvider} from "./provider/AuthProvider.tsx";

function App() {
    return <>
        <AuthProvider>
            <Route/>
        </AuthProvider>
    </>
}

export default App
