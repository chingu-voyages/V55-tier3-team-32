import {type Props } from "../pages/SearchPage"
import Cube from "../components/Cube"
const SearchResults = (props: Props) => {

  const { resourcesProp, loadingOn } = props;
  console.log("resourcesProp", resourcesProp)
  if (loadingOn) {
    return (
      <>
        <p className="text-lg text-center mt-4 mb-4 text-white/100">Looking for resourcesProp....</p>
        <Cube />
      </>
    )

  } 
      // <p className="text-lg text-center mt-4 mb-4 text-white/100"> Sorry, no resourcesProp found.</p>

  return (
    <div>

      {/*if resourceMatches is empty, return `No match`, else ...: */}
      <ul className="w-3/5 mx-auto my-10">
        {resourcesProp?.map((resource: any) => {
            return <li className="p-4 rounded-md bg-[#767272] mb-4 shadow-[0_2px_8px_0_rgba(255, 165, 0, 1)]">
              <h3>{resource.name}</h3>
            </li>
          }
        )}
      </ul>
    </div>

  )
}

export default SearchResults;