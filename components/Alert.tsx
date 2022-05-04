import React, { ReactNode, useState } from 'react'

export const Alert = ({
  error,
  children
}: {
  error: Error & {
    data?: {
      message?: string
    }
  }

  children?: ReactNode
}) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* @ts-ignore */}
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: calc(100vw - 6px);
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 200;
          }
          .error {
            background: black;
            border: 3px solid red;
            border-radius: 15px;
            padding: 2rem;
            position: relative;
          }
          button {
            position: absolute;
            right: 20px;
            top: 20px;
            border: none;
            background: none;
            cursor: pointer;
          }
        `}
      </style>
      {open && (
        <div className="container">
          <div className="error">
            <button onClick={() => setOpen(false)}>{'❌'}</button>
            <h2>Error.</h2>
            <p>{error.data ? error.data.message : error.message}</p>
            {children}
          </div>
        </div>
      )}
    </>
  )
}
