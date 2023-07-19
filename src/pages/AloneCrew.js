import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function AloneCrew() {
  const [AloneCrew, setAloneCrew] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchAloneCrew = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/crew/${id}`)
      const data = await res.json()
      setAloneCrew(data)
    }

    fetchAloneCrew()
  }, [id])

  return (
    <>
      {!AloneCrew ? (
        <Loading />
      ) : (
        <section className="py-32">
          <div className="max-width grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 px-5">
            <article>
              <img src={AloneCrew.image} alt={AloneCrew.name} />
            </article>

            <article>
              <h1 className="heading mb-10">{AloneCrew.name}</h1>
              <h2 className="font-bold text-white mb-5 text-lg">Details</h2>
              <ul className="text-white opacity-75 text-sm">
                <li className="mb-2">Currently at {AloneCrew.agency}</li>
                {/* <li className="mb-2">{AloneCrew.launches.length} launches</li> */}
                {AloneCrew.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    Status: {AloneCrew.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    Status: {AloneCrew.status}
                  </li>
                )}
              </ul>

              <ul className="flex items-center justify-start gap-5 mt-10">
                <li>
                  <a
                    href={AloneCrew.wikipedia}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    Wikipedia
                  </a>
                </li>
                <li className="text-white opacity-75 text-sm hover:opacity-100">
                  <Link to="/crew">&larr; Back</Link>
                </li>
              </ul>
            </article>
          </div>
        </section>
      )}
    </>
  )
}