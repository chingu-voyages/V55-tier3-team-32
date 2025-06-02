import {type Props } from "../pages/SearchPage"
import Cube from "../components/Cube"
import { Link } from "react-router-dom";

const SearchResults = (props: Props) => {

  const { resourcesProp, loadingOn } = props;
  console.log("resourcesProp", resourcesProp)

  function findTags(tagId: string) {
    fetch(`https://seshatbe.up.railway.app/tags`)
    .then(res => res.json())
    .then(data =>{
      const foundTags = data.find((data: any) => data.id === tagId)
      
      for(let tag in foundTags) {
        console.log(tag)
      }
    })
    // const selectedTag = tags.find((tag: string) => tag === searchTag)
    // return selectedTag;
    // console.log("tags", tags)
  }  

    findTags("1048172157009678337")
  
  
  if (loadingOn) {
    return (
      <>
        <p className="text-lg text-center mt-4 mb-4 text-white/100">Looking for resources....</p>
          <Cube/>
      </>
    )
  } 
      // <p className="text-lg text-center mt-4 mb-4 text-white/100"> Sorry, no resourcesProp found.</p>

  return (
    <div>

      {/*if resourceMatches is empty, return `No match`, else ...: */}
      <ul className="w-3/5 mx-auto my-10">
        {resourcesProp?.map((resource: any) => {
            return <li key={resource.id}className="p-4 rounded-md bg-[#767272] mb-4 shadow-[0_2px_8px_0_rgba(255, 165, 0, 1)] ">
              <h3 className="underline text-white/100" ><Link to={resource.url}>{resource.name}</Link></h3>
              <ul>
                {resource.appliedTags/* ((tag: string) => {
                  return <li className="rounded-md">{tag}</li>
                })} */}
              </ul>
              <button className="bg-orange-400 font-bold w-32 mx-auto rounded-md mb-4 p-3"><Link to={resource.url}>Read more</Link></button>
            </li>
          }
        )}
      </ul>
    </div>

  )
}

export default SearchResults;


// appliedTags
// author
// createdAt
// id
// name
// url