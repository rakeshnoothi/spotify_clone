import useFetch from "../../hooks/useFetch";
import fetchFunctions from "../../utils/api";
import Card from "../Card";
import Section from "../Section";

const Home = () => {
    const { data, isLoading } = useFetch(fetchFunctions.getCurrentUserFeatured);
    console.log("iam from home data", data);
    return (
        <>
            <Section data={data} isLoading={isLoading} />
            {/* <Section data = {recentlyPlayedData}/> */}
        </>
    );
};
export default Home;
