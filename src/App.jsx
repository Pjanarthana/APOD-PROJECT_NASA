import { useEffect, useState } from "react"
import SideBar from "./Components/SideBar"
import Main from "./Components/Main"
import Footer from "./Components/Footer"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      setLoading(true)
      setError(null)
      const NASA_KEY = "Cb2DFuduZcqZmItTexcBYlTxYJWhaMhJvU54t4Bo"
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`


      try {
        const res = await fetch(url)
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(JSON.stringify(errorData))
        }

        const apiData = await res.json()
        setData(apiData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchAPIData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      {data ? <Main data={data} /> : null}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App