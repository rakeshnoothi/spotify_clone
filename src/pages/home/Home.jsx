import useFetch from "../../hooks/useFetch";
import fetchFunctions from "../../utils/api";
import Section from "../Section";

const Home = () => {
    const { data, isLoading } = useFetch([
        fetchFunctions.getCurrentUserFeatured,
    ]);
    const [feauteredData] = data;
    return (
        <>
            <Section data={feauteredData} isLoading={isLoading} />
        </>
    );
};
export default Home;
