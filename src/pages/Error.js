import { Link } from "react-router-dom";

import React from 'react';

const Error = () => {
  return (
    <>
        <section className="flex  flex-col items-center 
        justify-center text-center h-screen">
            <h1>Error | The requested resources could not be found</h1>
            <Link to="/" className="btn">
                &larr; Back to Homepage
            </Link>
        </section>
    </>
  )
}

export default Error