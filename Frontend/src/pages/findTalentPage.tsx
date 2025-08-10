import { Divider } from "@mantine/core"
import SearchBar from "../Components/findTalent/searchBar"
import Talents from "../Components/findTalent/Talents"


const FindTalentPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
        <SearchBar/>
        <Divider size="sm" mx="md" />
        <Talents/>
    </div>
  )
}

export default FindTalentPage