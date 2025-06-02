import { type Props } from "../pages/SearchPage";

const SearchInput = (props: Props) => {
  const { keywordProp, setIsLoading, setKeyword, setResourceMatches, submitStatus, /*setIsSubmitted*/ } = props
  // console.log(keywordProp)
  function handleSearchSubmit(e: any) {
    e.preventDefault()

    setIsLoading(true)

    fetch(`https://seshatbe.up.railway.app/resources`)
      .then(res => res.json())
      .then(data => {
        const matches: string[] = []
        data.forEach((item: any) => {
          if (item.name.toLowerCase().includes(keywordProp?.toLowerCase())) {
            matches.push(item)
          }
        })
        //javascript
        setResourceMatches(matches)
        setIsLoading(false)
      })

  }

  function handleInputVal(fn: any, val: string) {
    return fn(val)
  }

  return (
    <form className="flex flex-col mt-4 mb-4" onSubmit={(e) => handleSearchSubmit(e)}>
      <div className="flex flex-col w-3/5 mx-auto my-10 border-2 border-white-500 font-bold rounded-md">
        <label htmlFor="search-input" className="text-center mt-4 mb-4 text-white/100">Search for keywordProp:</label>
        <input type="text" className="w-1/2 mx-auto bg-[#767272] p-2 rounded-md" onChange={(e) => handleInputVal(setKeyword, e.target.value)}
          value={keywordProp} />
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

        <button  className={`${keywordProp?.length === 0 ?`bg-orange-200`: `bg-orange-400`} font-bold w-32 mx-auto rounded-md mb-4 p-3 $ $`} disabled={submitStatus? false : true}>Search</button>
      </div>
    </form>
  )
};

export default SearchInput;