import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function AloneRockets() {
  const [AloneRockets, setAloneRockets] = useState(null)
  const [imperial, setImperial] = useState(false)
  const [value, setValue] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchAloneRockets = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      const data = await res.json()
      setAloneRockets(data)
    }

    fetchAloneRockets()
  }, [id])

  return (
    <>
      {!AloneRockets ? (
        <Loading />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{AloneRockets.name}</h1>

            <h2 className="capitalize text-3xl opacity-75 mt-2 text-white font-bold">
              Type: {AloneRockets.type}
            </h2>
            <h2 className="text-3xl opacity-75 mt-2 text-white font-bold mb-8">
              First Flight Date: {AloneRockets.first_flight}
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-white opacity-75">
              <ul>
                <li>
                  Cost per launch:{" "}
                  {AloneRockets.cost_per_launch.toLocaleString()} USD
                </li>
                <li>Company: {AloneRockets.company}</li>
                <li>Success Rate: {AloneRockets.success_rate_pct}%</li>
                {AloneRockets.active ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">Inactive</li>
                )}
              </ul>

              <ul>
                <li>Country: {AloneRockets.country}</li>
                <li>Stages: {AloneRockets.stages}</li>
                {!imperial && (
                  <>
                    <li>Height: {AloneRockets.height.meters}m</li>
                    <li>Diameter: {AloneRockets.diameter.meters}m</li>
                    <li>Mass: {AloneRockets.mass.kg.toLocaleString()}kg</li>
                  </>
                )}

                {imperial && (
                  <>
                    <li>Height: {AloneRockets.height.feet}ft</li>
                    <li>Diameter: {AloneRockets.diameter.feet}ft</li>
                    <li>Mass: {AloneRockets.mass.lb.toLocaleString()}lb</li>
                  </>
                )}
              </ul>
            </div>

            <p className="text-white opacity-75 mt-5">
              {AloneRockets.description}
            </p>

            <ul className="flex items-center justify-start gap-3 mt-5">
              <li>
                <a
                  href={AloneRockets.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <button onClick={() => setImperial(!imperial)} className="btn">
                  {imperial ? "Toggle Metric Units" : "Toggle Imperial Units"}
                </button>
              </li>
              <li>
                <Link
                  to="/rockets"
                  className="text-white opacity-75 text-sm hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img
              src={AloneRockets.flickr_images[value]}
              alt={AloneRockets.name}
              className="h-full object-cover"
            />

            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {AloneRockets.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className={`cursor-pointer bg-white ${
                    index === value && "p-1"
                  }`}
                >
                  <img src={image} alt={AloneRockets.name} className="w-20" />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}