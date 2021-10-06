import React, { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'

import './styles.css'

export default function Marvel() {
  const [info, setInfo] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    if (busca) {
      api
        .get(`/characters?nameStartsWith=${busca}`)
        .then((response) => {
          setInfo(response.data.data.results)
          console.log(response.data.data.results)
        })
        .catch((err) => console.log(err))
    } else {
      api
        .get(`/characters`)
        .then((response) => {
          setInfo(response.data.data.results)
          console.log(response.data.data.results)
        })
        .catch((err) => console.log(err))
    }
  }, [busca])

  const handleMore = useCallback(async () => {
    try {
      const offset = info.length
      const response = await api.get('characters', {
        params: {
          offset
        }
      })

      setInfo([...info, ...response.data.data.results])
    } catch (err) {
      console.log(err)
    }
  }, [info])

  return (
    <>
      <h3>Busca Hero</h3>
      <input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} />
      <div>
        <ul>
          {info.map((currInfo) => (
            <li key={currInfo.id}>
              <h1>{currInfo.name}</h1>
              <img
                src={`${currInfo.thumbnail.path}.${currInfo.thumbnail.extension}`}
                alt={`Foto do ${currInfo.name}`}
              />
            </li>
          ))}
          {!busca && <button onClick={handleMore}>Adicionar mais characteres</button>}
        </ul>
      </div>
    </>
  )
}
