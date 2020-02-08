// import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Swala(title, message, icon) {
  MySwal.fire({
    title: title || 'error',
    footer: 'Copyright 2020',
    onOpen: () => {
      MySwal.clickConfirm()
    }
  }).then(() => {
    return MySwal.fire({
      icon: icon || 'error',
      title: message || 'Something when wrong',
      showConfirmButton: false,
      timer: 2000
    })
  })
}