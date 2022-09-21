const headers = {
  'Content-Type': 'application/json',
};

const get = async (params) => { 
  const res = await fetch(`${process.env.VUE_APP_RUTA}/meters?${params}`)
  return await res.json()
}

const add = async (datos) => { 
const res = await fetch(`${process.env.VUE_APP_RUTA}/meters`, {
    method: 'POST',
    headers,
    body: JSON.stringify(datos)
  })
  return await res.json()
}

const edit = async ({ id, datos }) => { 
  const res = await fetch(`${process.env.VUE_APP_RUTA}/meters/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(datos)
  })
  return await res.json()
}

const remove = async (id) => { 
  const res = await fetch(`${process.env.VUE_APP_RUTA}/meters/${id}`, {
    method: 'DELETE',
    headers,
  })
  return await res.json()
}

export default {
  get,
  add,
  edit,
  remove,
}