import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const SearchPage: React.FC = () => {

  const [keyword, setKeyword] = useState("");
  const [resourceMatches, setResourceMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  console.log(resourceMatches)
  
  function handleSearchSubmit(e) {
    e.preventDefault()
    
    setIsLoading(true)
    
    fetch(`https://seshatbe.up.railway.app/resources`)
      .then(res => res.json())
      .then(data => {
        const matches = []
        data.forEach((item) => {
          if(item.name.toLowerCase().includes(keyword.toLowerCase()))
          matches.push(item)
        })
        //javascript
        setResourceMatches(matches)
        setIsLoading(false)
      })

  }


  function handleInputVal(fn, val) {
    return fn(val)
  }


  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
      <Navbar />
      <form className="flex flex-col mt-4 mb-4" onSubmit={(e) => handleSearchSubmit(e)}>
      <div className="flex flex-col w-3/5 mx-auto my-10 border-2 border-white-500 font-bold rounded-md">
          <label htmlFor="search-input" className="text-center mt-4 mb-4 text-white/100">Search for keywords:</label>
          <input type="text" className="w-1/2 mx-auto bg-[#767272] p-2 rounded-md" onChange={(e) => handleInputVal(setKeyword, e.target.value)}
            value={keyword} />
        <select className="max-w-64 mt-4 mb-4 ml-auto mr-auto font-bold p-2 text-center">
          <option value="general">General</option>
          <option value="html">HTML</option>
          <option value="javascript">JavaScript</option>
          <option value="css">CSS</option>
          <option value="react">React</option>
          <option value="typescript">Typescript</option>
          <option value="python">Python</option>
          <option value="nodejs">Node.js</option>
          <option value="nextjs">Next.js</option>
          <option value="vue">Vue</option>
          <option value="git">Git</option>
          <option value="github">Github</option>
          <option value="js-framework">JavaScript Framweork</option>
          <option value="sql">SQL</option>
          <option value="career">Career</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="ruby">Ruby</option>
          <option value="golang">Golang</option>
          <option value="devops">Devops</option>
          <option value="ai">AI</option>
        </select>

        <button className="bg-orange-400 font-bold w-32 mx-auto rounded-md mb-4 p-3 ">Search</button>
      
      </div>
      </form>
      
      <div>
        {/*if resourceMatches is empty, return `No match`, else ...: */}
        <ul className="w-3/5 mx-auto my-10">
          {resourceMatches.map((resource) => {
            return <li className="p-4 rounded-md bg-[#767272] mb-4 shadow-[0_2px_8px_0_rgba(255, 165, 0, 1)]">
              <h3>{resource.name}</h3>
            </li>
          })}
        </ul>
      </div>
      
      <Footer />
    </div>
  )

}

export default SearchPage;
