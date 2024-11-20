export function HelloWorldReact() {
  console.log('start HelloWorldReact')
  const lang = 'react'
  return (
    <>
      <h1 className='bg-green-300 text-gray-100'>hello world - {lang}</h1>
      <i className='i-ic-sharp-smart-toy h-16 w-16 text-green-800' />
    </>
  )
}
