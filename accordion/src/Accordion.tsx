import React, { useState } from 'react'
export default function Accordion() {
  const [selected, setSelected] = useState('')
  const data = {
    HTML: `The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.`,
    CSS: `Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.`,
    JavaScript: `JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.`,
  }
  function handleClick(k) {
    if (selected === k) {
      setSelected('')
    } else {
      setSelected(k)
    }
  }
  const elements = Object.keys(data).map((k, i) => <div key={i}>
        <div onClick={() => {handleClick(k)}}>
        <div className="accordionTitle">
          <span>{k}{' '}</span>
          <span
            aria-hidden={true}
            className={k===selected ? "accordion-icon accordion-icon--rotated" : "accordion-icon"}
          />
        </div>
        </div>

        <div style={{display: k === selected ? 'block': 'none'}}> 
          {data[k]}
        </div>  
  </div> 
  )
  return <div className="accordion">{elements}</div>
}
