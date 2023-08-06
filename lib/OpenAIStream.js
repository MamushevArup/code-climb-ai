import {
  createParser,
} from 'eventsource-parser'
import { NextResponse } from 'next/server'

export async function OpenAIStream(token) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  let counter = 0
  const requestTemplate = await fetch("http://localhost:8000/auth/api/chat", {
    headers : {
      'Content-type' : 'application/json',
      'Authorization' : token,
    },
    method : 'GET',
  })
  const vl = await requestTemplate.json()
  console.log(vl)

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            console.log('DONE')
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      for await (const chunk of vl.body) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return new NextResponse(stream) 
}
