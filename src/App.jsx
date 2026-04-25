
import './App.css'
import Card from './Card'
import {createTheme,ThemeProvider} from "@mui/material/styles"
const theme = createTheme({
  typography:{
    fontFamily:["A"]
  }
})

function App() {
  


  return (
    <>
    <ThemeProvider theme={theme}>
      <div style={{fontFamily:"A",background:"#0052d0"}} className='w-full h-screen flex items-center justify-center bg-[#]'>
        <Card />
      </div>
    </ThemeProvider>
    </>
  )
}

export default App
