import { Divider } from "@mantine/core"
import SearchBar from "../Components/findJobs/SearchBar"
import Jobs from "../Components/findJobs/Jobs";

const FindJobs=()=>{
 
    return (<div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <SearchBar/>
      <Divider size="sm" mx="md" />
      <Jobs/>

    </div>)
}
export default FindJobs