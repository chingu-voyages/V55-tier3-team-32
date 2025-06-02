import { useState } from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults"

export type Props = {
  keywordProp?: string
  resourcesProp?: []
  loadingOn: boolean
  setKeyword?: any
  setResourceMatches?: any
  setIsLoading?: any
  submitStatus?: boolean
  setIsSubmitted?: any
  validInput?: boolean
  setIsValid?: any
}



const SearchPage = () => {

  const [keyword, setKeyword] = useState<string>("");
  const [resourceMatches, setResourceMatches] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(true)

  return (
    <div className="w-full bg-[#1a1a17] flex flex-col min-h-screen overflow-hidden relative">
      <Navbar />

      <SearchInput 
      keywordProp={keyword} 
      resourcesProp={resourceMatches} 
      loadingOn={isLoading}
      setKeyword={setKeyword} 
      setIsLoading={setIsLoading} 
      setResourceMatches={setResourceMatches}
      // submitStatus={isSubmitted}
      // setIsSubmitted={setIsSubmitted}
      validInput={isValid}
      setIsValid={setIsValid}
      />

      <SearchResults 
      resourcesProp={resourceMatches}
      loadingOn={isLoading}
      />
      <Footer />
    </div>
  )

}

export default SearchPage;
