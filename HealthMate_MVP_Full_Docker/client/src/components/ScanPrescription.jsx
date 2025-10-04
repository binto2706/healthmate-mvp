import React, { useState } from 'react'

export default function ScanPrescription(){
  const [file,setFile] = useState(null)
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)

  const upload = async ()=>{
    if(!file) return alert('Chọn ảnh trước')
    setLoading(true)
    const form = new FormData()
    form.append('image', file)
    const res = await fetch('/api/prescriptions/upload', { method: 'POST', body: form })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div>
      <input type='file' accept='image/*' onChange={e=>setFile(e.target.files[0])} />
      <button onClick={upload} disabled={loading} style={{marginLeft:8}}>{loading? 'Đang tải...' : 'Tải lên'}</button>
      {result && (<pre style={{background:'#f4f4f4',padding:10,marginTop:10}}>{JSON.stringify(result,null,2)}</pre>)}
    </div>
  )
}