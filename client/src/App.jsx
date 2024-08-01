
import './App.css'

const ROLES = {
  'User': 2001 
}


function App() {
   
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />



      {/* we want to protect these routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>

    
     
    </Route>
    
     {/* catch all */}
     <Route path="*" element={<Missing />} />
  </Routes>
  )
}

export default App
